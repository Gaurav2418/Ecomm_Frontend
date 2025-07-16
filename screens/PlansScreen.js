// screens/PlansScreen.js
import React from 'react';
import { ScrollView, View, Alert } from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PlanCard from '../components/PlanCard';
import image1 from '../assets/image9.png';

const PlansScreen = () => {
  const plans = [
    {
      planID: '0001',
      amount: 5,
      name: 'Basic',
      validityDays: 1,
      description: 'You can post 5 sales',
    },
    {
      planID: '0002',
      amount: 10,
      name: 'Standard',
      validityDays: 2,
      description: 'You can post 20 sales + analytics',
    },
    {
      planID: '0003',
      amount: 12,
      name: 'Premium',
      validityDays: 3,
      description: 'Unlimited sales + priority support',
    },
  ];

  const handlePayNow = async (plan) => {
    // const ownerProfileRaw = await AsyncStorage.getItem('@OwnerProfileid');
    // const parsedData = JSON.parse(ownerProfileRaw);
    //   const shopOwnerDocumentID = parsedData?._id;
    Alert.alert('Proceed to Payment', `You selected the ${plan.name} plan for ₹${plan.amount}`);

    try {
      const ownerProfileRaw = await AsyncStorage.getItem('@OwnerProfileid');
      const UserData = await AsyncStorage.getItem('@authToken');
      const userData_parsed = JSON.parse(UserData);
      if (!ownerProfileRaw) {
        Alert.alert('Error', 'Owner profile ID not found. Please complete your profile.');
        return;
      }

      const parsedData = JSON.parse(ownerProfileRaw);
      const shopOwnerDocumentID = parsedData?._id;
      if (!shopOwnerDocumentID) {
        Alert.alert('Error', 'Invalid owner profile data.');
        return;
      }

      // Step 1: Create Razorpay order
      const orderResponse = await axios.post('https://ecomm-153c.onrender.com/api/create-order', {
        amount: plan.amount,
      });
      const order = orderResponse.data;

      const options = {
        description: 'Plan Subscription Payment',
        image: image1,
        currency: 'INR',
        key: , // 🔒 Replace with secure env key in production
        amount: order.amount,
        name: 'Shoperly',
        order_id: order.id,
        prefill: {
          email: userData_parsed.email,
          contact: '9999999999',
          name: userData_parsed.userName,
        },
        theme: { color: '#53a20e' },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
      };

      const paymentData = await RazorpayCheckout.open(options);
      const planData = {
        name: plan.name,
        price: plan.amount,
        validityDays: plan.validityDays,
        shopOwnerDocumentID,
      };

      const payLoad = {
        paymentData,
        planData
      }

      // Step 2: Verify Razorpay signature
      const verificationStatus = await axios.post('https://ecomm-153c.onrender.com/api/verify-payment', payLoad);
     
      if( verificationStatus.data?.success ) {
           Alert.alert('Success', `Payment Verified  ${verificationStatus.data.message}`);
      }else {
           Alert.alert(`Payment Verification Failed, ${JSON.stringify(verificationStatus.data)} , Could not verify payment.`);
           return;
      }

      
      

      // const activationRes = await axios.post(
      //   'https://ecomm-153c.onrender.com/api/add-subscription',
      //   planData
      // );
      // Alert.alert('Success', `Subscription Activated ${activationRes.data}`);

      // if (activationRes.data?.success) {
      //   Alert.alert('Subscription Activated', 'Your plan has been activated.');
      //   console.log('Plan activated successfully:', activationRes.data);
      // } else {
      //   Alert.alert('Activation Failed', 'Could not activate the plan.');
      //   return;
      // }
    } catch (error) {
      console.error('Payment/Activation Error:', error);
      Alert.alert('Error', error?.description , '....Something went wrong. Please try again.');
    }
  };

  return (
    <ScrollView style={{ marginTop: 50 }}>
      <View>
        {plans.map((plan) => (
          <PlanCard key={plan.planID} plan={plan} onPayNow={handlePayNow} />
        ))}
      </View>
    </ScrollView>
  );
};

export default PlansScreen;
