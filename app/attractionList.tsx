import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { ScrollView } from 'react-native';
import MainLayout from '@/components/mainLayout';
import { SafeAreaView } from 'react-native-safe-area-context';




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

export default function AttractionListScreen() {
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

      <View style={styles.attractionRating}>
        <Text style={styles.attractionRatingText}>{item.rating}</Text>
        <Ionicons // Adding dynamic star for ratings
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

  return (
    <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
      <MainLayout title="Nearby Attractions">
      <View style={styles.scrollWrapper}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.attractionContainer}>
            <Text style={styles.attractionTitle}>Travel in Location</Text>
            <Text style={styles.attractionSubtitle}>
              Hey you are in luck!{'\n'}
              There are {mockAttractions.length} tourist places near you. Check from list to add to itinerary.
            </Text>

            <FlatList
              data={mockAttractions}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.attractionListContainer}
              showsVerticalScrollIndicator={false}
            />

            <View style={styles.attractionButtonContainer}>
              <TouchableOpacity onPress={() => router.back()} >
                <Text style={styles.attractionCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View> 
          </View>

          <View style={{ alignItems: 'center', marginBottom: 10 , marginTop: 10}}>
            <TouchableOpacity onPress={() => router.push('/itinerary')} style={styles.createItineraryButton}>
              <Text style={styles.createItineraryButtonText}>Create Itinerary</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
      </MainLayout>
      </SafeAreaView>
    </ImageBackground>
  );
}
