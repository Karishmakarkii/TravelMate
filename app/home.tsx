import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import Header from '@/components/header';
import Footer from '@/components/footer';
import DropDownPicker from 'react-native-dropdown-picker';

export default function HomeScreen() {
  const router = useRouter();

  const [radiusOpen, setRadiusOpen] = useState(false);
  const [radiusValue, setRadiusValue] = useState(null);
  const [radiusItems, setRadiusItems] = useState([
    { label: '5 km', value: '5' },
    { label: '10 km', value: '10' },
    { label: '30 km', value: '30' },
    { label: '50 km', value: '50' },
  ]);

  const [transportOpen, setTransportOpen] = useState(false);
  const [transportValue, setTransportValue] = useState(null);
  const [transportItems, setTransportItems] = useState([
    { label: 'Walk', value: 'walk' },
    { label: 'Drive', value: 'drive' },
    { label: 'Bike', value: 'bike' },
    { label: 'Bicycle', value: 'bicycle' },
  ]);

  useEffect(() => {
    if (radiusOpen) setTransportOpen(false);
    if (transportOpen) setRadiusOpen(false);
  }, [radiusOpen, transportOpen]);

  return (
    <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
      <View style={{ flex: 1 }}>
        <Header title="TravelMate" />
        <ScrollView contentContainerStyle={[styles.homeContainer, { paddingBottom: 30 }]}>
          <Text style={styles.homeTitle}>Set search radius</Text>
          <DropDownPicker
            open={radiusOpen}
            value={radiusValue}
            items={radiusItems}
            setOpen={setRadiusOpen}
            setValue={setRadiusValue}
            setItems={setRadiusItems}
            placeholder="Select"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={3000}
            zIndexInverse={1000}
          />

          <Text style={styles.homeTitle}>Select transport mode</Text>
          <DropDownPicker
            open={transportOpen}
            value={transportValue}
            items={transportItems}
            setOpen={setTransportOpen}
            setValue={setTransportValue}
            setItems={setTransportItems}
            placeholder="Select"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
            zIndex={2000}
            zIndexInverse={2000}
          />

          <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/attractionList')}>
            <Text style={styles.homeButtonText}>Find Places</Text>
          </TouchableOpacity>
        </ScrollView>
        <Footer showBack />
      </View>
    </ImageBackground>
  );
}

// Implement with firebase to route to no results screen when no location found

// //if (results.length === 0) {
//   router.push('/noResults');
// } else {
//   router.push('/attractionList');
// }

