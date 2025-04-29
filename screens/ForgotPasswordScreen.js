import React from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const ForgotPasswordScreen = () => {
const [email, setEmail] = React.useState("");
const navigation = useNavigation();


const handleReset = async () => {
    const data = await axios.post("https://ecomm-153c.onrender.com/api/pass-reset", {email})
    Alert.alert("Password reset mail sent to your registered email address")
    navigation.navigate("NewPasswordScreen")
}

    return(

        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Text style={styles.title}>Enter Your Email</Text>
        
                {/* Email input */}
                <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
                />

                <TouchableOpacity style={styles.button} onPress={handleReset}>
                          <Text style={styles.buttonText} >Send OTP</Text>
                </TouchableOpacity>
                </View>

                
        </SafeAreaView>
    );
}


export default ForgotPasswordScreen;


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