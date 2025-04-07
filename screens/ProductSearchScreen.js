// https://snack.expo.dev/bIpkhuJsG5F9o71T5Rtmi
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';

// Sample Product Data
const products = [
  { id: '1', name: 'iPhone 13', brand: 'Apple', category: 'Phones' },
  { id: '2', name: 'Galaxy S21', brand: 'Samsung', category: 'Phones' },
  { id: '3', name: 'MacBook Pro', brand: 'Apple', category: 'Laptops' },
  { id: '4', name: 'Yoga 9i', brand: 'Lenovo', category: 'Laptops' },
  { id: '5', name: 'Galaxy Tab S7', brand: 'Samsung', category: 'Tablets' },
  { id: '6', name: 'iPad Pro', brand: 'Apple', category: 'Tablets' },
];

// Available filter options
const brandOptions = ['All', 'Apple', 'Samsung', 'Lenovo'];
const categoryOptions = ['All', 'Phones', 'Laptops', 'Tablets'];

export default function ProductSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Apply filters whenever search or filters change
  useEffect(() => {
    filterProducts();
    // fetchProducts()
    // Calculate active filters count
    let count = 0;
    if (selectedBrand !== 'All') count++;
    if (selectedCategory !== 'All') count++;
    setActiveFiltersCount(count);
  }, [searchQuery, selectedBrand, selectedCategory]);




const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZTNiZjZjYmYzNTA0ZWYxYTNhY2JlNyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzQzMTUwNjI4fQ.AT8JqEB36KQKV26ZN7TFfZFN9oZAc6Oxf-mfHxOIEGM"





  const filterProducts = async () => {
    // let results = [...products];

    
    const response = await axios.post('https://ecomm-153c.onrender.com/api/search', {
      brands: selectedBrand !== 'All' ? selectedBrand : null,
      category: selectedCategory !== 'All' ? selectedCategory : null,
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    


    const opArray = response.data
    let results =[...opArray]



    // Enhanced unified search - check all fields
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      
      results = results.filter(item => 
        // Check product name
        item.name.toLowerCase().includes(query) ||
        // Check brand name
        item.brand.toLowerCase().includes(query) ||
        // Check category name
        item.category.toLowerCase().includes(query)
      );
      
      // If we have an exact match for a brand in the search query, automatically set that filter
      const matchedBrand = brandOptions.find(brand => 
        brand !== 'All' && brand.toLowerCase() === query
      );
      if (matchedBrand && selectedBrand === 'All') {
        setSelectedBrand(matchedBrand);
      }
      
      // If we have an exact match for a category in the search query, automatically set that filter
      const matchedCategory = categoryOptions.find(category => 
        category !== 'All' && category.toLowerCase() === query
      );
      if (matchedCategory && selectedCategory === 'All') {
        setSelectedCategory(matchedCategory);
      }
    }
    
    // Apply brand filter
    if (selectedBrand !== 'All') {
      results = results.filter(item => item.brand === selectedBrand);
    }
    
    // Apply category filter
    if (selectedCategory !== 'All') {
      results = results.filter(item => item.category === selectedCategory);
    }
    console.log(results)
    setFilteredProducts(results);
  };




  // Reset all filters
  const resetFilters = () => {
    setSelectedBrand('All');
    setSelectedCategory('All');
  };

  // Filter Modal Content
  const renderFilterModal = () => (
    <Modal
      transparent={true}
      visible={filterModalVisible}
      animationType="slide"
      onRequestClose={() => setFilterModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.filterModalContent}>
          <View style={styles.filterModalHeader}>
            <Text style={styles.filterModalTitle}>Filter Products</Text>
            <TouchableOpacity onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Brand Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Brand</Text>
            <View style={styles.optionsContainer}>
              {brandOptions.map((brand) => (
                <TouchableOpacity
                  key={brand}
                  style={[
                    styles.optionButton,
                    selectedBrand === brand && styles.selectedOptionButton
                  ]}
                  onPress={() => setSelectedBrand(brand)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedBrand === brand && styles.selectedOptionText
                  ]}>
                    {brand}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Category Filter Section */}
          <View style={styles.filterSection}>
            <Text style={styles.filterSectionTitle}>Category</Text>
            <View style={styles.optionsContainer}>
              {categoryOptions.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.optionButton,
                    selectedCategory === category && styles.selectedOptionButton
                  ]}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedCategory === category && styles.selectedOptionText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Filter Actions */}
          <View style={styles.filterActions}>
            <TouchableOpacity 
              style={styles.resetButton} 
              onPress={resetFilters}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.applyButton} 
              onPress={() => setFilterModalVisible(false)}
            >
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item._id}</Text>
      <Text style={styles.productDetails}>
        Brand: {item.brand} | Category: {item.category}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Product Search</Text>

      {/* Search and Filter Row */}
      <View style={styles.searchFilterRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, brand, or category..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity 
          style={styles.filterButton} 
          onPress={() => setFilterModalVisible(true)}
        >
          {activeFiltersCount > 0 ? (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
            </View>
          ) : null}
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Active Filters Display */}
      {(selectedBrand !== 'All' || selectedCategory !== 'All') && (
        <View style={styles.activeFiltersContainer}>
          <Text style={styles.activeFiltersTitle}>Active Filters:</Text>
          <View style={styles.activeFilterChips}>
            {selectedBrand !== 'All' && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>Brand: {selectedBrand}</Text>
                <TouchableOpacity onPress={() => setSelectedBrand('All')}>
                  <Text style={styles.filterChipRemove}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
            {selectedCategory !== 'All' && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>Category: {selectedCategory}</Text>
                <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                  <Text style={styles.filterChipRemove}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      {/* Status display */}
      <Text style={styles.resultsText}>
        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
      </Text>

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try a different search term or reset filters</Text>
            {(searchQuery || selectedBrand !== 'All' || selectedCategory !== 'All') && (
              <TouchableOpacity 
                style={styles.clearButton} 
                onPress={() => {
                  setSearchQuery('');
                  resetFilters();
                }}
              >
                <Text style={styles.clearButtonText}>Clear All</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      {/* Filter Modal */}
      {renderFilterModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#212529',
  },
  searchFilterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 50,
    borderColor: '#ced4da',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    marginRight: 8,
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 8,
    position: 'relative',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  filterBadge: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#dc3545',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  filterBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activeFiltersContainer: {
    marginBottom: 16,
  },
  activeFiltersTitle: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  activeFilterChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e9f5ff',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  filterChipText: {
    fontSize: 14,
    color: '#007bff',
    marginRight: 4,
  },
  filterChipRemove: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
  },
  resultsText: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  filterModalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    maxHeight: '80%',
  },
  filterModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
  },
  closeButton: {
    fontSize: 20,
    color: '#6c757d',
    fontWeight: 'bold',
  },
  filterSection: {
    marginBottom: 20,
  },
  filterSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 12,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ced4da',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedOptionButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  optionText: {
    fontSize: 14,
    color: '#212529',
  },
  selectedOptionText: {
    color: '#fff',
  },
  filterActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  resetButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: '#f8f9fa',
    marginRight: 12,
  },
  resetButtonText: {
    color: '#212529',
    fontSize: 16,
  },
  applyButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 4,
    backgroundColor: '#007bff',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#007bff',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#212529',
  },
  productDetails: {
    fontSize: 14,
    color: '#6c757d',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#6c757d',
    marginBottom: 8,
  },
  emptySubtext: {
    textAlign: 'center',
    fontSize: 14,
    color: '#adb5bd',
    marginBottom: 16,
  },
  clearButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  clearButtonText: {
    color: '#495057',
    fontSize: 14,
  },
});