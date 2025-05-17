import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/authStyles';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, getDoc, doc, updateDoc } from "firebase/firestore";

import '../firebase.js';

const {firebaseConfig} = require('../firebase.js');

export type UserType = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

type Props = {
  isVisible: boolean;
  onClose: () => void;
  user: UserType;
};

export default function ProfileModal({ isVisible, onClose, user }: Props) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);

  const initials = `${firstName?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase();

  const fields = [
    { label: 'First Name', value: firstName, setter: setFirstName },
    { label: 'Last name', value: lastName, setter: setLastName },
    { label: 'Phone', value: phone, setter: setPhone },
    { label: 'Email', value: email, setter: setEmail },
  ];

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // Initialize db
  const db = getFirestore(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserData(user.email || '');
      }
    });
    
  }, []);

  async function getUserData(email: string) {
    try {
      const docRef = await getDoc(doc(db, 'users', email));

      if (docRef.exists()) {
        const firstName = docRef.get("firstname");
        const lastName = docRef.get("lastname");
        const phone = docRef.get("phone");

        setFirstName(firstName);
        setLastName(lastName);
        setPhone(phone);
        setEmail(email);
      }
    } catch (error) {
      console.error('Error getting document:', error);
    }
  }

  async function updateUserData() {
    try {
      if (fields[0].value !== '') {
        if (fields[2].value !== '' && /[a-zA-Z]/.test(fields[2].value)) {
          alert("Invalid phone input");
        } else  {
          const docRef = await updateDoc(doc(db, 'users', fields[3].value), {
            firstname: fields[0].value || '',
            lastname: fields[1].value || '',
            phone: fields[2].value || ''
          });

          alert("Profile successfully updated");
        }
      }
      else {
        alert("First Name cannot be empty");
      }
    } catch (error) {
      console.error('Error updating document:', error);
    }
  }

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.profileModal}>
      <View style={styles.profileContainer}>

        {/* Back button */}
        <TouchableOpacity onPress={onClose} style={styles.profileBackButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{initials}</Text>
          </View>
          <Text style={styles.profileTitle}>My profile</Text>
        </View>

        {/* Editable Fields */}
        {fields.map((field, idx) => (
          <View key={idx} style={styles.profileInputGroup}>
            <Text style={styles.profileLabel}>{field.label}</Text>
            <TextInput
              style={styles.profileInput}
              value={field.value}
              onChangeText={field.setter}
              editable={!(field.label === 'Email')}
            />
          </View>
        ))}

        {/* Update proflie*/}

        <View style={styles.profileActionRow}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.profileActionBtn}>Discard</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => updateUserData()}>
            <Text style={styles.profileActionBtn}>Update Profile</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}