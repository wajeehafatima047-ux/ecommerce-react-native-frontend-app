// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   ScrollView,
//   View,
//   ActivityIndicator,
//   StyleSheet,
//   TextInput,
// } from 'react-native';
// import axios from 'axios';
// import { useNavigation } from '@react-navigation/native';
// import Card from './components/Card';

// const BASE_URL = 'http://localhost:3000';

// const Home = () => {
//   const navigation = useNavigation();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');

//   // Fetch products on initial mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       // GET http://localhost:3000/api/product
//       const response = await axios.get(`${BASE_URL}/api/product`);

//       // Backend returns: { success: true, count: X, data: [...] }
//       if (response.data && response.data.success) {
//         setProducts(response.data.data);
//       }
//     } catch (error) {
//       console.error('Database Fetch Error:', error.message);
//     } finally {
//       setLoading(false);
//     }
//   }; // <-- closing brace and semicolon restored

//   const handleCardPress = (item) => {
//     navigation.navigate('ProductDetail', { productId: item._id });
//   };

//   const filteredProducts = products.filter((item) => {
//     const productName = item.name || item.title || '';
//     return productName.toLowerCase().includes(searchText.toLowerCase());
//   });

//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search products..."
//         value={searchText}
//         onChangeText={setSearchText}
//       />
//       <ScrollView showsVerticalScrollIndicator={false}>
//         {loading ? (
//           <ActivityIndicator size="large" color="#000" style={styles.loader} />
//         ) : (
//           <View style={styles.gridContainer}>
//             {filteredProducts.map((item) => {
//               const completeImageUrl = `${BASE_URL}${item.image}`;

//               return (
//                 <View style={styles.cardWrapper} key={item._id}>
//                   <Card
//                     title={item.name || item.title}
//                     description={`Rs ${item.price}`}
//                     imageUrl={{ uri: completeImageUrl }}
//                     onPress={() => handleCardPress(item)}
//                   />
//                 </View>
//               );
//             })}
//           </View>
//         )}
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: { flex: 1, backgroundColor: '#f7f7f7' },
//   searchInput: {
//     margin: 12,
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   loader: { marginTop: 50 },
//   gridContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//     paddingHorizontal: 12,
//   },
//   cardWrapper: {
//     width: '48%',
//     marginBottom: 16,
//   },
// });

// export default Home;

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './components/Card';
import api, { API_URL } from '../api'; // adjust the path to where your api.js is

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await api.get('/api/product');

      if (response.data && response.data.success) {
        setProducts(response.data.data);
      }
    } catch (err) {
      console.error('Database Fetch Error:', err.message);
      setError('Could not load products. The server may be waking up, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (image) => {
    if (!image) return null;
    return image.startsWith('http') ? image : `${API_URL}${image}`;
  };

  const handleCardPress = (item) => {
    navigation.navigate('ProductDetail', { productId: item._id });
  };

  const filteredProducts = products.filter((item) => {
    const productName = item.name || item.title || '';
    return productName.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search products..."
        value={searchText}
        onChangeText={setSearchText}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {loading ? (
          <ActivityIndicator size="large" color="#000" style={styles.loader} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <View style={styles.gridContainer}>
            {filteredProducts.map((item) => (
              <View style={styles.cardWrapper} key={item._id}>
                <Card
                  title={item.name || item.title}
                  description={`Rs ${item.price}`}
                  imageUrl={{ uri: getImageUrl(item.image) }}
                  onPress={() => handleCardPress(item)}
                />
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#f7f7f7' },
  searchInput: {
    margin: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  loader: { marginTop: 50 },
  errorText: { textAlign: 'center', marginTop: 50, color: 'red', paddingHorizontal: 20 },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  cardWrapper: {
    width: '48%',
    marginBottom: 16,
  },
});

export default Home;