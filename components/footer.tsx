import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 
import { Colors } from '../styles/colors';

type Props = { showBack?: boolean };

export default function Footer({ showBack = false }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', icon: 'home', route: '/home' as const},
    { name: 'Saved', icon: 'bookmark', route: '/saved' as const},
    { name: 'Profile', icon: 'person', route: '/profile' as const },
  ];

  return (
    <View style={styles.container}>
      {showBack && (
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#888" />
          <Text style={styles.label}>Back</Text>
        </TouchableOpacity>
      )}
      {navItems.map(item => (
        <TouchableOpacity key={item.name} style={styles.button} onPress={() => router.push(item.route)}>
          <Ionicons name={item.icon as any} size={24} color={pathname === item.route ? Colors.dustyPurple : '#888'} />
          <Text style={[styles.label, pathname === item.route && styles.activeLabel]}>{item.name}</Text>
        </TouchableOpacity>
      ))}
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
