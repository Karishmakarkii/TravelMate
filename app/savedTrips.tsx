import { View, Text, TextInput, TouchableOpacity, ImageBackground, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainLayout from '../components/mainLayout';

const savedTrips = [
    {
        id: '1',
        name: 'Mornington Trip',
        date: '25.03.2025',
        stops: 5,
        location: 'Mornington Melbourne'
    },
    {
        id: '2',
        name: 'Beach Getaway',
        date: '18.04.2025',
        stops: 3,
        location: 'Bondi Beach'
    }
];

export default function SavedTripScreen() {
    const router = useRouter();


    const renderItem = ({ item }: any) => (
        <View style={styles.tripCard}>
            <Text style={styles.tripTitle}>{item.name} - {item.date}</Text>
            <Text style={styles.tripMeta}>Stops: {item.stops}</Text>
            <Text style={styles.tripMeta}>Location: {item.location}</Text>

            <View style={styles.tripActions}>
                <TouchableOpacity onPress={() => router.push('/itinerary')}><Text style={styles.tripLink}>Open trip</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('/home')}><Text style={styles.tripLink}>Map</Text></TouchableOpacity>
                <TouchableOpacity ><Text style={styles.tripLink}>Remove</Text></TouchableOpacity>
            </View>
        </View>
    );

    return (
        <ImageBackground
            source={require('../assets/images/starterImage.jpeg')}
            style={styles.background}
        >
            <SafeAreaView style={{ flex: 1 }}>
                <MainLayout title="Saved Trips" showFooter={false}>
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
// TODO:Replace `savedTrips` mock data with real data from Firebase
// - Use `useEffect` to fetch trips from Firestore when component mounts
// - Store fetched trips in state using useState()
// - Ensure each trip object includes: id, name (from first attraction), date, number of stops, location
// - Optional: implement delete functionality (TRAV-34) and enforce trip limit (TRAV-35)

