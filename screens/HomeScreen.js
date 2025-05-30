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
  { id: '1', title: '50% Off on Electronics', image: 'https://images.unsplash.com/photo-1648316316198-5f15553e55df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fFBob25lJTJDJTIwbGFwdG9wJTJDJTIwaGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D', keywords: 'electronics phone laptop earphone earbud' },
  { id: '2', title: 'Fashion Sale - Up to 70% Off', image: 'https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDZ8fGNsb3RoaW5nfGVufDB8fDB8fHww', keywords: 'clothing shoes accessories fashion' },
  { id: '3', title: 'Home Appliances - Up to 10% off', image: 'https://images.unsplash.com/photo-1556185781-a47769abb7ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aG9tZSUyMGFwcGxpYW5jZXN8ZW58MHwxfDB8fHww', keywords: 'iron washing machine hairdryer oven' },
  { id: '4', title: 'Shoes flat 200 Rs off', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2hvZXN8ZW58MHwxfDB8fHww',keywords: 'shoes sneakers sandals slippers' },
];

const categories = [
  { id: '1', name: 'Electronics', image: 'https://images.unsplash.com/photo-1556310917-bfbbc8f73639?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fFBob25lJTJDJTIwbGFwdG9wJTJDJTIwaGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D',  keywords: 'electronics phone laptop earphone earbud' },
  { id: '2', name: 'Fashion', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGNsb3RoaW5nfGVufDB8fDB8fHww', keywords: 'clothing shoes accessories fashion shirt tshirt tops jeans' },
  { id: '3', name: 'Furniture', image: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZSUyMGRlY29yfGVufDB8MXwwfHx8MA%3D%3D', keywords: 'sofa chair table bed wardrobe' },
  { id: '4', name: 'Home Decor', image: 'https://plus.unsplash.com/premium_photo-1681980021035-5db5823c974b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG9tZSUyMGRlY29yfGVufDB8MXwwfHx8MA%3D%3D', keywords: 'wall art curtains rugs decor flowerpots pots flower' },
  
  { id: '5', name: 'Sports', image: 'https://plus.unsplash.com/premium_photo-1666913667023-4bfd0f6cff0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3BvcnRzJTIwJTIwZXF1aXBtZW50fGVufDB8MXwwfHx8MA%3D%3D', keywords: 'sports shoes sportswear' },
  { id: '6', name: 'Beauty', image: 'https://images.unsplash.com/photo-1585652757141-8837d676fac8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGJlYXV0eXxlbnwwfDF8MHx8fDA%3D', keywords: 'makeup skincare haircare skin beauty' },
];

const trendingDeals = [
  { id: '1', title: 'Smartphone - 30% Off', image: 'https://images.unsplash.com/photo-1640936343842-268f9d87e764?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFNtYXJ0cGhvbmVzfGVufDB8fDB8fHww', keywords: 'phone smartphone iphone' },
  { id: '2', title: 'Winter Jacket - 50% Off', image: 'https://plus.unsplash.com/premium_photo-1661598536943-f39f805b99b3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHdpbnRlciUyMGphY2tldHN8ZW58MHwwfDB8fHww', keywords: 'jacket winter coat' },
  { id: '3', title: 'Organic Food - 20% Off', image: 'https://images.unsplash.com/photo-1604337214275-86010944959d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fG9yZ2FuaWMlMjBmb29kfGVufDB8MHwwfHx8MA%3D%3D' },
];

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroText}>🎉 Discover the Best Sales Around You! 🎉</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation.navigate('ProductSearchScreen')}>
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
              <TouchableOpacity onPress={() => navigation.navigate('LandingPage', { keywords : item.keywords })}>
                <View style={styles.saleCard}>
                  <Image source={{ uri: item.image }} style={styles.saleImage} />
                  <Text style={styles.saleTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
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
              <TouchableOpacity onPress={() => navigation.navigate('LandingPage', { keywords : item.keywords })}>
                  <View style={styles.categoryCard}>
                    <Image source={{ uri: item.image }} style={styles.categoryImage} />
                    <Text style={styles.categoryName}>{item.name}</Text>
                  </View>
              </TouchableOpacity>
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
              <TouchableOpacity onPress={() => navigation.navigate('LandingPage', { keywords : item.keywords })}> 
                  <View style={styles.trendingCard}>
                    <Image source={{ uri: item.image }} style={styles.trendingImage} />
                    <Text style={styles.trendingTitle}>{item.title}</Text>
                  </View>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* See All Button */}
        <TouchableOpacity style={styles.seeAllButton} onPress={() => navigation.navigate('ProductSearchScreen')}>
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
