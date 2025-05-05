import { useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground, Modal, Pressable } from 'react-native';   
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Ionicons } from '@expo/vector-icons';

const radiusOptions = ['5 km', '10 km', '30 km', '50 km'];
const transportOptions = ['Walk', 'Drive', 'Bike', 'Bicycle'];

export default function HomeScreen() {
  const router = useRouter();
  const [radius, setRadius] = useState('');
  const [transport, setTransport] = useState('');
  const [radiusModalVisible, setRadiusModalVisible] = useState(false);
  const [transportModalVisible, setTransportModalVisible] = useState(false);

  return (
    <ImageBackground source={require('../assets/images/PagesImage.jpeg')} style={[styles.background, { flex: 1 }]}>
      <View style={{ flex: 1 }}>
        <Header title="TravelMate" />
        <View style={[styles.homeContainer, { flex: 1, justifyContent: 'center' }]}>
          <Text style={styles.homeTitle}>Set search radius</Text>
          <TouchableOpacity style={styles.homeSelectBox} onPress={() => setRadiusModalVisible(true)}>
            <View style={styles.arrow}>
              <Text style={styles.homeSelectText}>{radius || 'Select'}</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </View>
          </TouchableOpacity>

          <Text style={styles.homeTitle}>Select transport mode</Text>
          <TouchableOpacity style={styles.homeSelectBox} onPress={() => setTransportModalVisible(true)}>
            <View style={styles.arrow}>
              <Text style={styles.homeSelectText}>{transport || 'Select'}</Text>
              <Ionicons name="chevron-down" size={20} color="#fff" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.homeButton} onPress={() => router.push('/attractionList')}>
            <Text style={styles.homeButtonText}>Find Places</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={radiusModalVisible} transparent animationType="fade">
          <Pressable style={styles.modalBackdrop} onPress={() => setRadiusModalVisible(false)}>
            <View style={styles.modalBox}>
              {radiusOptions.map(option => (
                <TouchableOpacity key={option} style={styles.modalItem} onPress={() => { setRadius(option); setRadiusModalVisible(false); }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

        <Modal visible={transportModalVisible} transparent animationType="fade">
          <Pressable style={styles.modalBackdrop} onPress={() => setTransportModalVisible(false)}>
            <View style={styles.modalBox}>
              {transportOptions.map(option => (
                <TouchableOpacity key={option} style={styles.modalItem} onPress={() => { setTransport(option); setTransportModalVisible(false); }}>
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Pressable>
        </Modal>

        <Footer showBack />
      </View>
    </ImageBackground>
  );
}
