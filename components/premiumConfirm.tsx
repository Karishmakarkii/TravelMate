// components/PremiumConfirmationModal.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function PremiumConfirmationModal({ isVisible, onClose }: Props) {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Ionicons name="close" size={24} color={Colors.deepBrown} />
          </TouchableOpacity>

          <Text style={styles.title}>PREMIUM MEMBER</Text>
          <View style={styles.iconCircle}>
            <Ionicons name="flash" size={36} color="#fff" />
          </View>
          <Text style={styles.message}>Hooray! You are now a premium member with us</Text>

          <View style={styles.benefits}>
            <Ionicons name="cloud-download" size={20} color={Colors.deepBrown} />
            <Ionicons name="remove-circle" size={20} color={Colors.deepBrown} />
            <Ionicons name="bookmark" size={20} color={Colors.deepBrown} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.lightCream,
    padding: 25,
    borderRadius: 30,
    width: '85%',
    alignItems: 'center',
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.deepBrown,
    marginBottom: 10,
  },
  iconCircle: {
    backgroundColor: Colors.dustyPurple,
    padding: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  message: {
    textAlign: 'center',
    color: Colors.deepBrown,
    marginBottom: 15,
  },
  benefits: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 10,
  },
});
