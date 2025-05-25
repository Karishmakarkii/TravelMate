import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { useState } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";

import '../firebase.js';

const { firebaseConfig } = require('../firebase.js');

export default function SignUpScreen() {
  const router = useRouter();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [pword, setPword] = useState('');
  const [cpword, setCPword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [cpasswordErrorMessage, setCPasswordErrorMessage] = useState('');

  // Initialize db
  const db = getFirestore(app);

  async function writeToDB(email: string, name: string) {
    try {
      const docRef = await setDoc(doc(db, "users", email), {
        firstname: name,
        account_type: "free"
      });
    } catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  function create() {
    // Validate all required form fields
    if (name === '') {
      setNameErrorMessage("Please enter name!");
    } else if (email === '') {
      setEmailErrorMessage("Please enter email address!");
    } else if (pword === '') {
      setPasswordErrorMessage("Please enter password!");
    } else if (cpword === '') {
      setCPasswordErrorMessage("Please confirm password!");
    } else if (pword === cpword) {
      // Create new user account in Firebase Authentication
      createUserWithEmailAndPassword(auth, email, pword)
        .then((userCredential) => {
          // Store additional user data in database and reset form
          const user = userCredential.user;
          writeToDB(user.email || '', name);
          setName('');
          setEmail('');
          setPword('');
          setCPword('');
          alert("User successfully created!");
          router.push('/login')
        })
        .catch((error) => {
          // Handle specific Firebase authentication errors
          if (error.code === "auth/email-already-in-use") {
            alert("User already exists!");
          } else if (error.code === "auth/weak-password") {
            alert("Password should be at least 6 characters!");
          } else {
            console.log("error: " + error.code + " AND " + error.message);
            alert("User not created!");
          }
        });
    } else {
      setCPasswordErrorMessage("Passwords do not match!");
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ImageBackground source={require('../assets/images/starterImage.jpeg')} style={styles.background}>
          <View style={styles.signupContainer}>
            <Text style={styles.loginTitle}>Sign Up</Text>

            <Text style={styles.signUpInputLabel}>Name</Text>
            <TextInput placeholder="Enter name" placeholderTextColor="#999" style={styles.signupInput} onChangeText={(val) => { setName(val); setNameErrorMessage(''); }} value={name} />
            {nameErrorMessage !== '' && (
              <Text style={styles.errorText}>{nameErrorMessage}</Text>
            )}

            <Text style={styles.signUpInputLabel}>Email Address</Text>
            <TextInput placeholder="Enter email" placeholderTextColor="#999" style={styles.signupInput} keyboardType="email-address" onChangeText={(val) => { setEmail(val); setEmailErrorMessage(''); }} value={email} />
            {nameErrorMessage !== '' && (
              <Text style={styles.errorText}>{emailErrorMessage}</Text>
            )}

            <Text style={styles.signUpInputLabel}>Password</Text>
            <TextInput placeholder="Enter password" placeholderTextColor="#999" style={styles.signupInput} secureTextEntry onChangeText={(val) => { setPword(val); setPasswordErrorMessage(''); }} value={pword} />
            {nameErrorMessage !== '' && (
              <Text style={styles.errorText}>{passwordErrorMessage}</Text>
            )}

            <Text style={styles.signUpInputLabel}>Confirm Password</Text>
            <TextInput placeholder="Re enter password" placeholderTextColor="#999" style={styles.signupInput} secureTextEntry onChangeText={(val) => { setCPword(val); setCPasswordErrorMessage(''); }} value={cpword} />
            {nameErrorMessage !== '' && (
              <Text style={styles.errorText}>{cpasswordErrorMessage}</Text>
            )}

            <TouchableOpacity style={styles.signupButton} onPress={create}>
              <Text style={styles.signupButtonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.signupLink}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
