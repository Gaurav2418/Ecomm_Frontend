import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const NewPasswordScreen = () => {
const [otp, setOtp] = useState('');
const [newPass, setNewpass] = useState('');
const [email, setEmail] = useState('');

const navigation = useNavigation();

const handleReset = async () => {
    try {
        console.log("hii");
    const data = await axios.post("https://ecomm-153c.onrender.com/api/password",{OTP:otp, newPassword1:newPass, email:email})
    console.log(data.data);
    Alert.alert("Success", "Password reset successfully")
    navigation.navigate("LoginScreen")
    } catch (error) {
        Alert.alert("Error", "Invalid OTP or Password")
        console.log(error);
    }
}
    return(
    <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.title}>Reset Your Password From here</Text>
            

                    <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    />

                    {/* OTP input */}
                    <TextInput
                    style={styles.input}
                    placeholder="OTP"
                    keyboardType="numeric"
                    value={otp}
                    onChangeText={setOtp}
                    />

                    {/* New password input */}
                    <TextInput
                    style={styles.input}
                    placeholder="New Password"
                    secureTextEntry
                    keyboardType="numeric"
                    value={newPass}
                    onChangeText={setNewpass}
                    />
    
                    <TouchableOpacity style={styles.button} onPress={handleReset}>
                              <Text style={styles.buttonText} >Reset Password</Text>
                    </TouchableOpacity>
                    </View>
    
                    
            </SafeAreaView>
)
}

export default NewPasswordScreen;

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
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#2D9CDB', // Bright Blue color for the title
      marginBottom: 20,
      textAlign: 'center',
      fontFamily: 'Roboto', // Optional: if you want to use a custom font
    },
  })