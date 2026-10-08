



// import React, { useState, useEffect } from 'react';
// import { SafeAreaView, Text, Image, ActivityIndicator, StyleSheet,TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native'; 
// import axios from 'axios';
// import { useRoute } from '@react-navigation/native';

// const BASE_URL = 'http://localhost:3000';

// const ProductDetail = () => {

//     const navigation = useNavigation();
//   const route = useRoute();
//   const { productId } = route.params || {};

//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (productId) {
//       fetchProduct();
//     } else {
//       setError('No product selected');
//       setLoading(false);
//     }
//   }, [productId]);

//   const fetchProduct = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${BASE_URL}/api/product/productDetail/${productId}`);
//       if (response.data && response.data.success) {
//         setProduct(response.data.data);
//       }
//     } catch (err) {
//       console.error('Fetch single product error:', err.message);
//       setError('Failed to load product');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;
//   }

//   if (error || !product) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <Text>{error || 'Product not found'}</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         source={{ uri: `${BASE_URL}${product.image}` }}
//         style={styles.image}
//         resizeMode="cover"
//       />
//       <Text style={styles.title}>{product.name || product.title}</Text>
//       <Text style={styles.price}>Rs {product.price}</Text>
//       {product.description && <Text style={styles.description}>{product.description}</Text>}

//            {/* Action Button */}
//           <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Cart')}>
//             <Text style={styles.buttonText}>Add to Cart</Text>
//           </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#fff', padding: 16 },
//   image: { width: '100%', height: 250, borderRadius: 12, backgroundColor: '#f2f2f2' },
//   title: { fontSize: 22, fontWeight: 'bold', marginTop: 16 },
//   price: { fontSize: 18, color: '#666', marginTop: 8 },
//   description: { fontSize: 14, color: '#333', marginTop: 12 },

//    button: {
//     backgroundColor: 'blue', // Fixed: changed 'color' to 'backgroundColor'
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: '600',
//   },


// });

// export default ProductDetail;


import React, { useState, useEffect } from 'react';
import {
  SafeAreaView, Text, Image, ActivityIndicator,
  StyleSheet, TouchableOpacity, Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import api from '../api';   // App/api.js, from App/pages/

const BASE_URL = 'http://localhost:3000';

const ProductDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { productId } = route.params || {};

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false); // keep hooks above any early return

  useEffect(() => {
    if (productId) fetchProduct();
    else {
      setError('No product selected');
      setLoading(false);
    }
  }, [productId]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/api/product/productDetail/${productId}`);
      if (response.data?.success) setProduct(response.data.data);
    } catch (err) {
      console.error('Fetch single product error:', err.message);
      setError('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (adding) return;

    if ((product.stockQuantity ?? 0) < 1) {
      Alert.alert('Out of stock', 'This item is currently unavailable.');
      return;
    }

    try {
      setAdding(true);
      // ⚠️ Change this to match YOUR backend add-to-cart route/body
     await api.post('/api/cart/items', {
  productId: product._id,
  quantity: 1,
});
      // Go to the Cart TAB (inside BottomTab), so the tab bar stays visible
      navigation.navigate('BottomTab', { screen: 'Cart' });
    } catch (err) {
      Alert.alert('Error', err.response?.data?.message || err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#000" style={{ marginTop: 50 }} />;
  }

  if (error || !product) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>{error || 'Product not found'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: `${BASE_URL}${product.image}` }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{product.name || product.title}</Text>
      <Text style={styles.price}>Rs {product.price}</Text>
      {product.description ? <Text style={styles.description}>{product.description}</Text> : null}

      <TouchableOpacity
        style={[styles.button, adding && { opacity: 0.6 }]}
        onPress={handleAddToCart}
        disabled={adding}
      >
        {adding ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Add to Cart</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 16 },
  image: { width: '100%', height: 250, borderRadius: 12, backgroundColor: '#f2f2f2' },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 16 },
  price: { fontSize: 18, color: '#666', marginTop: 8 },
  description: { fontSize: 14, color: '#333', marginTop: 12 },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});

export default ProductDetail;