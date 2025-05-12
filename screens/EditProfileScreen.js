import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { persistentContext } from '../context/accessContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = () => {
    const {config} = useContext(persistentContext);
  const [name, setName] = useState(config.userName); // Editable
  const [email, setEmail] = useState(config.email); // Read-only
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [landmarks, setLandmarks] = useState('');
  const [locationLink, setLocationLink] = useState('');
  

useEffect(() => {

    const fetchProfileData = async () => {
      try {
        if(config.token){
            const response = await axios.post('https://ecomm-153c.onrender.com/api/profile',{email}, {
                headers: {
                  Authorization: `Bearer ${config.token}`,
                },
              });
              console.log("Profile data fetched successfully:", response.data);
              const { name } = response.data.ownerGenericData;
              const {address, landmarks, shopLocation, _id } = response.data.ownerProfData;
              setName(name);
              setMobile(mobile);
              setAddress(address);
              setLandmarks(landmarks);
              setLocationLink(shopLocation);
              
              await AsyncStorage.setItem('@OwnerProfileid', JSON.stringify(response.data.ownerProfData));
              
        }else{
            console.log("No token found")
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleSave = async () => {
    if (!name || !mobile || !address || !landmarks || !locationLink) {
      Alert.alert('Please fill all fields');
      return;
    }

    // TODO: Call API to save profile
    try {
        const response = await axios.post('https://ecomm-153c.onrender.com/api/create-profile', {
            name,
            email,
            mobile,
            address,
            landmarks,
            LocationLink: locationLink,
        }, {
            headers: {
                Authorization: `Bearer ${config.token}`,
            },
        });
        console.log('Profile saved:', response.data);
        AsyncStorage.setItem('@OwnerProfileid', JSON.stringify(response.data));
        Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
        console.error('Error saving profile:', error);
        Alert.alert('Error', 'Failed to save profile. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        <Text style={styles.title}>Edit Profile</Text>

        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={[styles.input, styles.disabledInput]}
          placeholder="Email"
          value={email}
          editable={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          keyboardType="phone-pad"
          value={mobile}
          onChangeText={setMobile}
        />

        <TextInput
          style={styles.input}
          placeholder="Google Maps Location Link"
          value={locationLink}
          onChangeText={setLocationLink}
        />

        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        <TextInput
          style={styles.input}
          placeholder="Landmarks"
          value={landmarks}
          onChangeText={setLandmarks}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F7FB',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D9CDB',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#EAEAEA',
  },
  disabledInput: {
    backgroundColor: '#D6DBDF',
    color: '#6c757d',
  },
  button: {
    backgroundColor: '#2D9CDB',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
