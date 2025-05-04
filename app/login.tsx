import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/starterImage.jpeg')}
      style={styles.background}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login</Text>


        <Text style={styles.loginInputLabel}>Email</Text>
        <TextInput placeholder="Email" style={styles.loginInput} keyboardType="email-address" />
        <Text style={styles.loginInputLabel}>Password</Text>
        <TextInput placeholder="Password" style={styles.loginInput} secureTextEntry />

        <Text style={styles.loginSubLink}>Forgot password?</Text>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.loginLink}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
