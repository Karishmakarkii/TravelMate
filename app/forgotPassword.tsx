import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/starterImage.jpeg')}
      style={styles.background}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Forgot Password</Text>

        <Text style={styles.loginInputLabel}>Email</Text>
        <TextInput placeholder="Enter your email" placeholderTextColor="#999" keyboardType="email-address" style={styles.loginInput}/>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.loginLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
