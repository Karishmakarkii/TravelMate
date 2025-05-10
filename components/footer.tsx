import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../styles/colors';

type Props = {
  showBack?: boolean;
  onOpenProfile: () => void;
};


export default function Footer({ showBack = false, onOpenProfile }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: 'home', route: '/home' as const},
    { name: 'Saved', icon: 'bookmark', route: '/savedTrips' as const},
    { name: 'Profile', icon: 'person', route: null }, // route null for modal
  ];

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#888" />
          <Text style={styles.label}>Back</Text>
        </TouchableOpacity>
      )}

      {navItems.map((item) => {
        const isActive = item.route && pathname === item.route;

        return (
          <TouchableOpacity key={item.name} style={styles.button}
            onPress={() => {
              if (item.name === 'Profile') {
                onOpenProfile(); // open profile modal
              }else if (item.route) {
                router.push(item.route as any); // else open the other routes like home save trips
              }
            }}
          >
            <Ionicons
              name={item.icon as any}
              size={24}
              color={isActive ? Colors.dustyPurple : '#888'}
            />
            <Text style={[styles.label, isActive && styles.activeLabel]}>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lightCream,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  button: { alignItems: 'center' },
  label: { fontSize: 12, color: '#888', marginTop: 4 },
  activeLabel: { color: Colors.dustyPurple, fontWeight: 'bold' },
});
