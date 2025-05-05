import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import styles from '../styles/authStyles';

const mockAttractions = [
  { id: '1', name: 'Aorena beach', distance: '1.5 km', time: '5 mins', rating: 4.2 },
  { id: '2', name: 'Balencia view', distance: '3 km', time: '10 mins', rating: 3.8 },
  { id: '3', name: 'Botanic garden', distance: '4.5 km', time: '15 mins', rating: 4.5 },
  { id: '4', name: 'Papola garden', distance: '5.5 km', time: '20 mins', rating: 2.5 },
  { id: '5', name: 'Romani garden', distance: '6.5 km', time: '30 mins', rating: 2.5 },
  { id: '6', name: 'zeerba garden', distance: '7.5 km', time: '60 mins', rating: 5 },
];

export default function AttractionListScreen() {
  const router = useRouter();
  const [selectedAttractions, setSelectedAttractions] = useState<string[]>(mockAttractions.map(a => a.id));

  const toggleSelection = (id: string) => {
    setSelectedAttractions(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.attractionBackground}>
      <Header title="TravelMate" />
      <View style={styles.attractionContainer}>
        <Text style={styles.attractionTitle}>Nearby Attractions in Location</Text>
        <Text style={styles.attractionSubtitle}>
          Hey you are in luck!{'\n'}There are {mockAttractions.length} tourist places near you. Check from list to add to itinerary.
        </Text>

        <ScrollView contentContainerStyle={styles.attractionList}>
          {mockAttractions.map(attraction => (
            <TouchableOpacity
              key={attraction.id}
              onPress={() => toggleSelection(attraction.id)}
              style={[
                styles.attractionCard,
                !selectedAttractions.includes(attraction.id) && styles.attractionCardUnselected,
              ]}
            >
              <View style={styles.attractionLeft}>
                <View style={styles.attractionIcon}>
                  <Text style={styles.attractionInitial}>{attraction.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.attractionName}>{attraction.name}</Text>
                  <Text style={styles.attractionDetails}>
                    {attraction.distance} • {attraction.time}
                  </Text>
                </View>
              </View>
              <View style={styles.attractionRight}>
                <Text style={styles.attractionRating}>{attraction.rating}</Text>
                <FontAwesome name="star" size={16} color="#FFD700" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.attractionButtonRow}>
          <TouchableOpacity style={styles.attractionPrimaryButton} onPress={() => router.push('/itinerary')}>
            <Text style={styles.attractionButtonText}>Create Itinerary</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.attractionCancelButton} onPress={() => router.push('/home')}>
            <Text style={styles.attractionCancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />
    </ImageBackground>
  );
}
