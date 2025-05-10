import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/authStyles';

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
    { label: 'First name', value: firstName, setter: setFirstName },
    { label: 'Last name', value: lastName, setter: setLastName },
    { label: 'Phone', value: phone, setter: setPhone },
    { label: 'Email', value: email, setter: setEmail },
  ];

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
            />
          </View>
        ))}

        {/* Update proflie*/}

        <View style={styles.profileActionRow}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.profileActionBtn}>Discard</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.profileActionBtn}>Update Profile</Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  );
}
