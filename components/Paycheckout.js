import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';

const Paycheckout = () => {
    // Function to handle payment
  const handlePayment = async () => {
    try {
      const res = await axios.post('http://localhost:5000/create-order', { amount: 500 });
      const order = res.data;

      const options = {
        description: 'Test Payment',
        image: 'https://yourapp.com/logo.png',
        currency: 'INR',
        key: 'YOUR_RAZORPAY_KEY_ID',
        amount: order.amount,
        name: 'Your App Name',
        order_id: order.id,
        prefill: {
          email: 'gaurav@example.com',
          contact: '9999999999',
          name: 'Gaurav Wakhare'
        },
        theme: { color: '#53a20e' },
      };

      RazorpayCheckout.open(options)
        .then((paymentData) => {
          axios.post('http://localhost:5000/verify-payment', paymentData)
            .then(() => Alert.alert('Success', 'Payment Verified'))
            .catch(() => Alert.alert('Error', 'Payment Verification Failed'));
        })
        .catch((error) => Alert.alert('Payment Failed', error.description));

    } catch (err) {
      Alert.alert('Error', 'Could not initiate payment');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Pay ₹500" onPress={handlePayment} >
      
      </Button>
    </View>
  );
};

export default Paycheckout;