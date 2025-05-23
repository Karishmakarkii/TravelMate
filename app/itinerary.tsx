import React, { useState, useEffect, } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '../styles/authStyles';
import MainLayout from '@/components/mainLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, addDoc, doc, collection, getDoc, getDocs } from "firebase/firestore";
import * as Location from 'expo-location';
import { Image } from 'react-native';



import '../firebase.js';

const { firebaseConfig } = require('../firebase.js');

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
    const [tripSaved, setTripSaved] = useState(false);
    const [locationName, setLocationName] = useState<string>('your area'); // default fallback
    const [isSaved, setIsSaved] = useState(false);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // Initialize db
    const db = getFirestore(app);

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
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
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

        //Use the first attraction directly
        const firstStop = attractions[0];
        const geocode = await Location.reverseGeocodeAsync({
            latitude: firstStop.geometry.location.lat,
            longitude: firstStop.geometry.location.lng,
        });

        if (geocode && geocode.length > 0) {
            const city = geocode[0].city || geocode[0].district || geocode[0].region || 'your area';
            setLocationName(city);
        }

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
        <View style={styles.itinerarytripCard}>
            <View style={styles.tripCardTop}>
                <Text style={styles.tripCardTitle}>Stop {index + 1}: {item.name}</Text>
                <View style={styles.tripCardRating}>
                    <Text style={styles.tripCardRatingText}>{item.rating.toFixed(1)}</Text>
                    <Ionicons
                        name={item.rating >= 4.5 ? 'star' : item.rating > 2.5 ? 'star-half' : 'star-outline'}
                        size={16}
                        color="#FDB813"
                    />
                </View>
            </View>

            <Text style={styles.tripCardMeta}>
                {item.distanceFromPrevious} • {item.timeFromPrevious} {index === 0 ? 'from your current location' : 'from previous stop'}
            </Text>

            <Text style={styles.tripCardAddress}>{item.vicinity}</Text>
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

        // URL encoding for the destination and waypoints(stops): https://developers.google.com/maps/documentation/urls/get-started
        // Get all stops except the last one for waypoints
        const waypointStops = optimizedStops.slice(0, -1);
        const destination = optimizedStops[optimizedStops.length - 1];

        const waypoints = waypointStops
            .map(stop => `${stop.geometry.location.lat},${stop.geometry.location.lng}`)
            .join('|');

        const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            destination.geometry.location.lat + ',' +
            destination.geometry.location.lng
        )}&waypoints=${encodeURIComponent(waypoints)}&travelmode=${encodeURIComponent(transportMode as string)}`;

        Linking.openURL(url);
    };

    function saveTripRecord() {
        writeToDB(optimizedStops);
    }

    async function writeToDB(stops: OptimizedStop[]) {
        try {
            const email = auth.currentUser?.email || '';
            const doc1Ref = await getDoc(doc(db, 'users', email));

            if (doc1Ref.exists()) {
                const data = doc1Ref.data();

                const snapshot = await getDocs(collection(db, 'users', email, 'savedTrips'));
                const count = snapshot.size;

                if (data.account_type === "premium" || (data.account_type === "free" && count < 2)) {
                    const today = new Date();
                    const doc2Ref = await addDoc(collection(doc(db, "users", email), "savedTrips"), {
                        name: stops[0].vicinity + ' Trip',
                        date: today.getDate().toString() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear().toString(),
                        location: stops[0].vicinity,
                        noOfStops: stops.length,
                        stops: stops,
                        totalDistance: totalDistance,
                        totalTime: totalTime
                    });

                    // Update state to hide the button
                    setIsSaved(true);
                    // Update state to show Modal
                    setTripSaved(true); 
                }
                else {
                    alert("Free accounts are limited to 2 saved trips");
                }
            }
        } catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    return (
        <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
            <SafeAreaView style={{ flex: 1 }}>
                <MainLayout title="Itinerary">
                    <FlatList
                        data={optimizedStops}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
                        showsVerticalScrollIndicator={false}

                        // Header: Trip info and inline map link
                        ListHeaderComponent={
                            <View style={styles.tripSummaryCard}>
                                <Image
                                    source={require('../assets/images/touristimage2.png')} // replace with your asset
                                    style={styles.tripSummaryImage}
                                    resizeMode="contain"
                                />

                                <Text style={styles.tripSummaryTitle}>Trip Summary</Text>
                                <View style={styles.divider} />

                                <View style={styles.tripSummaryItem}>
                                    <Text style={styles.label}>Stops:</Text>
                                    <Text style={styles.value}>{optimizedStops.length}</Text>
                                </View>
                                <View style={styles.tripSummaryItem}>
                                    <Text style={styles.label}>Distance:</Text>
                                    <Text style={styles.value}>{totalDistance}</Text>
                                </View>
                                <View style={styles.tripSummaryItem}>
                                    <Text style={styles.label}>Time:</Text>
                                    <Text style={styles.value}>{totalTime}</Text>
                                </View>
                                <View style={styles.tripSummaryItem}>
                                    <Text style={styles.label}>Mode:</Text>
                                    <Text style={styles.value}>{getTransportIcon(transportMode as string)}</Text>
                                </View>
                            </View>


                        }

                        // CTA map card + save button
                        ListFooterComponent={
                            <View style={{ alignItems: 'center', marginTop: 30, marginBottom: 40 }}>
                                <TouchableOpacity style={styles.mapCardContainer} onPress={handleOpenMaps}>
                                    <View style={styles.mapCardImageWrapper}>
                                        <Image source={require('../assets/images/mapBackground.webp')} style={styles.mapCardImage} resizeMode="cover" />
                                        <Image source={require('../assets/images/mapicon2.png')} style={styles.mapPin} />
                                        <View style={styles.mapLabel}>
                                            <Text style={styles.mapLabelText}>Your Route</Text>
                                        </View>
                                    </View>
                                    <View style={styles.mapCardButton}>
                                        <Text style={styles.mapCardButtonText}>Open in Maps</Text>
                                    </View>
                                </TouchableOpacity>
                                {!isSaved && (
                                    <TouchableOpacity
                                        onPress={() => saveTripRecord()}
                                        style={styles.itinerarySaveButton}                                 
                                    >
                                        <Text style={styles.saveText}>Save Trip</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        }
                    />


                    <Modal transparent visible={tripSaved} animationType="fade">
                        <View style={styles.dialogOverlay}>
                            <View style={styles.dialogBox}>
                                <Text style={styles.dialogTitle}>Trip Saved!</Text>
                                <Text style={styles.dialogMessage}>
                                    Your trip to {locationName} has been successfully saved to your Saved Trips.
                                    {'\n'}You can view it below.
                                </Text>
                                <View style={styles.dialogButtons}>
                                    <TouchableOpacity onPress={() => setTripSaved(false)} style={styles.dialogButton}>
                                        <Text style={styles.dialogButtonText}>Back</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { setTripSaved(false); router.push('/savedTrips'); }} style={styles.dialogButtonPrimary}>
                                        <Text style={styles.dialogButtonTextPrimary}>View Trip</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </MainLayout>
            </SafeAreaView>
        </ImageBackground>
    );
}
