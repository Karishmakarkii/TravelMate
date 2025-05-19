// components/MainLayout.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Footer from './footer';
import ProfileModal, { UserType } from './profileModal';
import SettingsModal from './settingModal';
import Header from './header';

type MainLayoutProps = {
  children: React.ReactNode;
  showFooter?: boolean;
  title: string;
};


export default function MainLayout({ children, showFooter = true, title }: MainLayoutProps) {
  // State for managing visibility of profile and settings modals
  const [isProfileVisible, setProfileVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  // Mock user data for profile display
  const user: UserType = {
    firstName: 'Pramodani',
    lastName: 'Jayakodi',
    phone: '+4534555555',
    email: 'promzfedd@gmail.com',
  };

  return (
    <View style={styles.container}>
      {/* Header with settings menu trigger */}
      <Header title={title} showMenu onOpenSettings={() => setSettingsVisible(true)}/>

      {/* Main content area */}
      <View style={styles.content}>
        {children}
      </View>

      {/* Conditional footer with profile trigger */}
      {showFooter && (
        <Footer showBack onOpenProfile={() => setProfileVisible(true)} />
      )}

      {/* Modal components with visibility control */}
      <ProfileModal
        isVisible={isProfileVisible}
        onClose={() => setProfileVisible(false)}
        user={user}
      />

      <SettingsModal
        isVisible={isSettingsVisible}
        onClose={() => setSettingsVisible(false)}
        onOpenProfile={() => setProfileVisible(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});