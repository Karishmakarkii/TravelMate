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
  const [nameErrorMessage, setNameErrorMessage] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [cpasswordErrorMessage, setCPasswordErrorMessage] = useState('');

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
    if (name === '') {
      setNameErrorMessage("Please enter name!");
    } else if (email === '') {
      setEmailErrorMessage("Please enter email address!");
    } else if (pword === '') {
      setPasswordErrorMessage("Please enter password!");
    } else if (cpword === '') {
      setCPasswordErrorMessage("Please confirm password!");
    } else if (pword === cpword) {
      createUserWithEmailAndPassword(auth, email, pword)
      .then((userCredential) => {
        // created
        writeToDB(email, name);
        setName('');
        setEmail('');
        setPword('');
        setCPword('');
        alert("User successfully created!");
        router.push('/home')
      })
      .catch((error) => {
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
    <ImageBackground source={require('../assets/images/starterImage.jpeg')} style={styles.background}>
      
      <View style={styles.signupContainer}>
        <Text style={styles.loginTitle}>Sign Up</Text>
        
        <Text style={styles.signUpInputLabel}>Name</Text>
        <TextInput placeholder="Enter name" placeholderTextColor="#999"  style={styles.signupInput} onChangeText = {(input) => {setName(input); setNameErrorMessage('');}} value={name} />
        <Text style={styles.errorText}>{nameErrorMessage}</Text>
        <Text style={styles.signUpInputLabel}>Email Address</Text>
        <TextInput placeholder="Enter email" placeholderTextColor="#999"  style={styles.signupInput} keyboardType="email-address" onChangeText = {(input) => {setEmail(input); setEmailErrorMessage('');}} value={email} />
        <Text style={styles.errorText}>{emailErrorMessage}</Text>
        <Text style={styles.signUpInputLabel}>Password</Text>
        <TextInput placeholder="Enter password" placeholderTextColor="#999" style={styles.signupInput} secureTextEntry onChangeText = {(input) => {setPword(input); setPasswordErrorMessage('');}} value={pword} />
        <Text style={styles.errorText}>{passwordErrorMessage}</Text>
        <Text style={styles.signUpInputLabel}>Confirm Password</Text>
        <TextInput placeholder="Re enter password" placeholderTextColor="#999" style={styles.signupInput} secureTextEntry onChangeText = {(input) => {setCPword(input); setCPasswordErrorMessage('');}} value={cpword} />
        <Text style={styles.errorText}>{cpasswordErrorMessage}</Text>
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
