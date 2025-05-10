// SettingsModal.tsx
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';

type SettingsModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onOpenProfile: () => void;
  };
  

export default function SettingsModal({ isVisible, onClose, onOpenProfile}:SettingsModalProps) {
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
        <Modal isVisible={isVisible} onBackdropPress={onClose} style={styles.bottomModal}>
            <View style={styles.settingContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={onClose}>
                        <Ionicons name="arrow-back" size={24} color="#3b2e2e" />
                    </TouchableOpacity>
                </View>

                {/* Profile section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileCircle}><Text style={styles.profileInitial}>PJ</Text></View>
                    <View>
                        <Text style={styles.profileEmail}>pk34demo@gmail.com</Text>
                        <TouchableOpacity onPress={onOpenProfile}>
                            <Text style={styles.editProfileText}>Edit profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Preferences */}
                <Text style={styles.sectionTitle}>PREFERENCES</Text>
                <Text style={styles.preferenceLabel}>Default radius</Text>
                <DropDownPicker
                    open={radiusOpen}
                    value={radiusValue}
                    items={radiusItems}
                    setOpen={setRadiusOpen}
                    setValue={setRadiusValue}
                    setItems={setRadiusItems}
                    placeholder="Select radius"
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                />

                <View style={styles.toggleRow}>
                    <Text style={styles.preferenceLabel}>Dark mode</Text>
                    <Switch value={darkMode} onValueChange={setDarkMode} />
                </View>

                {/* Subscription */}
                <Text style={styles.sectionTitle}>SUBSCRIPTION</Text>
                <Text style={styles.preferenceLabel}>Current plan</Text>
                <TouchableOpacity onPress={() => router.push('/premium')}>
                    <Text style={styles.linkText}>Upgrade to Premium</Text>
                </TouchableOpacity>

                {/* Saved Trips */}
                <Text style={styles.sectionTitle}>SAVED TRIPS</Text>
                <TouchableOpacity onPress={() => router.push('/savedTrips')}>
                    <Text style={styles.linkText}>View my saved trips</Text>
                </TouchableOpacity>

                {/* Account */}
                <Text style={styles.sectionTitle}>ACCOUNT</Text>
                <TouchableOpacity onPress={() => router.push('/login')}>
                    <Text style={styles.linkText}>Log out</Text>
                </TouchableOpacity>
            </View>

        </Modal>
    );
}
