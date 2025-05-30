import React, { useEffect, useState, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
const { persistentContext } = require('../context/accessContext'); // Adjust the import path as necessary

const productData = [
  {
    id: '1',
    product: 'Nike Air Max 90',
    brands: 'Nike',
    category: 'Footwear',
    shopProfile: { shopLocation: 'https://www.nike.com' },
  },
  {
    id: '2',
    product: 'Adidas Ultraboost',
    brands: 'Adidas',
    category: 'Footwear',
    shopProfile: { shopLocation: 'https://www.adidas.com' },
  },
  {
    id: '3',
    product: 'Samsung Galaxy S22',
    brands: 'Samsung',
    category: 'Mobile',
    shopProfile: { shopLocation: 'https://www.samsung.com' },
  },
];



const LandingPage = ({ route, navigation }) => {
    const { keywords } = route.params
    console.log(keywords)  // Get keywords from route params
    const [resultsArray, setResultsArray] = useState([]); // State to hold search results

    const {config} = useContext(persistentContext);
const token = config.token

    useEffect(  () => {
        const fetchProducts = async () => {
          try {
                const response = await axios.post('https://ecomm-153c.onrender.com/api/search-sales-by-banner-clicks', { keywords }, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    },
                });
                setResultsArray(response.data);  // Set the results to state
                console.log('Fetched results:', response.data);  // Log the fetched results directly
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();  // Call the function to fetch products
          
    },[])


  // Handle shop location link opening
  const handleShopLocation = (url) => {
   
    Linking.openURL(url);

  };

  // Handle more details (you can add a navigation or modal here)
  const handleMoreDetails = (item) => {
    alert(`More details about: ${item.product}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>🛒 Product Listings</Text>

      <FlatList
        data={resultsArray}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.productName}>{item.product}</Text>
            <Text style={styles.productDetails}>
              Brand: {item.brands} | Category: {item.category}
            </Text>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.goToShopButton]}
                onPress={() => {
  if (typeof item.shopProfile === 'object' && item.shopProfile?.shopLocation) {
    handleShopLocation(item.shopProfile.shopLocation);
  } else {
    alert('Shop location is unavailable.');
  }
}}
              >
                <Text style={styles.buttonText}>Go to Shop</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.moreDetailsButton]}
                onPress={() => handleMoreDetails(item)}
              >
                <Text style={styles.buttonText}>More Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

// Styles for the Landing Page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  productDetails: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  button: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  goToShopButton: {
    backgroundColor: '#6FE6FC',
  },
  moreDetailsButton: {
    backgroundColor: '#FFF085',
  },
  buttonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LandingPage;
