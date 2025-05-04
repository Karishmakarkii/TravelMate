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

  const [loginout, setloginout] = useState('');
  const [pword, setPword] = useState('');
  const [email, setEmail] = useState('');

  function login() {
    signInWithEmailAndPassword(auth, email, pword)
    .then((userCredential) => {
      // signed in
      const user = userCredential.user;
      setloginout("Success!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setloginout("Login Unsuccessful!");
    }); 
  }

  return (
    <ImageBackground
      source={require('../assets/images/starterImage.jpeg')}
      style={styles.background}
    >
      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Login</Text>
        <Text>{loginout}</Text>
        <TextInput placeholder="Email" style={styles.loginInput} keyboardType="email-address" onChangeText = {setEmail} value={email} />
        <TextInput placeholder="Password" style={styles.loginInput} secureTextEntry onChangeText = {setPword} value={pword} />

        <Text style={styles.loginSubLink}>Forgot password?</Text>

        <TouchableOpacity style={styles.loginButton} onPress={()=>login()}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/signup')}>
          <Text style={styles.loginLink}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}