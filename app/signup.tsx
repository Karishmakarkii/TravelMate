import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import styles from '../styles/authStyles';
import { useState } from 'react';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

import '../firebase.js';

const {firebaseConfig} = require('../firebase.js');

export default function SignUpScreen() {
  const router = useRouter();
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const [pword, setPword] = useState('');
  const [cpword, setCPword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  // Initialize db
  const db = getFirestore(app);

  async function writeToDB(email: String, name: String) {
    try{
      const docRef =  await addDoc(collection(db, "users"), {
        email: email,
        name: name
      });
    } catch(e) {
      console.error("Error adding document: ", e)
    }
  }

  function create() {
    if (pword === cpword) {
      createUserWithEmailAndPassword(auth, email, pword)
      .then((userCredential) => {
        // created
        writeToDB(email, name);
        alert("User successfully created!");
        router.push('/login')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("User not created!");
      });
    } else {
      alert("Passwords do not match!");
    }
  }

  return (
    <ImageBackground
      source={require('../assets/images/starterImage.jpeg')}
      style={styles.background}
    >
      <View style={styles.signupContainer}>
        <Text style={styles.loginTitle}>Sign Up</Text>
        
        <Text style={styles.signUpInputLabel}>Name</Text>
        <TextInput placeholder="Name" style={styles.signupInput} onChangeText = {setName} value={name} />
        <Text style={styles.signUpInputLabel}>Email Address</Text>
        <TextInput placeholder="Email" style={styles.signupInput} keyboardType="email-address" onChangeText = {setEmail} value={email} />
        <Text style={styles.signUpInputLabel}>Password</Text>
        <TextInput placeholder="Password" style={styles.signupInput} secureTextEntry onChangeText = {setPword} value={pword} />
        <Text style={styles.signUpInputLabel}>Confirm Password</Text>
        <TextInput placeholder="Confirm Password" style={styles.signupInput} secureTextEntry onChangeText = {setCPword} value={cpword} />

        <TouchableOpacity style={styles.signupButton} onPress={() => create()}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.signupLink}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
