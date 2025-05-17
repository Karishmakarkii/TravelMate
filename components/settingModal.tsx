import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/styles/authStyles';
import { Colors } from '@/styles/colors';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

import '../firebase.js';

const {firebaseConfig} = require('../firebase.js');

type SettingsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onOpenProfile: () => void;
};

export default function SettingsModal({ isVisible, onClose, onOpenProfile }: SettingsModalProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [radiusOpen, setRadiusOpen] = useState(false);
  const [radiusValue, setRadiusValue] = useState(null);
  const [radiusItems, setRadiusItems] = useState([
    { label: '5 km', value: '5' },
    { label: '10 km', value: '10' },
    { label: '20 km', value: '20' },
  ]);
  const [email, setEmail] = useState('');

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');
      }
    });
  }, []);

  function logout() {
    // Firebase function to sign out user
    signOut(auth)
    .then((userCredential) => {     
      router.push('/login');
    })
    .catch((error) => {
      alert("Signout unsuccessful");
    }); 
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.settingBottomModal}>
      <View style={styles.settingContainer}>
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.settingScrollContainer} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color="#3b2e2e" />
            </TouchableOpacity>
          </View>

          {/* Profile section */}
          <View style={styles.settingProfileSection}>
            <View style={styles.settingProfileCircle}>
              <Text style={styles.settingProfileInitial}>{email.substring(0, 2).toUpperCase()}</Text>
            </View>
            <View>
              <Text style={styles.settingProfileEmail}>{email}</Text>
              <TouchableOpacity onPress={onOpenProfile}>
                <Text style={styles.settingEditProfileText}>Edit profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Preferences */}
          <Text style={styles.settingSectionTitle}>PREFERENCES</Text>
          <Text style={styles.settingPreferenceLabel}>Default radius</Text>
          <DropDownPicker
            open={radiusOpen}
            value={radiusValue}
            items={radiusItems}
            setOpen={setRadiusOpen}
            setValue={setRadiusValue}
            setItems={setRadiusItems}
            placeholder="Select radius"
            style={styles.settingDropdown}
            dropDownContainerStyle={styles.settingDropdownContainer}
          />

          <View style={styles.settingToggleRow}>
            <Text style={styles.settingPreferenceLabel}>Dark mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: Colors.paleGrey, true: Colors.dustyPurple }}
              thumbColor={darkMode ? Colors.lightCream : '#fff'}
            />
          </View>

          {/* Subscription */}
          <Text style={styles.settingSectionTitle}>SUBSCRIPTION</Text>
          <Text style={styles.settingPreferenceLabel}>Current plan</Text>
          <TouchableOpacity onPress={() => {onClose();router.push('/premium');}}>
            <Text style={styles.settingLinkText}>Upgrade to Premium</Text>
          </TouchableOpacity>

          {/* Saved Trips */}
          <Text style={styles.settingSectionTitle}>SAVED TRIPS</Text>
          <TouchableOpacity onPress={() =>{onClose(); router.push('/savedTrips')}}>
            <Text style={styles.settingLinkText}>View my saved trips</Text>
          </TouchableOpacity>

          {/* Account */}
          <Text style={styles.settingSectionTitle}>ACCOUNT</Text>
          <TouchableOpacity onPress={() => {onClose(); logout()}}>
            <Text style={styles.settingLinkText}>Log out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}