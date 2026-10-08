import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Card from './components/Card';

const BASE_URL = 'http://localhost:3000';

const Home = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  // Fetch products on initial mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // GET http://localhost:3000/api/product
      const response = await axios.get(`${BASE_URL}/api/product`);

      // Backend returns: { success: true, count: X, data: [...] }
      if (response.data && response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Database Fetch Error:', error.message);
    } finally {
      setLoading(false);
    }
  }; // <-- closing brace and semicolon restored

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
        ) : (
          <View style={styles.gridContainer}>
            {filteredProducts.map((item) => {
              const completeImageUrl = `${BASE_URL}${item.image}`;

              return (
                <View style={styles.cardWrapper} key={item._id}>
                  <Card
                    title={item.name || item.title}
                    description={`Rs ${item.price}`}
                    imageUrl={{ uri: completeImageUrl }}
                    onPress={() => handleCardPress(item)}
                  />
                </View>
              );
            })}
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


// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   View,
//   TextInput,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   TouchableOpacity,
//   Text,
//   ActivityIndicator,
// } from 'react-native';

// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import Feather from 'react-native-vector-icons/Feather';

// import Card from '../pages/components/Card';
// import ImageSlider from '../pages/components/ImageSlider';
// import ImageScroller from '../pages/components/ImageScroller';

// // 1. Localhost definitions configured for your USB debugging (adb reverse)
// const BASE_URL = 'http://localhost:3000';

// const Home = () => {
//   // 2. Component State Management

//   const navigation = useNavigation();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchText, setSearchText] = useState('');

//   // 3. Fetch products on initial mount
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       // Hits your endpoint: GET http://localhost:3000/api/product
//       const response = await axios.get(`${BASE_URL}/api/product`);
      
//       // Matches your backend route: { success: true, count: X, data: [...] }
//       if (response.data && response.data.success) {
//         setProducts(response.data.data);
//       }
//     } catch (error) {
//       console.error("Database Fetch Error:", error.message);
//     } finally {
//       setLoading(false);
//     }


//   };

//   const handleCardPress = (item) => {
//     navigation.navigate('Cart', { product: item }); 
//   };

//   // 4. Case-insensitive item searching
//   const filteredProducts = products.filter((item) => {
//     const productName = item.name || item.title || '';
//     return productName.toLowerCase().includes(searchText.toLowerCase());
//   });

//   return (
//     <SafeAreaView style={styles.mainContainer}>
//       {/* Header */}
//       <View style={styles.headerRow}>
//         <View style={styles.iconContainer}>
//           <Feather name="align-left" size={24} color="#000" />
//         </View>

//         <View style={styles.searchBarWrapper}>
//           <Feather name="search" size={18} color="#777" style={styles.searchIcon} />
//           <TextInput
//             placeholder="Search Products..."
//             placeholderTextColor="#777"
//             style={styles.searchInput}
//             value={searchText}
//             onChangeText={setSearchText}
//           />
//         </View>

//         <View style={styles.avatarWrapper}>
//           <Image source={require('./assets/image.jpg')} style={styles.profileImage} />
//         </View>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.container}>
//           <Text style={styles.title}>All Features</Text>
//           <View style={styles.buttonGroup}>
//             <TouchableOpacity style={styles.button}> 
//               <Text style={styles.buttonText}>Sort</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.button}>
//               <Text style={styles.buttonText}>Filter</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View>
//           <ImageScroller/>
//         </View>

//         <ImageSlider />

//         {/* 5. Conditional Interface State Rendering */}
//         {loading ? (
//           <ActivityIndicator size="large" color="#000" style={styles.loader} />
//         ) : (
//           <View style={styles.gridContainer}>
//             {filteredProducts.map((item) => {
//               // Dynamically builds: http://localhost:3000/uploads/filename.jpg
//               const completeImageUrl = `${BASE_URL}${item.image}`;

//               return (
//                 <View style={styles.cardWrapper} key={item._id}>
//                   <Card
//                     title={item.name || item.title}
//                     description={`Rs ${item.price}`}
//                     // Passes the combined absolute URI mapping to your card
//                     imageUrl={{ uri: completeImageUrl }}
//                     onPress={() => handleCardPress(item.name || item.title)}
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

// export default Home;

// const styles = StyleSheet.create({
//   mainContainer: { flex: 1, backgroundColor: '#fff' },
//   headerRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 10 },
//   iconContainer: { justifyContent: 'center', alignItems: 'center' },
//   searchBarWrapper: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F2F2', marginHorizontal: 10, borderRadius: 10, paddingHorizontal: 10, height: 40 },
//   searchIcon: { marginRight: 5 },
//   searchInput: { flex: 1 },
//   avatarWrapper: { width: 40, height: 40, borderRadius: 20, overflow: 'hidden' },
//   profileImage: { width: '100%', height: '100%' },
//   gridContainer: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', paddingHorizontal: 15, marginTop: 10 },
//   cardWrapper: { width: '48%', marginBottom: 15 },
//   title: { fontSize: 18, fontWeight: '600', color: '#1a1a1a' },
//   buttonGroup: { flexDirection: 'row', gap: 12 },
//   button: { borderRadius: 6, backgroundColor: '#f0f0f0', padding: 6, paddingHorizontal: 12 },
//   buttonText: { fontSize: 14, fontWeight: '500', color: '#333' },
//   container: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
//   loader: { marginVertical: 40 }
// });
