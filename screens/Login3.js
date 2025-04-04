import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login3 = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation()
  

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("@authToken");

        if (token) {
          navigation.replace("BottomTab");
        }
      } catch (err) {
        console.log("error message", err);
      }
    };
    checkLoginStatus();
  }, []);

  const validateForm = () => {
    let valid = true;

    // Clear previous errors
    setEmailError('');
    setPasswordError('');

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

    return valid;
  };

  const handleLogin = async() => {
    try {
        if (validateForm()) {
            const data = await axios.post('https://ecomm-153c.onrender.com/api/login',
                {email, password} )
                const userData = data.data
                const persistent = {
                  token: userData.token,
                  email: userData.user.email,
                  userName: userData.user.name,
                  role: userData.user.role
                }
                // const token = userData.token;
                AsyncStorage.setItem("@authToken", JSON.stringify(persistent));
                console.log(userData)
                console.log("persistent==", persistent)
            Alert.alert('Login Successful', `Welcome back, ${email}!`);
            // Handle login logic here (e.g., make API call)
            navigation.replace("BottomTab")
          }
    } catch (error) {
        console.log(error)
            if (error.response.status === 401){
              Alert.alert(error.response.data.message)
          }else if (error.response.status === 400){
              Alert.alert("Please enter correct username or password")
          }else if (error.response.status === 404){
            Alert.alert("User not found")
        }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

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

        {/* Login button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* Optional: Forgot password link */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>

        {/* Optional: Signup link */}
        <TouchableOpacity>
          <Text style={styles.signupText} onPress={()=> {navigation.navigate("RegisterScreen")}}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login3;

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
  forgotPassword: {
    textAlign: 'center',
    color: '#56CCF2', // Sky Blue color for links
    marginTop: 15,
    fontSize: 14,
    fontWeight: '500',
  },
  signupText: {
    textAlign: 'center',
    color: '#27AE60', // Green color for the signup link
    marginTop: 15,
    fontSize: 14,
  },
});
