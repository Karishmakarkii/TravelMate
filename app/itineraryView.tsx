import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, ImageBackground } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Colors } from '@/styles/colors';
import styles from '@/styles/authStyles';
import MainLayout from '@/components/mainLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
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
    };
  };
}

interface OptimizedStop extends Place {
  distanceFromPrevious: string;
  timeFromPrevious: string;
}

export default function ItineraryView() {
  const { tripId } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [noOfStops, setNoOfStops] = useState('');
  const [stops, setStops] = useState<OptimizedStop[]>([]);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
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
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }

  const renderItem = ({ item, index }: { item: OptimizedStop; index: number }) => (
    <View style={styles.attractionCard}>
      <View style={styles.attractionInfo}>
        <Text style={styles.attractionName}>Stop {index + 1}: {item.name}</Text>
        <Text style={styles.attractionDetails}>
          {item.distanceFromPrevious} • {item.timeFromPrevious} {index === 0 ? 'from your current location' : 'from previous stop'}
        </Text>
        <Text>{item.vicinity}</Text>
      </View>
      <View>
        <Text style={styles.attractionRatingText}>{item.rating.toFixed(1)}</Text>
        <Ionicons
          name={item.rating >= 4.5 ? 'star' : item.rating > 2.5 ? 'star-half' : 'star-outline'}
          size={18}
          color="#FFB733"
        />
      </View>
    </View>
  );

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} color={Colors.dustyPurple} />;
  }

  return (
    <ImageBackground source={require('../assets/images/starterImage.jpeg')} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <MainLayout title="Trip Details">
          <FlatList
            data={stops}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[styles.attractionListContainer, { padding: 20 }]}
            showsVerticalScrollIndicator={false}
          />
        </MainLayout>
      </SafeAreaView>
    </ImageBackground>
  );


}


