import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { ScrollView } from 'react-native';



const mockAttractions = [
    { id: '1', name: 'Aorena beach', distance: '1.5 km', time: '5 mins', rating: 4.2 },
    { id: '2', name: 'Balencia view', distance: '3 km', time: '10 mins', rating: 3.8 },
    { id: '3', name: 'Botanic garden', distance: '4.5 km', time: '15 mins', rating: 4.5 },
    { id: '4', name: 'Papola garden', distance: '5.5 km', time: '20 mins', rating: 2.5 },
    { id: '5', name: 'Romani garden', distance: '6.5 km', time: '30 mins', rating: 2.5 },
    { id: '6', name: 'Zeerba garden', distance: '7.5 km', time: '60 mins', rating: 5.0 },
    { id: '6', name: 'Zeerba garden', distance: '7.5 km', time: '60 mins', rating: 5.0 },
    { id: '6', name: 'Zeerba garden', distance: '7.5 km', time: '60 mins', rating: 5.0 },
    { id: '6', name: 'Zeerba garden', distance: '7.5 km', time: '60 mins', rating: 5.0 },
];

export default function ItineraryScreen() {
    const router = useRouter();
    const [selected, setSelected] = useState(mockAttractions.map(item => item.id));

    const toggleSelection = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const renderItem = ({ item }: any) => (
        <View style={styles.attractionCard}>
            <View style={styles.attractionInfo}>
                <Text style={styles.attractionName}>{item.name}</Text>
                <Text style={styles.attractionDetails}>{item.distance} • {item.time}</Text>
            </View>


            <Checkbox
                value={selected.includes(item.id)}
                onValueChange={() => toggleSelection(item.id)}
                style={styles.attractionCheckbox}
                color={selected.includes(item.id) ? '#6e4b63' : undefined}
            />
        </View>
    );

    return (
        <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
            <Header title="Your Itinerary" />
            <View style={styles.scrollWrapper}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.itineraryInfoContainer}>
                <View>
                    <Text style={styles.itineraryInfoText}>Total stops : {selected.length}</Text>
                    <Text style={styles.itineraryInfoText}>Total time : 12 km, 45 mins</Text>
                    <Text style={styles.itineraryInfoText}>Travel mode : 🚗</Text>
                </View>
                <TouchableOpacity style={styles.itineraryMapButton} onPress={() => router.back()}>
                    <Ionicons name="map-outline" size={24} color="#6e4b63" />
                    <Text style={styles.itineraryMapText}>Open in Maps</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.itineraryContainer}>
                <FlatList
                    data={mockAttractions}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.attractionListContainer}
                    showsVerticalScrollIndicator={false}
                />
            </View>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity onPress={() => router.push('/savePopup')}
                    style={styles.itinerarySaveButton}
                >
                    <Text style={styles.saveText}>Save</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </View>
            <Footer showBack />
        </ImageBackground>
    );
}
