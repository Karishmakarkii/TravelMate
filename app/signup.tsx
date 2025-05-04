import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import '../../firebase.js';

const {firebaseConfig} = require('../../firebase.js');

export default function SignUpScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/starterImage.jpeg')}
      style={styles.background}
    >
      <View style={styles.signupContainer}>
        <Text style={styles.loginTitle}>Sign Up</Text>

        <Text style={styles.signUpInputLabel}>Name</Text>
        <TextInput placeholder="Name" style={styles.signupInput} />
        <Text style={styles.signUpInputLabel}>Email Address</Text>
        <TextInput placeholder="Email" style={styles.signupInput} keyboardType="email-address" />
        <Text style={styles.signUpInputLabel}>Password</Text>
        <TextInput placeholder="Password" style={styles.signupInput} secureTextEntry />
        <Text style={styles.signUpInputLabel}>Confirm Password</Text>
        <TextInput placeholder="Confirm Password" style={styles.signupInput} secureTextEntry />

        <TouchableOpacity style={styles.signupButton} onPress={() => router.back()}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.signupLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
