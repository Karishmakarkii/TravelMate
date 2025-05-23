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
import { getAuth, onAuthStateChanged, signOut, deleteUser, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import PasswordPromptModal from './passwordPromptModal';

import '../firebase.js';

const { firebaseConfig } = require('../firebase.js');

type SettingsModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onOpenProfile: () => void;
};

export default function SettingsModal({ isVisible, onClose, onOpenProfile }: SettingsModalProps) {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [radiusOpen, setRadiusOpen] = useState(false);
  const [radiusValue, setRadiusValue] = useState<string | null>(null);
  const [radiusItems, setRadiusItems] = useState([
    { label: '5 km', value: '5' },
    { label: '10 km', value: '10' },
    { label: '30 km', value: '30' },
    { label: '50 km', value: '50' }
  ]);
  const [email, setEmail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');
        // Get user's default radius when component mounts
        getUserDefaultRadius(user.email || '');
      }
    });

    return () => unsubscribe();
  }, []);

  // Get user's default radius from Firestore
  const getUserDefaultRadius = async (userEmail: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userEmail));
      if (userDoc.exists()) {
        const defaultRadius = userDoc.get('defaultRadius');
        if (defaultRadius) {
          setRadiusValue(defaultRadius.toString());
        }
      }
    } catch (error) {
      console.error('Error getting default radius:', error);
    }
  };

  // Called when user selects or types in a radius
  const handleRadiusChange = async (value: string | null) => {
    if (!value) return;

    // Remove "km" if user typed it
    const cleanValue = value.replace(/\s*km/i, '').trim();

    // Check if it's already in the list
    const exists = radiusItems.some(item => item.value === cleanValue);

    if (!exists) {
      setRadiusItems(prev => [...prev, { label: `${cleanValue} km`, value: cleanValue }]);
    }
    setRadiusValue(cleanValue);

    // Save to Firestore
    try {
      await updateDoc(doc(db, 'users', email), {
        defaultRadius: cleanValue
      });
    } catch (error) {
      console.error('Error saving default radius:', error);
      alert('Failed to save default radius');
    }
  };

  // function for logout
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

  // Function to delete user account with reauthemtication with password
  async function deleteAccountWithReauth(email: string, password: string) {
    const user = auth.currentUser;

    if (!user || !email) {
      alert("No user is currently signed in.");
      return;
    }

    const credential = EmailAuthProvider.credential(email, password);

    try {
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      alert("Account deleted successfully");
      onClose();
      router.push('/login');
    } catch (error: any) {
      console.error("Delete error:", error);
      if (error.code === 'auth/wrong-password') {
        alert("Incorrect password.");
      } else if (error.code === 'auth/requires-recent-login') {
        alert("Please log in again and try deleting your account.");
      } else {
        alert("Could not delete account. Please try again.");
      }
    }
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
          <View>
            <DropDownPicker
              open={radiusOpen}
              value={radiusValue}
              items={radiusItems}
              setOpen={setRadiusOpen}
              setValue={setRadiusValue}
              setItems={setRadiusItems}
              placeholder="Select or enter radius"
              style={styles.settingDropdown}
              dropDownContainerStyle={styles.settingDropdownContainer}
              zIndex={3000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW" // prevent FlatList use
              // Option for user to add value manually
              searchable={true}
              searchPlaceholder="Type radius in km"
              onChangeValue={handleRadiusChange}
              onChangeSearchText={handleRadiusChange}
              searchTextInputStyle={{
                borderWidth: 0,
                backgroundColor: 'transparent',
                paddingLeft: 10,
                fontFamily: 'Roboto_400Regular',
              }}
            />
          </View>

          {/* Subscription */}
          <Text style={styles.settingSectionTitle}>SUBSCRIPTION</Text>
          <Text style={styles.settingPreferenceLabel}>Current plan</Text>
          <TouchableOpacity onPress={() => { onClose(); router.push('/premium'); }}>
            <Text style={styles.settingLinkText}>Upgrade to Premium</Text>
          </TouchableOpacity>

          {/* Saved Trips */}
          <Text style={styles.settingSectionTitle}>SAVED TRIPS</Text>
          <TouchableOpacity onPress={() => { onClose(); router.push('/savedTrips') }}>
            <Text style={styles.settingLinkText}>View my saved trips</Text>
          </TouchableOpacity>

          {/* Account */}
          <Text style={styles.settingSectionTitle}>ACCOUNT</Text>
          <TouchableOpacity onPress={() => { onClose(); logout() }}>
            <Text style={styles.settingLinkText}>Log out</Text>
          </TouchableOpacity>

          {/* DeleteAccount */}
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.settingLinkText}>Delete Account</Text>
          </TouchableOpacity>

          <PasswordPromptModal
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            onSubmit={async (password) => {
              await deleteAccountWithReauth(email, password);
              setModalVisible(false);
            }}
          />


        </ScrollView>
      </View>
    </Modal>
  );
}