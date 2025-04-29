// components/PlanCard.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PlanCard = ({ plan, onPayNow }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{plan.name}</Text>
      <Text style={styles.amount}>₹{plan.amount}</Text>
      <Text style={styles.description}>{plan.description}</Text>
      <Text style={styles.planId}>Plan ID: {plan.planID}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onPayNow(plan)} // callback to handle payment
      >
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fdfdfd',
    padding: 20,
    marginVertical: 12,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  amount: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1b5e20',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  planId: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default PlanCard;
