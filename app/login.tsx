import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ImageBackground source={require('../assets/images/starterImage.jpeg')} style={styles.background}>
      <View style={styles.signupContainer}>
        <Text style={styles.loginTitle}>Sign Up</Text>
        <TextInput placeholder="Name" style={styles.signupInput} />
        <TextInput placeholder="Email" style={styles.signupInput} keyboardType="email-address" />
        <TextInput placeholder="Password" style={styles.signupInput} secureTextEntry />
        <TextInput placeholder="Confirm Password" style={styles.signupInput} secureTextEntry />

        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.signupLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
