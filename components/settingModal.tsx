import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import styles from '@/styles/authStyles';
import { Colors } from '@/styles/colors';

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

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.settingBottomModal}>
      <View style={styles.settingContainer}>
        <ScrollView contentContainerStyle={styles.settingScrollContainer} showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="arrow-back" size={24} color="#3b2e2e" />
            </TouchableOpacity>
          </View>

          {/* Profile section */}
          <View style={styles.settingProfileSection}>
            <View style={styles.settingProfileCircle}>
              <Text style={styles.settingProfileInitial}>PJ</Text>
            </View>
            <View>
              <Text style={styles.settingProfileEmail}>pk34demo@gmail.com</Text>
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
          <TouchableOpacity onPress={() => router.push('/premium')}>
            <Text style={styles.settingLinkText}>Upgrade to Premium</Text>
          </TouchableOpacity>

          {/* Saved Trips */}
          <Text style={styles.settingSectionTitle}>SAVED TRIPS</Text>
          <TouchableOpacity onPress={() => router.push('/savedTrips')}>
            <Text style={styles.settingLinkText}>View my saved trips</Text>
          </TouchableOpacity>

          {/* Account */}
          <Text style={styles.settingSectionTitle}>ACCOUNT</Text>
          <TouchableOpacity onPress={() => router.push('/login')}>
            <Text style={styles.settingLinkText}>Log out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
