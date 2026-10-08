import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import api from '../../api';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   useEffect(() => {
//     api.get(api.get('/product')) // ⚠️ change to match YOUR Postman route exactly
//       .then((res) => {
//         setProducts(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log('Fetch error:', err.message);
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);
useEffect(() => {
    api.get('/product')
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('Fetch error:', err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#333" />
        <Text>Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Something went wrong: {error}</Text>
      </View>
    );
  }

  if (products.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No products found.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      numColumns={2}
      scrollEnabled={false} // important: parent ScrollView already scrolls
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
          <Text style={styles.price}>Rs. {item.price}</Text>
          <Text style={item.inStock ? styles.inStock : styles.outStock}>
            {item.inStock ? 'In Stock' : 'Out of Stock'}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { padding: 20, alignItems: 'center' },
  list: { paddingHorizontal: 8 },
  card: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  name: { fontWeight: 'bold', fontSize: 15 },
  desc: { fontSize: 12, color: '#666', marginVertical: 4 },
  price: { fontWeight: '600', fontSize: 14, marginTop: 4 },
  inStock: { color: 'green', fontSize: 12, marginTop: 2 },
  outStock: { color: 'red', fontSize: 12, marginTop: 2 },
});

export default ProductList;