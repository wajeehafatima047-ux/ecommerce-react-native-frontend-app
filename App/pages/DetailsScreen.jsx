


// import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import React from 'react';
// import CheckoutCard from './components/CheckoutCard';

// const DetailsScreen = () => {
//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
//       <Text style={styles.headerText}>Checkout</Text>

//       <View style={styles.addressContainer}>
//         <View style={styles.addressHeaderRow}>
//           <Text style={styles.addressTitle}>Delivery Address</Text>
//           <TouchableOpacity>
//             <Text style={styles.editButtonText}>Edit</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.addressText}>Model City, Sargodha</Text>
//         <Text style={styles.contactText}>Contact: +92 322 17XXXXX</Text>
//       </View>

//       <Text style={styles.sectionTitle}>Your Items</Text>
      
//       <View style={styles.itemsList}>
//         <CheckoutCard  
//           title="Women's Shoes" 
//           description="Size| 8 | Heels"
//           imageUrl={require('./assets/womenshoes.jpg')}
//           Button1="Red" 
//           Button2="Black"       
//         />

//         <CheckoutCard  
//           title="Men Shoes"
//           description="Size| 9| Sneaker"
//           imageUrl={require('./assets/shoes2.jpg')}
//           Button1="Red" 
//           Button2="Black"       
//         />
//       </View>

//       {/* Added the missing button components here to use the styles */}
//       <View style={styles.footerContainer}>
   
//       </View>

//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa', 
//   },
//   contentContainer: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   headerText: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#1a1a1a',
//     marginBottom: 20,
//     marginTop: 10,
//   },
//   addressContainer: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 24,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   addressHeaderRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   addressTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1a1a1a',
//   },
//   editButtonText: {
//     fontSize: 14,
//     color: '#007aff', 
//     fontWeight: '600',
//   },
//   addressText: {
//     fontSize: 15,
//     color: '#4a4a4a',
//     marginBottom: 4,
//   },
//   contactText: {
//     fontSize: 14,
//     color: '#7a7a7a',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#1a1a1a',
//     marginBottom: 10,
//   },
//   itemsList: {
//     marginBottom: 20,
//   },
//   footerContainer: {
//     marginTop: 20,
//   },
//   orderButton: {
//     backgroundColor: '#000000', 
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   orderButtonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default DetailsScreen;



import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, Image, ActivityIndicator,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import api from '../api'; // CHANGED: replaces axios, adds the JWT token (adjust path if needed)

const SERVER_URL = 'http://localhost:3000'; // CHANGED: only used for image URLs now
const ORDER_URL = '/api/order';             // CHANGED: no SERVER_URL prefix, api has the baseURL

const DetailsScreen = () => {
  const route = useRoute();
  const orderId = route.params?.order?._id;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`${ORDER_URL}/${orderId}`); // CHANGED: api instead of axios
        setOrder(res.data.order);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    if (orderId) fetchOrder();
    else {
      setError('No order found');
      setLoading(false);
    }
  }, [orderId]);

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="red" />;
  }

  if (error || !order) {
    return (
      <View style={styles.center}>
        <Text>{error || 'Something went wrong'}</Text>
      </View>
    );
  }

  const { shippingAddress: addr } = order;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerText}>Order Confirmed 🎉</Text>
      <Text style={styles.statusText}>
        Status: {order.status} • Payment: {order.paymentMethod}
      </Text>

      <View style={styles.addressContainer}>
        <Text style={styles.addressTitle}>Delivery Address</Text>
        <Text style={styles.addressText}>
          {addr.address}, {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
        </Text>
        <Text style={styles.contactText}>Phone: {addr.phone}</Text>
        <Text style={styles.contactText}>Email: {addr.email}</Text>
      </View>

      <Text style={styles.sectionTitle}>Your Items</Text>
      <View style={styles.itemsList}>
        {order.items.map((item) => (
          <View style={styles.itemRow} key={item.product._id}>
            {/* CHANGED: image URL now uses SERVER_URL, same as Cart.js */}
            {item.product.image ? (
              <Image
                source={{ uri: `${SERVER_URL}${item.product.image}` }}
                style={styles.itemImage}
              />
            ) : null}
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>
                {item.product.name || item.product.title}
              </Text>
              <Text style={styles.itemMeta}>Qty: {item.quantity}</Text>
            </View>
            <Text style={styles.itemPrice}>
              Rs. {(item.price * item.quantity).toLocaleString()}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>Rs. {order.totalAmount.toLocaleString()}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  contentContainer: { padding: 16, paddingBottom: 40 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerText: { fontSize: 26, fontWeight: 'bold', color: '#1a1a1a', marginTop: 10 },
  statusText: { fontSize: 14, color: '#7a7a7a', marginBottom: 20, marginTop: 4 },
  addressContainer: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 24, elevation: 2,
  },
  addressTitle: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
  addressText: { fontSize: 15, color: '#4a4a4a', marginBottom: 4 },
  contactText: { fontSize: 14, color: '#7a7a7a' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10 },
  itemsList: { marginBottom: 20 },
  itemRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 12, padding: 12, marginBottom: 10, elevation: 1,
  },
  itemImage: { width: 56, height: 56, borderRadius: 8, marginRight: 12 },
  itemName: { fontSize: 15, fontWeight: '600' },
  itemMeta: { fontSize: 13, color: '#7a7a7a', marginTop: 2 },
  itemPrice: { fontSize: 14, fontWeight: '600' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  totalLabel: { fontSize: 18, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '700', color: 'red' },
});

export default DetailsScreen;