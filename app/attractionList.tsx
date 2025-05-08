import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter, useLocalSearchParams } from 'expo-router';
import styles from '../styles/authStyles';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { BlurView } from 'expo-blur';
import * as Location from 'expo-location';
import { GOOGLE_MAPS_API_KEY } from '@env';

// Types for our places
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

export default function AttractionListScreen() {
  const router = useRouter();
  const { radius, transportMode } = useLocalSearchParams();
  
  const [selected, setSelected] = useState<string[]>([]);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [attractions, setAttractions] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to calculate travel time based on distance and transport mode
  const calculateTravelTime = (distanceInKm: number, mode: string): string => {
    const speeds = {
      walk: 5, // 5 km/h walking speed
      bike: 15, // 15 km/h biking speed
      bicycle: 15, // 15 km/h cycling speed
      drive: 40, // 40 km/h driving speed (urban average)
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

  // Function to fetch nearby places from Google Places API
  const fetchNearbyPlaces = async (latitude: number, longitude: number, radiusInKm: number) => {
    try {
      const radiusInMeters = radiusInKm * 1000;
      const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radiusInMeters}&type=tourist_attraction&key=${GOOGLE_MAPS_API_KEY}`
      );
      
      const data = await response.json();
      
      console.log(data);
      if (data.status === 'REQUEST_DENIED') {
        console.error('Google Maps API Error:', data.error_message);
        throw new Error('Invalid API key or API not enabled. Please check your Google Maps API configuration.');
      }
      
      if (data.status !== 'OK') {
        console.error('Google Maps API Error:', data.error_message);
        throw new Error(data.error_message || 'Failed to fetch places');
      }

      // Process and format the places data
      const formattedPlaces = await Promise.all(data.results.map(async (place: any) => {
        try {
          // Calculate actual distance using Distance Matrix API
          const distanceResponse = await fetch(
            `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${latitude},${longitude}&destinations=${place.geometry.location.lat},${place.geometry.location.lng}&mode=${transportMode}&key=${GOOGLE_MAPS_API_KEY}`
          );
          
          const distanceData = await distanceResponse.json();
          
          if (distanceData.status !== 'OK') {
            console.error('Distance Matrix API Error:', distanceData.error_message);
            // If distance calculation fails, fall back to straight-line distance
            const straightLineDistance = calculateStraightLineDistance(
              latitude,
              longitude,
              place.geometry.location.lat,
              place.geometry.location.lng
            );
            return {
              id: place.place_id,
              name: place.name,
              distance: `${straightLineDistance.toFixed(1)} km`,
              time: calculateTravelTime(straightLineDistance, transportMode as string),
              rating: place.rating || 0,
              vicinity: place.vicinity,
              geometry: place.geometry
            };
          }

          if (!distanceData.rows?.[0]?.elements?.[0]?.distance) {
            throw new Error('Invalid distance matrix response structure');
          }

          const distanceInKm = distanceData.rows[0].elements[0].distance.value / 1000;
          const travelTime = calculateTravelTime(distanceInKm, transportMode as string);

          return {
            id: place.place_id,
            name: place.name,
            distance: `${distanceInKm.toFixed(1)} km`,
            time: travelTime,
            rating: place.rating || 0,
            vicinity: place.vicinity,
            geometry: place.geometry
          };
        } catch (error) {
          console.error('Error calculating distance for place:', place.name, error);
          // Fall back to straight-line distance calculation
          const straightLineDistance = calculateStraightLineDistance(
            latitude,
            longitude,
            place.geometry.location.lat,
            place.geometry.location.lng
          );
          return {
            id: place.place_id,
            name: place.name,
            distance: `${straightLineDistance.toFixed(1)} km`,
            time: calculateTravelTime(straightLineDistance, transportMode as string),
            rating: place.rating || 0,
            vicinity: place.vicinity,
            geometry: place.geometry
          };
        }
      }));

      // Sort places by distance
      return formattedPlaces.sort((a, b) => 
        parseFloat(a.distance.split(' ')[0]) - parseFloat(b.distance.split(' ')[0])
      );
    } catch (error) {
      console.error('Error fetching places:', error);
      throw error;
    }
  };

  // Helper function to calculate straight-line distance between two points using the Haversine formula
  const calculateStraightLineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
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

  useEffect(() => {
    (async () => {
      if (!radius || !transportMode) {
        setErrorMsg('Please select radius and transport mode');
        setLoading(false);
        return;
      }

      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          Alert.alert(
            'Location Permission Required',
            'Please enable location services to find nearby attractions.',
            [{ text: 'OK' }]
          );
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        console.log(location);
        
        const places = await fetchNearbyPlaces(
          location.coords.latitude,
          location.coords.longitude,
          parseInt(radius as string)
        );
        
        setAttractions(places);
      } catch (error) {
        console.error('Error:', error);
        setErrorMsg('Error fetching nearby places');
        Alert.alert('Error', 'Failed to get nearby places. Please try again.');
      } finally {
        setLoading(false);
      }
    })();
  }, [radius, transportMode]);

  const toggleSelection = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const renderItem = ({ item }: { item: Place }) => (
    <View style={styles.attractionCard}>
      <View style={styles.attractionInfo}>
        <Text style={styles.attractionName}>{item.name}</Text>
        <Text style={styles.attractionDetails}>
          {item.distance} • {item.time}
        </Text>
        <Text style={styles.attractionVicinity}>{item.vicinity}</Text>
      </View>

      <View style={styles.attractionRating}>
        <Text style={styles.attractionRatingText}>{item.rating.toFixed(1)}</Text>
        <Ionicons
          name={
            item.rating >= 4.5
              ? 'star'
              : item.rating > 2.5
                ? 'star-half'
                : 'star-outline'
          }
          size={18}
          color="#FFB733"
        />
      </View>

      <Checkbox
        value={selected.includes(item.id)}
        onValueChange={() => toggleSelection(item.id)}
        style={styles.attractionCheckbox}
        color={selected.includes(item.id) ? '#6e4b63' : undefined}
      />
    </View>
  );

  if (loading) {
    return (
      <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
        <Header title="TravelMate" />
        <View style={styles.attractionContainer}>
          <Text style={styles.attractionTitle}>Loading nearby attractions...</Text>
        </View>
        <Footer showBack />
      </ImageBackground>
    );
  }

  if (errorMsg) {
    return (
      <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
        <Header title="TravelMate" />
        <View style={styles.attractionContainer}>
          <Text style={styles.attractionTitle}>Error</Text>
          <Text style={styles.attractionSubtitle}>{errorMsg}</Text>
        </View>
        <Footer showBack />
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
      <Header title="TravelMate" />
      <View style={styles.attractionContainer}>
        <Text style={styles.attractionTitle}>Nearby Attractions</Text>
        <Text style={styles.attractionSubtitle}>
          Hey you are in luck!{'\n'}
          There are {attractions.length} tourist places within {radius}km. Check from list to add to itinerary.
        </Text>

        <FlatList
          data={attractions}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.attractionListContainer}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.attractionButtonContainer}>
          <TouchableOpacity 
            onPress={() => {
              // Pass selected attractions to the itinerary screen
              const selectedAttractions = attractions.filter(a => selected.includes(a.id));
              router.push({
                pathname: '/itinerary',
                params: { 
                  attractions: JSON.stringify(selectedAttractions),
                  transportMode
                }
              });
            }}
            disabled={selected.length === 0}
            style={[
              styles.createItineraryButton,
              selected.length === 0 && styles.disabledButton
            ]}
          >
            <Text style={styles.createItineraryButtonText}>
              Create Itinerary ({selected.length} selected)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.back()} >
            <Text style={styles.attractionCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer showBack />
    </ImageBackground>
  );
}
