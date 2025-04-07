import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ProfileScreen() {
  const [ userData, setUserData ] = useState({})
  const navigation = useNavigation();

useEffect(() => {
    const fetchToken = async () => {
        try {
            const data = await AsyncStorage.getItem('@authToken');
            if (data) {
                const parsedData = JSON.parse(data);
                console.log(parsedData);
                setUserData(parsedData)
            } else {
                console.log('No auth token found.');
            }
        } catch (error) {
            console.error('Error retrieving token:', error);
        }
    };

    fetchToken();
}, []);

const handleLogout = async ()=> {
  try {
      await AsyncStorage.removeItem('@authToken')
      Alert.alert("You've been Loged out")
      navigation.navigate('LoginScreen')
      
       // Reset the navigation stack to prevent going back
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });

  } catch (error) {
    console.log(error)
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.name}>{userData.userName}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        <Text style={styles.status}>Active Member</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Icon name="edit" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color="black" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e9ecef',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 5,
  },
  logoutButton: {
    backgroundColor: '#DC3545',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});
