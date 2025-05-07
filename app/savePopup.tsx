import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { useState } from 'react';

export default function savePopScreen() {
  const router = useRouter();
return (
    <ImageBackground
        source={require('../assets/images/PagesImage.jpeg')}
        style={styles.background}
    >
        <View style={styles.loginContainer}>
            <Text style={styles.loginTitle}>Itinerary Saved!</Text>
            <Text style={styles.attractionSubtitle}>
                Your Trip to Location has been saved successfully!{'\n'}
                Please go to saved trips page or click below to view it from saved trips.
            </Text>

            <View style={styles.attractionButtonContainer}>
              <TouchableOpacity onPress={() => router.back()} >
                <Text style={styles.attractionCancelText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => router.push('/savedTrips')} >
                <Text style={styles.attractionCancelText}>View Trip</Text>
              </TouchableOpacity>
            </View> 
        </View>
    </ImageBackground>
);
}
