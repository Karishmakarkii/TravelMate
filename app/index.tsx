import { View, Text, Image, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import Header from '../components/header';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={require('../assets/images/starterImage.jpeg')} style={styles.background}>
      <Header title="Welcome" onOpenSettings={() => {}} />
      <View style={styles.splashContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.splashLogo} />
        <Text style={styles.splashTitle}>Welcome to TravelMate</Text>
        <Text style={styles.splashSubtitle}>Explore Near You</Text>

        <TouchableOpacity style={styles.splashButton} onPress={() => router.push('/login')}>
          <Text style={styles.splashButtonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
