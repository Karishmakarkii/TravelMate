import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '../styles/authStyles';
import { GOOGLE_MAPS_API_KEY } from '@env';
import Header from '../components/header';

interface Place {
    id: string;
    name: string;
    distance: string;
    time: string;
    rating: number;
    vicinity: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        }
    }
}

interface OptimizedStop extends Place {
    distanceFromPrevious: string;
    timeFromPrevious: string;
}

export default function ItineraryScreen() {
    const router = useRouter();
    const { attractions: attractionsJson, transportMode } = useLocalSearchParams();
    const [selected, setSelected] = useState<string[]>([]);
    const [optimizedStops, setOptimizedStops] = useState<OptimizedStop[]>([]);
    const [totalDistance, setTotalDistance] = useState<string>('0 km');
    const [totalTime, setTotalTime] = useState<string>('0 mins');

    useEffect(() => {
        if (attractionsJson) {
            const selectedAttractions: Place[] = JSON.parse(attractionsJson as string);
            setSelected(selectedAttractions.map(a => a.id));
            optimizeRoute(selectedAttractions);
        }
    }, [attractionsJson]);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
        const R = 6371; // Earth's radius in kilometers
        const dLat = (lat2 - lat1) * Math.PI / 180;
        const dLon = (lon2 - lon1) * Math.PI / 180;
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    };

    const calculateTravelTime = (distanceInKm: number, mode: string): string => {
        const speeds = {
            walk: 5,
            bike: 15,
            bicycle: 15,
            drive: 40,
        };
        
        const speedKmH = speeds[mode as keyof typeof speeds] || speeds.walk;
        const timeHours = distanceInKm / speedKmH;
        const timeMinutes = Math.round(timeHours * 60);
        
        if (timeMinutes < 60) {
            return `${timeMinutes} mins`;
        } else {
            const hours = Math.floor(timeHours);
            const mins = Math.round((timeHours - hours) * 60);
            return `${hours}h ${mins}m`;
        }
    };

    const optimizeRoute = async (attractions: Place[]) => {
        let optimizedRoute: OptimizedStop[] = [];
        let remainingAttractions = [...attractions];
        let currentLocation = remainingAttractions[0].geometry.location;
        let totalDistanceKm = parseFloat(remainingAttractions[0].distance.split(' ')[0]); // Get initial distance from current location

        // Add first stop with its original distance from current location
        optimizedRoute.push({
            ...remainingAttractions[0],
            distanceFromPrevious: remainingAttractions[0].distance, // Use original distance
            timeFromPrevious: remainingAttractions[0].time // Use original time
        });

        // Remove first attraction from remaining list
        remainingAttractions.splice(0, 1);
        
        // Continue with the rest of the attractions
        while (remainingAttractions.length > 0) {
            // Find the nearest attraction to current location
            let nearestIdx = 0;
            let shortestDistance = Number.MAX_VALUE;

            for (let i = 0; i < remainingAttractions.length; i++) {
                const distance = calculateDistance(
                    currentLocation.lat,
                    currentLocation.lng,
                    remainingAttractions[i].geometry.location.lat,
                    remainingAttractions[i].geometry.location.lng
                );

                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    nearestIdx = i;
                }
            }

            const nextStop = remainingAttractions[nearestIdx];
            totalDistanceKm += shortestDistance;

            optimizedRoute.push({
                ...nextStop,
                distanceFromPrevious: `${shortestDistance.toFixed(1)} km`,
                timeFromPrevious: calculateTravelTime(shortestDistance, transportMode as string)
            });

            // Update current location and remove the used attraction
            currentLocation = nextStop.geometry.location;
            remainingAttractions.splice(nearestIdx, 1);
        }

        setOptimizedStops(optimizedRoute);
        setTotalDistance(`${totalDistanceKm.toFixed(1)} km`);
        setTotalTime(calculateTravelTime(totalDistanceKm, transportMode as string));
    };

    const renderItem = ({ item, index }: { item: OptimizedStop; index: number }) => (
        <View style={styles.attractionCard}>
            <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>Stop {index + 1}: {item.name}</Text>
                <Text style={styles.attractionDetails}>
                    {item.distanceFromPrevious} • {item.timeFromPrevious} {index === 0 ? 'from your current location' : 'from previous stop'}
                </Text>
                <Text style={styles.attractionVicinity}>{item.vicinity}</Text>
            </View>

            <View style={styles.attractionRating}>
                <Text style={styles.attractionRatingText}>{item.rating.toFixed(1)}</Text>
                <Ionicons
                    name={item.rating >= 4.5 ? 'star' : item.rating > 2.5 ? 'star-half' : 'star-outline'}
                    size={18}
                    color="#FFB733"
                />
            </View>
        </View>
    );

    const getTransportIcon = (mode: string) => {
        const icons = {
            walk: '🚶',
            bike: '🚲',
            bicycle: '🚲',
            drive: '🚗'
        };
        return icons[mode as keyof typeof icons] || '🚶';
    };

    const handleOpenMaps = async () => {
        if (optimizedStops.length === 0) return;

        const waypoints = optimizedStops
            .map(stop => `${stop.geometry.location.lat},${stop.geometry.location.lng}`)
            .join('|');

        const url = `https://www.google.com/maps/dir/?api=1&destination=${
            optimizedStops[optimizedStops.length - 1].geometry.location.lat
        },${
            optimizedStops[optimizedStops.length - 1].geometry.location.lng
        }&waypoints=${waypoints}&travelmode=${transportMode}`;

        // You'll need to implement linking to open the URL
        // Linking.openURL(url);
    };

    return (
        <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
            <View style={{ flex: 1 }}>
                <View style={styles.itineraryInfoContainer}>
                    <View>
                        <Text style={styles.itineraryInfoText}>Total stops: {optimizedStops.length}</Text>
                        <Text style={styles.itineraryInfoText}>Total distance: {totalDistance}</Text>
                        <Text style={styles.itineraryInfoText}>Total time: {totalTime}</Text>
                        <Text style={styles.itineraryInfoText}>
                            Travel mode: {getTransportIcon(transportMode as string)}
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.itineraryMapButton} onPress={handleOpenMaps}>
                        <Ionicons name="map-outline" size={24} color="#6e4b63" />
                        <Text style={styles.itineraryMapText}>Open in Maps</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={optimizedStops}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ flex: 1 }}
                    contentContainerStyle={[
                        styles.attractionListContainer,
                        { paddingHorizontal: 20 }
                    ]}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={() => (
                        <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
                            <TouchableOpacity 
                                onPress={() => router.push('/home')}
                                style={styles.itinerarySaveButton}
                            >
                                <Text style={styles.saveText}>Save Trip</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
}
