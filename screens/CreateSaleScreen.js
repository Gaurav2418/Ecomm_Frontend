import axios from "axios";
import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistentContext } from "../context/accessContext";

const CreateSaleScreen = () => {
    const [product, setProduct] = useState('')
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [validity, setValidity] = useState();
    const { config, setConfig } = useContext(persistentContext);

    const handleSubmit = async () => {
        // console.log('Sale Submitted:', { category, brand, description });
        
        try {
            // let data = await AsyncStorage.getItem("@authToken");
            let data = config
            console.log(data)
            const configData = {
              headers: {
                'authorization': `Bearer ${data.token}`,
                'Content-Type': 'application/json', 
              }
            };

        // getting Owner profile document id from Async storage
        const shopProfile = await AsyncStorage.getItem('@OwnerProfileid')
        const parsedData = JSON.parse(shopProfile)
        console.log("Shop Profile ID:", parsedData._id)

            const response = await axios.post('https://ecomm-153c.onrender.com/api/create-sale', 
                { brands:brand.trim().toLocaleLowerCase(), category:category.trim().toLocaleLowerCase(), validityDays:validity.trim(), product:product.trim().toLocaleLowerCase(), shopProfile: parsedData._id }, 
                configData)

        console.log(response.data)
        Alert.alert(response.data.message)
        setBrand('')
        setProduct('')
        setCategory('')
        setDescription('')
        setValidity('')
        } catch (error) {
            console.log(error.message)
        }
        
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.heading}>Create a New Sale</Text>


            <View style={styles.inputCard}>
                <Text style={styles.label}>Product</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your Product name here..."
                    placeholderTextColor="#7c7c7c"
                    value={product}
                    onChangeText={setProduct}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Category</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your category here..."
                    placeholderTextColor="#7c7c7c"
                    value={category}
                    onChangeText={setCategory}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Brand</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your brand here..."
                    placeholderTextColor="#7c7c7c"
                    value={brand}
                    onChangeText={setBrand}
                />
            </View>
            <View style={styles.inputCard}>
                <Text style={styles.label}>Validity Days</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your sale validity in days here..."
                    placeholderTextColor="#7c7c7c"
                    value={validity}
                    onChangeText={setValidity}
                />
            </View>

            <View style={styles.inputCard}>
                <Text style={styles.label}>Sale Description</Text>
                <TextInput
                    style={[styles.input, { height: 80 }]} // Increased height for description
                    placeholder="Describe the sale in detail..."
                    placeholderTextColor="#7c7c7c"
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Submit Sale</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default CreateSaleScreen;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f9f9f9',
        padding: 20,
        paddingTop: 40,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    inputCard: {
        backgroundColor: '#ffffff',
        padding: 15,
        borderRadius: 12,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        height: 50,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 12,
        borderRadius: 10,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
