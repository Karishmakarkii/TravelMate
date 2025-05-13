import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../styles/colors';
import { SafeAreaView } from 'react-native-safe-area-context';


type Props = {
  title: string;
  showMenu?: boolean;
  onOpenSettings: () => void;
};

export default function Header({ title, showMenu = true, onOpenSettings  }: Props) {
  // const router = useRouter();
  // const [showSettings, setShowSettings] = useState(false);

  return (
    <View style={styles.header}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      
      {showMenu && (
        <TouchableOpacity onPress={onOpenSettings}>
          <Text style={styles.menuIcon}>⋮</Text>
        </TouchableOpacity>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: Colors.lightCream,
    borderBottomWidth: 1,
    borderBottomColor: Colors.paleGrey,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Roboto_700Bold',
    color: Colors.deepBrown,
  },
  menuIcon: {
    fontSize: 20,
    color: Colors.deepBrown,
    paddingHorizontal: 10,
  },
});