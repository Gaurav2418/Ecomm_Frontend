import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

const RegisterScreen1 = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('')
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigation = useNavigation()


  const validateForm = () => {
    let valid = true;

    // Clear previous errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');

    if (!name) {
      setNameError('Name is required');
      valid = false;
    }

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    return valid;
  };

  const handleRegister = async () => {
   try {
    if (validateForm()) {
      const Data = await axios.post('https://ecomm-153c.onrender.com/api/register', {name, email, password, role})
      console.log(Data.data)
      Alert.alert('Registration Successful', `Welcome, ${name}!`);
      // Handle registration logic here (e.g., make API call)
    }
    
   } catch (error) {
    console.log(error)
   }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>

        {/* Name input */}
        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
        />
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        <TextInput
          style={[styles.input, nameError ? styles.inputError : null]}
          placeholder="Role"
          value={role}
          onChangeText={setRole}
        />
        
        {/* Email input */}
        <TextInput
          style={[styles.input, emailError ? styles.inputError : null]}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password input */}
        <TextInput
          style={[styles.input, passwordError ? styles.inputError : null]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Confirm Password input */}
        <TextInput
          style={[styles.input, confirmPasswordError ? styles.inputError : null]}
          placeholder="Confirm Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        {/* Register button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        {/* Optional: Login link */}
        <TouchableOpacity onPress={()=> {navigation.navigate("LoginScreen")}}>
          <Text style={styles.loginText}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen1;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FB', // Soft light blue background
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D9CDB', // Bright Blue color for the title
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Roboto', // Optional: if you want to use a custom font
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#EAEAEA', // Light gray background for inputs
    transition: 'all 0.3s ease', // Smooth transition for focus effects
  },
  inputError: {
    borderColor: '#E74C3C', // Red for errors
    backgroundColor: '#FFE6E6', // Light red background for error fields
  },
  errorText: {
    color: '#E74C3C', // Red color for error messages
    fontSize: 12,
    marginBottom: 15,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#2D9CDB', // Bright Blue color for the button
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    transition: 'background-color 0.3s ease',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#56CCF2', // Sky Blue color for the link
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },
});
