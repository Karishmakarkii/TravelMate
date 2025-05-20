import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/styles/colors';
import styles from '@/styles/authStyles';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons';

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

export default function ItineraryView() {
  const { tripId } = useLocalSearchParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [noOfStops, setNoOfStops] = useState('');
  const [stops, setStops] = useState<OptimizedStop[]>([]);

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // Initialize db
  const db = getFirestore(app);

  useEffect(() => {
    getSavedTripItinerary(tripId as string);
  }, [tripId]);

  async function getSavedTripItinerary(id: string) {
    try {
      const docRef = await getDoc(doc(db, 'users', auth.currentUser?.email || '', 'savedTrips', id));

      if (docRef.exists()) {
        const data = docRef.data();
        setName(data.name);
        setDate(data.date);
        setLocation(data.location);
        setNoOfStops(data.noOfStops);
        setStops(data.stops as OptimizedStop[]);
        setLoading(false);
        //setTrip(tripDetails);
      }
    } catch (error) {
        console.error('Error getting document:', error);
    }
  }

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.dustyPurple} />;
  }

  /*if (!trip) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trip not found</Text>
      </View>
    );
  }*/

  const renderItem = ({ item, index }: { item: OptimizedStop; index: number }) => (
    <View style={styles.attractionCard}>
        <View style={styles.attractionInfo}>
            <Text style={styles.attractionName}>Stop {index + 1}: {item.name}</Text>
            <Text style={styles.attractionDetails}>
                {item.distanceFromPrevious} • {item.timeFromPrevious} {index === 0 ? 'from your current location' : 'from previous stop'}
            </Text>
            <Text>{item.vicinity}</Text>
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

  return (
    <ScrollView contentContainerStyle={[styles.settingScrollContainer, { padding: 20 }]}>
      <Text style={styles.settingSectionTitle}>{name}</Text>
      <Text style={styles.settingPreferenceLabel}>{date}</Text>
      <Text style={[styles.settingPreferenceLabel, { marginTop: 5 }]}>Location: {location}</Text>
      <Text style={[styles.settingPreferenceLabel, { marginTop: 5 }]}>Stops: {noOfStops}</Text>
      <FlatList
        data={stops}
        renderItem={renderItem}
        keyExtractor={(item: { id: any; }) => item.id}
        style={{ flex: 1 }}
        contentContainerStyle={[
            styles.attractionListContainer,
            { paddingHorizontal: 20 }
        ]}
        showsVerticalScrollIndicator={false}
    />
      {/*{stops && stops.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#fff',
            padding: 15,
            marginVertical: 10,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 5,
            elevation: 3
          }}>
          <Text style={{ fontFamily: 'Roboto_700Bold', fontSize: 16 }}>{item.time} - {item.place}</Text>
          {item.note && (
            <Text style={{ fontFamily: 'Roboto_400Regular', marginTop: 4 }}>{item.note}</Text>
          )}
        </View>
      ))}*/}
    </ScrollView>
  );
}
