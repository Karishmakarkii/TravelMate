import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Colors } from '@/styles/colors';
import styles from '@/styles/authStyles';

const { firebaseConfig } = require('../firebase.js');
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function ItineraryView() {
  const { tripId } = useLocalSearchParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrip = async () => {
      if (!tripId) return;
      try {
        const docRef = doc(db, 'trips', tripId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setTrip(docSnap.data());
        }
      } catch (err) {
        console.error('Failed to fetch trip:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [tripId]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.dustyPurple} />;
  }

  if (!trip) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Trip not found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={[styles.settingScrollContainer, { padding: 20 }]}>
      <Text style={styles.settingSectionTitle}>{trip.title}</Text>
      <Text style={styles.settingPreferenceLabel}>{trip.date}</Text>
      <Text style={[styles.settingPreferenceLabel, { marginTop: 5 }]}>Location: {trip.location}</Text>
      <Text style={[styles.settingPreferenceLabel, { marginTop: 5 }]}>Stops: {trip.stops}</Text>

      {trip.itinerary && trip.itinerary.map((item, index) => (
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
      ))}
    </ScrollView>
  );
}
