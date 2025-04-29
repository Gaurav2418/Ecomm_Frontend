// import React from "react";
// import { View, Text, StyleSheet, SafeAreaView } from "react-native";
// import CardListScreen from "./CardListScreen";

// const HomeScreen = () => {
//     return(
//             // <CardListScreen />
            
//     )
// }

// export default HomeScreen;



import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const salesData = [
  { id: '1', title: '50% Off on Electronics', image: 'https://via.placeholder.com/150' },
  { id: '2', title: 'Fashion Sale - Up to 70% Off', image: 'https://via.placeholder.com/150' },
  { id: '3', title: 'Grocery Discounts', image: 'https://via.placeholder.com/150' },
];

const categories = [
  { id: '1', name: 'Electronics', image: 'https://via.placeholder.com/100' },
  { id: '2', name: 'Fashion', image: 'https://via.placeholder.com/100' },
  { id: '3', name: 'Grocery', image: 'https://via.placeholder.com/100' },
  { id: '4', name: 'Home Decor', image: 'https://via.placeholder.com/100' },
];

const trendingDeals = [
  { id: '1', title: 'Smartphone - 30% Off', image: 'https://via.placeholder.com/120' },
  { id: '2', title: 'Winter Jacket - 50% Off', image: 'https://via.placeholder.com/120' },
  { id: '3', title: 'Organic Food - 20% Off', image: 'https://via.placeholder.com/120' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroText}>🎉 Discover the Best Sales Around You! 🎉</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('Sales')}>
            <Icon name="explore" size={22} color="#fff" />
            <Text style={styles.ctaText}>Explore Sales</Text>
          </TouchableOpacity>
        </View>

        {/* Featured Sales Section */}
        <View style={styles.salesContainer}>
          <Text style={styles.sectionTitle}>🔥 Featured Sales</Text>
          <FlatList
            data={salesData}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.saleCard}>
                <Image source={{ uri: item.image }} style={styles.saleImage} />
                <Text style={styles.saleTitle}>{item.title}</Text>
              </View>
            )}
          />
        </View>

        {/* Top Categories Section */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>🛍️ Top Categories</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View style={styles.categoryCard}>
                <Image source={{ uri: item.image }} style={styles.categoryImage} />
                <Text style={styles.categoryName}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        {/* Trending Deals Section */}
        <View style={styles.trendingContainer}>
          <Text style={styles.sectionTitle}>🔥 Trending Deals</Text>
          <FlatList
            data={trendingDeals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.trendingCard}>
                <Image source={{ uri: item.image }} style={styles.trendingImage} />
                <Text style={styles.trendingTitle}>{item.title}</Text>
              </View>
            )}
          />
        </View>

        {/* See All Button */}
        <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('Sales')}>
          <Text style={styles.seeAllText}>See All Sales</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f7fa',
    paddingTop: 30,
  },
  heroSection: {
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  heroText: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#ff5722',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  salesContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00796B',
    marginBottom: 12,
  },
  saleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 12,
    marginRight: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: 160,
  },
  saleImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  saleTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
  },
  categoriesContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  categoryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 12,
    alignItems: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: 120,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#00796B',
  },
  trendingContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  trendingCard: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  trendingImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  trendingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    textAlign: 'center',
  },
  seeAllButton: {
    backgroundColor: '#ff5722',
    paddingVertical: 12,
    margin: 20,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#ff5722',
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 4,
  },
  seeAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
