import { View, Text, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { useState } from 'react';
// Firebase functions needed from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

import '../firebase.js';

const {firebaseConfig} = require('../firebase.js');

export default function ForgotPasswordScreen() {
  const router = useRouter();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [email, setEmail] = useState('');

  function resetPassword() {
    if (email === '') {
      alert("Please enter email address!");
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email address!");
    } else {
      sendPasswordResetEmail(auth, email);
      alert('Password reset email sent!');
      router.push('/login');
    }
  }

  const validateEmail = (str: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(str);
  }

  return (
    <ImageBackground
      source={require('../assets/images/starterImage.jpeg')}
      style={styles.background}
    >

      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Forgot Password</Text>

        <Text style={styles.loginInputLabel}>Email</Text>
        <TextInput placeholder="Enter your email" placeholderTextColor="#999" keyboardType="email-address" style={styles.loginInput} onChangeText = {setEmail} value={email} />

        <TouchableOpacity style={styles.loginButton} onPress={() => resetPassword()}>
          <Text style={styles.loginButtonText}>Send Reset Link</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.loginLink}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
