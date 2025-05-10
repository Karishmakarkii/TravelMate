// components/MainLayout.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from './footer';
import ProfileModal, { UserType} from './profileModal';

export default function MainLayout({ children, showFooter=true }: { children: React.ReactNode, showFooter?: boolean }) {
  const [isProfileVisible, setProfileVisible] = useState(false);

  const user: UserType = {
    firstName: 'Pramodani',
    lastName: 'Jayakodi',
    phone: '+4534555555',
    email: 'promzfedd@gmail.com',
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>

      {showFooter && (
        <Footer  showBack onOpenProfile={() => setProfileVisible(true)} />
      )}



      <ProfileModal
        isVisible={isProfileVisible}
        onClose={() => setProfileVisible(false)}
        user={user}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
