import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/authStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import MainLayout from '../components/mainLayout';
import { Colors } from 'react-native/Libraries/NewAppScreen';


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
      <SafeAreaView style={{ flex: 1 }}>
        <MainLayout title="Home">
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <View style={[styles.homeContainer, { paddingBottom: 30 }]}>

              {/* Radius Dropdown */}
              <View style={{ zIndex: 3000, marginBottom: 20 }}>
                <Text style={styles.homeTitle}>Set search radius</Text>
                <DropDownPicker
                  open={radiusOpen}
                  value={radiusValue}
                  items={radiusItems}
                  setOpen={setRadiusOpen}
                  setValue={setRadiusValue}
                  setItems={setRadiusItems}
                  placeholder="Select"
                  placeholderStyle={styles.placeholderStyle}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>

              {/* Transport Dropdown */}
              <View style={{ zIndex: 2000, marginBottom: 20 }}>
                <Text style={styles.homeTitle}>Select transport mode</Text>
                <DropDownPicker
                  open={transportOpen}
                  value={transportValue}
                  items={transportItems}
                  setOpen={setTransportOpen}
                  setValue={setTransportValue}
                  setItems={setTransportItems}
                  placeholder="Select"
                  placeholderStyle={styles.placeholderStyle}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>


              {/* Button */}
              <TouchableOpacity
                style={styles.homeButton}
                onPress={() =>
                  router.push({
                    pathname: '/attractionList',
                    params: {
                      radius: radiusValue,
                      transportMode: transportValue,
                    },
                  })
                }
              >
                <Text style={styles.homeButtonText}>Find Places</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </MainLayout>
      </SafeAreaView>
    </ImageBackground>
  );
}

