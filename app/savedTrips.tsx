import { View, Text, TextInput, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/mainLayout';
import { SafeAreaView } from 'react-native-safe-area-context';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, getDoc, doc, updateDoc, collection, getDocs } from "firebase/firestore";

import '../firebase.js';

const { firebaseConfig } = require('../firebase.js');

interface SavedTrips {
    id: string,
    name: string,
    date: string,
    stops: string,
    location: string
}


export default function SavedTripScreen() {
    const router = useRouter();
    const [savedTrips, setSavedTrips] = useState<SavedTrips[]>([]);

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    // Initialize db
    const db = getFirestore(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getSavedTrips(user.email || '');
            }
        });
    }, []);

    async function getSavedTrips(email: string) {
        try {
            const docRef = await getDocs(collection(db, 'users', email, 'savedTrips'));

            const trips: SavedTrips[] = docRef.docs.map(doc => {
                const data = doc.data();

                return {
                    id: doc.id,
                    name: data.name,
                    date: data.date,
                    stops: data.noOfStops,
                    location: data.location
                };
            });

            setSavedTrips(trips);
        } catch (error) {
            console.error('Error getting document:', error);
        }
    }
    
    const renderItem = ({ item }: any) => (
        <View style={styles.savedTripCard}>
            <View style={styles.savedTripHeader}>
                <Text style={styles.savedTripTitle}>{item.name}</Text>
                <Text style={styles.savedTripDate}>{item.date}</Text>
            </View>

            <View style={styles.savedTripInfo}>
                <Text style={styles.savedTripText}>🧭 Stops: {item.stops}</Text>
                <Text style={styles.savedTripText}>📍 {item.location}</Text>
            </View>

            <View style={styles.savedTripActions}>
                <TouchableOpacity onPress={() => router.push({ pathname: '/itineraryView', params: { tripId: item.id } })}>
                    <Text style={styles.savedTripAction}>🗂 Open</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/home')}>
                    <Text style={styles.savedTripAction}>🗺 Map</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={[styles.savedTripAction, { color: '#d9534f' }]}>🗑 Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );


    return (
        <ImageBackground
            source={require('../assets/images/starterImage.jpeg')}
            style={styles.background}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <MainLayout title="Saved Trips" showFooter={true}>
                    <FlatList
                        data={savedTrips}
                        renderItem={renderItem}
                        keyExtractor={(item: { id: any; }) => item.id}
                        contentContainerStyle={{ padding: 20 }}

                    />
                </MainLayout>
            </SafeAreaView>
        </ImageBackground>
    );
}
