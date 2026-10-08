// import React, { useState } from 'react';
// import {
//   View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,
//   KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
// } from 'react-native';
// import CustomInput from './components/CustomInput';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import axios from 'axios';

// // ⚠️ CHANGE 'localhost' to '10.0.2.2' if testing on an Android Emulator,
// // or use your machine's local IP address (e.g. 192.168.1.x) if testing on a real device.
// const SERVER_URL = 'http://localhost:3000';
// const USER_ID = '6aa641914d1c7253cfc8ee16';
// const ORDER_URL = `${SERVER_URL}/api/order`; // Changed from /api/orders to match your index route /api/order

// const CheckOut = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   // Passed from Cart: navigation.navigate('CheckOut', { items, total })
//   const { items = [], total = 0 } = route.params || {};

//   const [email, setEmail] = useState('wajeeha@gmail.com');
//   const [phone, setPhone] = useState('03458660781');
//   const [address, setAddress] = useState('strret no 3 house no 45');
//   const [pincode, setPincode] = useState('12345');
//   const [country, setCountry] = useState('hklkdm');
//   const [state, setState] = useState('hjkdlld');
//   const [city, setCity] = useState('jkdls');

//   const [submitting, setSubmitting] = useState(false);

//  const validate = () => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   const phoneRegex = /^[0-9]{10,15}$/;
//   const textRegex = /^[a-zA-Z\s]+$/;
//   const pincodeRegex = /^[0-9]+$/;

//   if (!email.trim()) return 'Email is required';
//   if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
//   if (!phone.trim()) return 'Phone number is required';
//   if (!phoneRegex.test(phone.trim())) return 'Enter a valid phone number (10-15 digits)';
//   if (!address.trim()) return 'Address is required';
//   if (!pincode.trim()) return 'Pincode is required';
//   if (!pincodeRegex.test(pincode.trim())) return 'Pincode must contain numbers only';
//   if (!city.trim()) return 'City is required';
//   if (!textRegex.test(city.trim())) return 'City must contain letters only';
//   if (!state.trim()) return 'State is required';
//   if (!textRegex.test(state.trim())) return 'State must contain letters only';
//   if (!country.trim()) return 'Country is required';
//   if (!textRegex.test(country.trim())) return 'Country must contain letters only';
//   if (items.length === 0) return 'Your cart is empty';
//   return null;
// };

//   const handlePlaceOrder = async () => {
//     const validationError = validate();
//     if (validationError) {
//       Alert.alert('Missing information', validationError);
//       return;
//     }

//     setSubmitting(true);

//     try {
//       const orderItems = items.map((item) => ({
//         product: item.product._id,
//         quantity: item.quantity,
//         price: item.price,
//       }));

//       const res = await axios.post(ORDER_URL, {
//         userId: USER_ID,
//         items: orderItems,
//         totalAmount: total,
//         shippingAddress: { email,phone, address, pincode, city, state, country },
//       });

//       Alert.alert('Order placed', 'Your order has been placed successfully (Cash on Delivery).');
//       navigation.navigate('DetailsScreen', { order: res.data.order });
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.message || error.message);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >

//         {/* Header Block */}
//         <View style={styles.headerBlock}>
//           <Text style={styles.sectionHeader}>Contact Details</Text>
//           <View style={styles.avatarWrapper}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={require('./assets/image.jpg')}
//                 style={styles.avatarImage}
//                 resizeMode="cover"
//               />
//             </View>
//           </View>
//         </View>

//         {/* Contact Section */}
//         <View style={styles.section}>
//           <CustomInput
//             label="Email" // Fixed typo from 'lable'
//             placeholder="Enter your email"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>

//          <View style={{ marginTop: 12 }}>
//             <CustomInput
//               label="Phone Number"
//               placeholder="Enter your phone number"
//               value={phone}
//               onChangeText={setPhone}
//               keyboardType="phone-pad"
//             />
//           </View>

//         {/* Shipping Address Section */}
//         <Text style={styles.sectionHeader}>Shipping Address</Text>
//         <View style={styles.section}>
//           <View style={styles.row}>
//             <View style={styles.flexItem}>
//               <CustomInput label="Pincode" placeholder="Pincode" value={pincode} onChangeText={setPincode} keyboardType="number-pad"/>
//             </View>
//             <View style={styles.flexItem}>
//               <CustomInput label="City" placeholder="City name" value={city} onChangeText={setCity} />
//             </View>
//           </View>
//           <CustomInput label="Address" placeholder="Enter your Address" value={address} onChangeText={setAddress} />
//           <View style={styles.row}>
//             <View style={styles.flexItem}>
//               <CustomInput label="State" placeholder="State" value={state} onChangeText={setState} />
//             </View>
//             <View style={styles.flexItem}>
//               <CustomInput label="Country" placeholder="Country" value={country} onChangeText={setCountry} />
//             </View>
//           </View>
//         </View>

//         {/* Order Summary */}
//         <Text style={styles.sectionHeader}>Order Summary</Text>
//         <View style={styles.section}>
//           {items.map((item) => (
//             <View style={styles.summaryRow} key={item.product._id}>
//               <Text style={styles.summaryItemName} numberOfLines={1}>
//                 {(item.product.name || item.product.title) + '  x' + item.quantity}
//               </Text>
//               <Text style={styles.summaryItemPrice}>
//                 Rs. {(item.price * item.quantity).toLocaleString()}
//               </Text>
//             </View>
//           ))}
//           <View style={styles.divider} />
//           <View style={styles.summaryRow}>
//             <Text style={styles.totalLabel}>Total</Text>
//             <Text style={styles.totalValue}>Rs. {total.toLocaleString()}</Text>
//           </View>
//           <View style={styles.codBadge}>
//             <Text style={styles.codBadgeText}>Cash on Delivery</Text>
//           </View>
//         </View>

//         {/* Place Order Button */}
//         <TouchableOpacity
//           onPress={handlePlaceOrder}
//           style={[styles.saveButton, submitting && styles.saveButtonDisabled]}
//           activeOpacity={0.8}
//           disabled={submitting}
//         >
//           {submitting ? (
//             <ActivityIndicator color="#FFFFFF" />
//           ) : (
//             <Text style={styles.saveButtonText}>Place Order (Cash on Delivery)</Text>
//           )}
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FAFAFC',
//   },
//   scrollContent: {
//     paddingHorizontal: 24,
//     paddingTop: 32,
//     paddingBottom: 50,
//   },
//   headerBlock: {
//     marginTop: 12,
//     marginBottom: 16,
//   },
//   sectionHeader: {
//     fontSize: 14,
//     fontWeight: '700',
//     color: '#8E8E93',
//     textTransform: 'uppercase',
//     letterSpacing: 1,
//     marginBottom: 16,
//   },
//   avatarWrapper: {
//     width: '100%',
//     alignItems: 'center',
//     marginVertical: 4,
//   },
//   avatarContainer: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     overflow: 'hidden',
//     backgroundColor: '#E1E1E6',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 3 },
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     elevation: 3,
//   },
//   avatarImage: {
//     width: '100%',
//     height: '100%',
//   },
//   section: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     padding: 20,
//     marginBottom: 24,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.04,
//     shadowRadius: 16,
//     elevation: 2,
//   },
//   row: {
//     flexDirection: 'row',
//     gap: 16,
//     marginBottom: 16,
//   },
//   flexItem: {
//     flex: 1,
//   },
//   summaryRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   summaryItemName: {
//     flex: 1,
//     fontSize: 14,
//     color: '#3A3A3C',
//     marginRight: 8,
//   },
//   summaryItemPrice: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1C1C1E',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#E5E5EA',
//     marginVertical: 12,
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1C1C1E',
//   },
//   totalValue: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: 'red',
//   },
//   codBadge: {
//     marginTop: 14,
//     backgroundColor: '#F2F2F7',
//     borderRadius: 8,
//     paddingVertical: 8,
//     alignItems: 'center',
//   },
//   codBadgeText: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#3A3A3C',
//   },
//   saveButton: {
//     backgroundColor: 'red',
//     height: 56,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 10, // Added to complete your cut-off style declaration safely
//   },
//   saveButtonDisabled: {
//     backgroundColor: '#FFAAAA',
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '700',
//   },
// });

// export default CheckOut;



import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView, Image,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert,
} from 'react-native';
import CustomInput from './components/CustomInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../api'; // adds the JWT token (adjust path if needed)

const ORDER_URL = '/api/order';
const CART_URL = '/api/cart';

const CheckOut = () => {
  const navigation = useNavigation();
  const route = useRoute();

  // Passed from Cart: navigation.navigate('CheckOut', { items, total })
  const { items = [], total = 0 } = route.params || {};

  const [email, setEmail] = useState('wajeeha@gmail.com');
  const [phone, setPhone] = useState('03458660781');
  const [address, setAddress] = useState('strret no 3 house no 45');
  const [pincode, setPincode] = useState('12345');
  const [country, setCountry] = useState('hklkdm');
  const [state, setState] = useState('hjkdlld');
  const [city, setCity] = useState('jkdls');

  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10,15}$/;
    const textRegex = /^[a-zA-Z\s]+$/;
    const pincodeRegex = /^[0-9]+$/;

    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email.trim())) return 'Please enter a valid email address';
    if (!phone.trim()) return 'Phone number is required';
    if (!phoneRegex.test(phone.trim())) return 'Enter a valid phone number (10-15 digits)';
    if (!address.trim()) return 'Address is required';
    if (!pincode.trim()) return 'Pincode is required';
    if (!pincodeRegex.test(pincode.trim())) return 'Pincode must contain numbers only';
    if (!city.trim()) return 'City is required';
    if (!textRegex.test(city.trim())) return 'City must contain letters only';
    if (!state.trim()) return 'State is required';
    if (!textRegex.test(state.trim())) return 'State must contain letters only';
    if (!country.trim()) return 'Country is required';
    if (!textRegex.test(country.trim())) return 'Country must contain letters only';
    if (items.length === 0) return 'Your cart is empty';
    return null;
  };

  const handlePlaceOrder = async () => {
    const validationError = validate();
    if (validationError) {
      Alert.alert('Missing information', validationError);
      return;
    }

    setSubmitting(true);

    try {
      // Get the logged-in user's id from their cart (the token identifies the user)
      const cartRes = await api.get(CART_URL);
      const userId = cartRes.data.cart?.user;

      if (!userId) {
        Alert.alert('Error', 'Could not find your account. Please log in again.');
        return;
      }

      const orderItems = items.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
        price: item.price,
      }));

      const res = await api.post(ORDER_URL, {
        userId: String(userId),
        items: orderItems,
        totalAmount: total,
        shippingAddress: { email, phone, address, pincode, city, state, country },
      });

      Alert.alert('Order placed', 'Your order has been placed successfully (Cash on Delivery).');
      navigation.navigate('DetailsScreen', { order: res.data.order });
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >

        {/* Header Block */}
        <View style={styles.headerBlock}>
          <Text style={styles.sectionHeader}>Contact Details</Text>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('./assets/image.jpg')}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.section}>
          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={{ marginTop: 12 }}>
          <CustomInput
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/* Shipping Address Section */}
        <Text style={styles.sectionHeader}>Shipping Address</Text>
        <View style={styles.section}>
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <CustomInput label="Pincode" placeholder="Pincode" value={pincode} onChangeText={setPincode} keyboardType="number-pad" />
            </View>
            <View style={styles.flexItem}>
              <CustomInput label="City" placeholder="City name" value={city} onChangeText={setCity} />
            </View>
          </View>
          <CustomInput label="Address" placeholder="Enter your Address" value={address} onChangeText={setAddress} />
          <View style={styles.row}>
            <View style={styles.flexItem}>
              <CustomInput label="State" placeholder="State" value={state} onChangeText={setState} />
            </View>
            <View style={styles.flexItem}>
              <CustomInput label="Country" placeholder="Country" value={country} onChangeText={setCountry} />
            </View>
          </View>
        </View>

        {/* Order Summary */}
        <Text style={styles.sectionHeader}>Order Summary</Text>
        <View style={styles.section}>
          {items.map((item) => (
            <View style={styles.summaryRow} key={item.product._id}>
              <Text style={styles.summaryItemName} numberOfLines={1}>
                {(item.product.name || item.product.title) + '  x' + item.quantity}
              </Text>
              <Text style={styles.summaryItemPrice}>
                Rs. {(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>Rs. {total.toLocaleString()}</Text>
          </View>
          <View style={styles.codBadge}>
            <Text style={styles.codBadgeText}>Cash on Delivery</Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity
          onPress={handlePlaceOrder}
          style={[styles.saveButton, submitting && styles.saveButtonDisabled]}
          activeOpacity={0.8}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>Place Order (Cash on Delivery)</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFC',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 50,
  },
  headerBlock: {
    marginTop: 12,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8E8E93',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  avatarWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 4,
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: '#E1E1E6',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 16,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  flexItem: {
    flex: 1,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  summaryItemName: {
    flex: 1,
    fontSize: 14,
    color: '#3A3A3C',
    marginRight: 8,
  },
  summaryItemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: 'red',
  },
  codBadge: {
    marginTop: 14,
    backgroundColor: '#F2F2F7',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  codBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#3A3A3C',
  },
  saveButton: {
    backgroundColor: 'red',
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#FFAAAA',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CheckOut;