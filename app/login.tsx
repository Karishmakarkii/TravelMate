import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { useState } from 'react';
// Firebase functions needed from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import '../firebase.js';

const {firebaseConfig} = require('../firebase.js');

export default function LoginScreen() {
  const router = useRouter();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [pword, setPword] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  function login() {
    if (email === '') {
      setEmailErrorMessage("Please enter email address!");
    } else if (pword === '') {
      setPasswordErrorMessage("Please enter password!");
    } else if (!validateEmail(email)) {
      setEmailErrorMessage("Please enter a valid email address!");
    } else {
      signInWithEmailAndPassword(auth, email, pword)
      .then((userCredential) => {
        // signed in
        setEmail('');
        setPword('');
        setEmailErrorMessage('');
        router.push('/home');        
      })
      .catch((error) => {
        alert("Incorrect username or password!");
      });
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
        <Text style={styles.loginTitle}>Login</Text>
        
        <Text style={styles.loginInputLabel}>Email</Text>
        <TextInput placeholder="Email" style={styles.loginInput} keyboardType="email-address" onChangeText = {(input) => {setEmail(input); setEmailErrorMessage('');}} value={email} />
        <Text style={styles.errorText}>{emailErrorMessage}</Text>
        <Text style={styles.loginInputLabel}>Password</Text>
        <TextInput placeholder="Password" style={styles.loginInput} secureTextEntry onChangeText = {(input) => {setPword(input); setPasswordErrorMessage('');}} value={pword} />
        <Text style={styles.errorText}>{passwordErrorMessage}</Text>
        <TouchableOpacity onPress={() => router.push('/forgotPassword')}>
          <Text style={styles.loginSubLink}>Forgot password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => login()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.loginLink}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}