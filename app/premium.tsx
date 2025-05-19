import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';
import PremiumConfirmationModal from '@/components/premiumConfirm';
import { useState } from 'react';
import styles from '@/styles/authStyles';


export default function Premium() {
  const router = useRouter();
  const [showConfirmation, setShowConfirmation] = useState(false);

  return (
    <View style={styles.premiumContainer}>
      <TouchableOpacity onPress={() => router.back()} style={styles.premiumBackBtn}>
        <Ionicons name="arrow-back" size={24} color={Colors.deepBrown} />
      </TouchableOpacity>

      <Text style={styles.premiumTitle}>OUR PREMIUM PLAN</Text>
      <View style={styles.premiumIconCircle}>
        <Ionicons name="flash" size={36} color="#fff" />
      </View>
      <Text style={styles.premiumDescription}>Unlock full TravelMate experience!</Text>

      <View style={styles.premiumBenefitItem}>
        <Ionicons name="cloud-download" size={20} color={Colors.deepBrown} style={styles.premiumBenefitIcon} />
        <Text style={styles.premiumBenefitText}>Offline access to itineraries</Text>
      </View>
      <View style={styles.premiumBenefitItem}>
        <Ionicons name="bookmark" size={20} color={Colors.deepBrown} style={styles.premiumBenefitIcon} />
        <Text style={styles.premiumBenefitText}>Unlimited saved trips</Text>
      </View>
      <View style={styles.premiumBenefitItem}>
        <Ionicons name="remove-circle" size={20} color={Colors.deepBrown} style={styles.premiumBenefitIcon} />
        <Text style={styles.premiumBenefitText}>Ad-free experience</Text>
      </View>


      <TouchableOpacity onPress={() => setShowConfirmation(true)}>
        <Text style={styles.premiumUpgradeBtnText}>Upgrade now</Text>
      </TouchableOpacity>

      <Text style={styles.premiumPrice}>Just $4.99/month</Text>


      <Text style={styles.premiumCancelNote}>You can cancel anytime. Premium applies across all your devices.</Text>

      <TouchableOpacity style={styles.premiumUnlockBtn}>
        <Text style={styles.premiumUnlockBtnText}>⭐ Unlock This Trip Only</Text>
      </TouchableOpacity>

      <PremiumConfirmationModal
        isVisible={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </View>
  );
}

