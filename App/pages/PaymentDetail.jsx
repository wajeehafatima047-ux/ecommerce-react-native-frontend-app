// import { View, Text } from 'react-native'
// import React from 'react'

// const PaymentDetail = () => {
//   return (
//     <View>
//       <Text>PaymentDetail</Text>
//     </View>
//   )
// }

// export default PaymentDetail

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentDetail = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.heading}>Checkout</Text>

      {/* Order Summary */}
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.title}>Orders</Text>
          <Text style={styles.price}>Rs. 7000</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.title}>Shipping</Text>
          <Text style={styles.price}>Rs. 30</Text>
        </View>

        <View style={styles.line} />

        <View style={styles.row}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalPrice}>Rs. 7030</Text>
        </View>
      </View>

      {/* Payment */}
      <Text style={styles.paymentHeading}>Payment Method</Text>

      <TouchableOpacity style={styles.paymentCard}>
        <Text style={styles.paymentText}>💳 VISA</Text>
        <Text style={styles.cardNumber}>**** 9388</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.paymentCard}>
        <Text style={styles.paymentText}>🅿️ PayPal</Text>
        <Text style={styles.cardNumber}>**** 9388</Text>
      </TouchableOpacity>

      {/* Continue Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Continue')}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
    padding: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    marginBottom: 25,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },

  title: {
    fontSize: 16,
    color: '#666',
  },

  price: {
    fontSize: 16,
    color: '#222',
    fontWeight: '500',
  },

  line: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },

  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E53935',
  },

  paymentHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#222',
  },

  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 3,
  },

  paymentText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },

  cardNumber: {
    fontSize: 15,
    color: '#888',
  },

  button: {
    backgroundColor: '#FF3B30',
    height: 55,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});