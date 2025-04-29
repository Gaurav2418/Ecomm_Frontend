// screens/PlansScreen.js
import React from 'react';
import { ScrollView, View } from 'react-native';
import PlanCard from '../components/PlanCard';

const PlansScreen = () => {
  const plans = [
    {
      planID: '0001',
      amount: '100',
      name: 'Basic',
      description: 'You can post 5 sales',
    },
    {
      planID: '0002',
      amount: '250',
      name: 'Standard',
      description: 'You can post 20 sales + analytics',
    },
    {
      planID: '0003',
      amount: '500',
      name: 'Premium',
      description: 'Unlimited sales + priority support',
    },
  ];

  const handlePayNow = (plan) => {
    Alert.alert('Proceed to Payment', `You selected the ${plan.name} plan for ₹${plan.amount}`);
    // 👉 You can trigger your Razorpay flow here
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
