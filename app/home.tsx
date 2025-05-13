import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/authStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import MainLayout from '../components/mainLayout';
import ProfileModal, { UserType } from '../components/profileModal';

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

  // Profile modal state and dummy user
  const [profileVisible, setProfileVisible] = useState(false);
  const dummyUser: UserType = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    email: 'john@example.com',
  };

  useEffect(() => {
    if (radiusOpen) setTransportOpen(false);
    if (transportOpen) setRadiusOpen(false);
  }, [radiusOpen, transportOpen]);

  return (
    <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <MainLayout title="Home">
          <View style={{ flex: 1 }}>
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

              <TouchableOpacity 
                style={styles.homeButton} 
                onPress={() => router.push({
                  pathname: '/attractionList',
                  params: {
                    radius: radiusValue,
                    transportMode: transportValue
                  }
                })}
              >
                <Text style={styles.homeButtonText}>Find Places</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </MainLayout>
      </SafeAreaView>
    </ImageBackground>
  );
}

