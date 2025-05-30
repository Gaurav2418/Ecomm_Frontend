// screens/PlansScreen.js
import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import PlanCard from '../components/PlanCard';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PlansScreen = () => {
  const plans = [
    {
      planID: '0001',
      amount: '100',
      name: 'Basic',
      validityDays: 1,
      description: 'You can post 5 sales',
    },
    {
      planID: '0002',
      amount: '250',
      name: 'Standard',
      validityDays: 2,
      description: 'You can post 20 sales + analytics',
    },
    {
      planID: '0003',
      amount: '500',
      name: 'Premium',
      validityDays: 3,
      description: 'Unlimited sales + priority support',
    },
  ];

  const handlePayNow = async(plan) => {
    Alert.alert('Proceed to Payment', `You selected the ${plan.name} plan for ₹${plan.amount}`);
    // 👉 You can trigger your Razorpay flow here
 const ownerProfileID = AsyncStorage.getItem('@OwnerProfileid');
 if (!ownerProfileID) {
  Alert.alert('Error', 'Owner profile ID not found. Please complete your profile with all data.');
  return;
 }
  const parsedData = JSON.parse(ownerProfileID);
    try {
      const res = await axios.post('https://ecomm-153c.onrender.com/api/create-order', { amount: plan.amount });
      const order = res.data;
      // console.log(order)

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
          axios.post('https://ecomm-153c.onrender.com/api/verify-payment', paymentData)

            .then(
              async () => {
                Alert.alert('Success', 'Payment Verified')
            // update the user's plan in your database
            // Step 2: Activate Subscription
            const planData = {
              name: plan.name,
              price: plan.amount,
              validityDays: plan.validityDays,
              shopOwnerDocumentID: parsedData._id,
            };
            try {
              const activationRes = await axios.post('https://ecomm-153c.onrender.com/api/add-subscription', { planData });
              if (activationRes.data) {
                Alert.alert('Subscription Activated', 'Your plan has been activated.');
                console.log('Plan activated successfully:', activationRes.data);
              } else {
                Alert.alert('Activation Failed', 'Could not activate the plan.');
              }
            } catch (activationErr) {
              console.error(activationErr);
              Alert.alert('Error', 'Plan activation failed.');
            }
        }) 
            .catch(() => Alert.alert('Error', 'Payment Verification Failed'));
        })
        .catch((error) => Alert.alert('Payment Failed', error.description));

    } catch (err) {
      Alert.alert('Error', 'Could not initiate payment');
    }


  };

  return (
    <ScrollView>
    <View  style={{marginTop:50}}>
      {plans.map((plan) => (
        <PlanCard key={plan.planID} plan={plan} onPayNow={handlePayNow} />
      ))}
      </View>
    </ScrollView>
  );
};

export default PlansScreen;
