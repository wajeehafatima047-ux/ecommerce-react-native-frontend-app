



// import React, { useCallback, useState } from 'react';
// import {
//   View, Image, Text, StyleSheet, ScrollView,
//   TouchableOpacity, ActivityIndicator, Alert,
// } from 'react-native';
// import { useNavigation, useFocusEffect } from '@react-navigation/native';
// import axios from 'axios';

// // // Must be identical to the values in WishList
// // const SERVER_URL = 'http://localhost:3000';
// // const USER_ID = '6abdfe25f3b39ce7b0c6ecd3';
// // const CART_URL = `${SERVER_URL}/api/cart/${USER_ID}`;



// // Cart.js
// const CART_URL = '/api/cart';
// const res = await api.get(CART_URL);
// await api.put(`${CART_URL}/items/${productId}`, { quantity: newQty });
// await api.delete(`${CART_URL}/items/${productId}`);

// const Cart = () => {
//   const navigation = useNavigation();
//   const [cart, setCart] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Tracks which product is mid-request and what kind of action, e.g.
//   // { "64f...": "remove" } or { "64f...": "qty" }. Lets us disable/spin
//   // just that item's buttons instead of blocking the whole screen.
//   const [busyItems, setBusyItems] = useState({});

//   const setBusy = (productId, action) => {
//     setBusyItems((prev) => ({ ...prev, [productId]: action }));
//   };

//   const clearBusy = (productId) => {
//     setBusyItems((prev) => {
//       const next = { ...prev };
//       delete next[productId];
//       return next;
//     });
//   };

//   const fetchCart = async () => {
//     try {
//       const res = await axios.get(CART_URL);
//       setCart(res.data.cart);
//     } catch (error) {
//       if (error.response?.status === 404) {
//         setCart({ items: [] }); // no cart yet = empty cart
//       } else {
//         Alert.alert('Error', error.response?.data?.message || error.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Runs every time you arrive on this screen (e.g. after Add to Cart)
//   useFocusEffect(
//     useCallback(() => {
//       fetchCart();
//     }, [])
//   );

//   const changeQty = async (item, delta) => {
//     const productId = item.product._id;

//     // Ignore taps while a request for this item is already in flight
//     if (busyItems[productId]) return;

//     const newQty = item.quantity + delta;
//     const stock = item.product.stockQuantity ?? 0;

//     // Block increasing beyond available stock
//     if (delta > 0 && newQty > stock) {
//       Alert.alert('Stock limit', `Only ${stock} available in stock.`);
//       return;
//     }

//     setBusy(productId, newQty < 1 ? 'remove' : 'qty');

//     try {
//       if (newQty < 1) {
//         await axios.delete(`${CART_URL}/items/${productId}`);
//       } else {
//         await axios.put(`${CART_URL}/items/${productId}`, { quantity: newQty });
//       }
//       await fetchCart();
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.message || error.message);
//       await fetchCart(); // refresh in case stock changed
//     } finally {
//       clearBusy(productId);
//     }
//   };

//   const removeItem = async (item) => {
//     const productId = item.product._id;

//     if (busyItems[productId]) return;

//     setBusy(productId, 'remove');

//     try {
//       await axios.delete(`${CART_URL}/items/${productId}`);
//       await fetchCart();
//     } catch (error) {
//       Alert.alert('Error', error.response?.data?.message || error.message);
//     } finally {
//       clearBusy(productId);
//     }
//   };

//   const items = (cart?.items || []).filter((i) => i.product); // skip deleted products
//   const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//   // True if any item is out of stock or the cart quantity is above current stock
//   const hasStockProblem = items.some(
//     (i) => (i.product.stockQuantity ?? 0) < 1 || i.quantity > i.product.stockQuantity
//   );

//   const anyItemBusy = Object.keys(busyItems).length > 0;

//   const handleBuyNow = () => {
//     if (hasStockProblem) {
//       Alert.alert(
//         'Stock issue',
//         'Some items are out of stock or exceed available stock. Please adjust your cart.'
//       );
//       return;
//     }
//     navigation.navigate('CheckOut', { items, total });
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
//   }

//   if (items.length === 0) {
//     return (
//       <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
//         <Text style={styles.detailText}>Your cart is empty</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView style={styles.container}>
//       {items.map((item) => {
//         const p = item.product;
//         const stock = p.stockQuantity ?? 0;
//         const outOfStock = stock < 1;
//         const overStock = !outOfStock && item.quantity > stock;
//         const atLimit = item.quantity >= stock;

//         const busyAction = busyItems[p._id]; // undefined | 'qty' | 'remove'
//         const isRemoving = busyAction === 'remove';
//         const isChangingQty = busyAction === 'qty';
//         const isBusy = Boolean(busyAction);

//         return (
//           <View style={styles.card} key={p._id}>
//             {/* Product Image (from server) */}
//             <Image
//               source={{ uri: `${SERVER_URL}${p.image}` }}
//               style={styles.image}
//               resizeMode="cover"
//             />

//             <View style={styles.infoContainer}>
//               {p.brand ? <Text style={styles.brand}>{p.brand}</Text> : null}
//               <Text style={styles.title}>{p.name || p.title}</Text>

//               <View style={styles.metaRow}>
//                 <Text style={styles.price}>Rs. {item.price.toLocaleString()}</Text>
//                 {p.size ? (
//                   <View style={styles.sizeBadge}>
//                     <Text style={styles.sizeText}>Size {p.size}</Text>
//                   </View>
//                 ) : null}
//               </View>

//               {/* Quantity controls */}
//               <View style={styles.qtyRow}>
//                 <TouchableOpacity
//                   style={[styles.qtyBtn, isBusy && styles.qtyBtnDisabled]}
//                   onPress={() => changeQty(item, -1)}
//                   disabled={isBusy}
//                 >
//                   {isChangingQty ? (
//                     <ActivityIndicator size="small" color="#8e8e93" />
//                   ) : (
//                     <Text style={styles.qtyBtnText}>−</Text>
//                   )}
//                 </TouchableOpacity>

//                 <Text style={styles.qtyText}>{item.quantity}</Text>

//                 <TouchableOpacity
//                   style={[styles.qtyBtn, (atLimit || isBusy) && styles.qtyBtnDisabled]}
//                   onPress={() => changeQty(item, 1)}
//                   disabled={atLimit || isBusy}
//                 >
//                   {isChangingQty ? (
//                     <ActivityIndicator size="small" color="#8e8e93" />
//                   ) : (
//                     <Text style={[styles.qtyBtnText, atLimit && styles.qtyBtnTextDisabled]}>+</Text>
//                   )}
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   onPress={() => removeItem(item)}
//                   style={styles.removeBtn}
//                   disabled={isBusy}
//                 >
//                   {isRemoving ? (
//                     <ActivityIndicator size="small" color="#8e8e93" />
//                   ) : (
//                     <Text style={styles.removeText}>Remove</Text>
//                   )}
//                 </TouchableOpacity>
//               </View>

//               {/* Stock messages */}
//               {outOfStock ? (
//                 <Text style={styles.stockWarning}>Out of stock. Please remove this item.</Text>
//               ) : overStock ? (
//                 <Text style={styles.stockWarning}>
//                   Only {stock} available. Please reduce the quantity.
//                 </Text>
//               ) : atLimit ? (
//                 <Text style={styles.stockWarning}>Max available: {stock}</Text>
//               ) : null}

//               <View style={styles.divider} />

//               {p.description ? (
//                 <>
//                   <Text style={styles.detailTitle}>Product Details</Text>
//                   <Text style={styles.detailText}>{p.description}</Text>
//                 </>
//               ) : null}
//             </View>
//           </View>
//         );
//       })}

//       {/* Total + Buy Now */}
//       <View style={styles.footer}>
//         <Text style={styles.total}>Total: Rs. {total.toLocaleString()}</Text>
//         <TouchableOpacity
//           style={[styles.button, (hasStockProblem || anyItemBusy) && styles.buttonDisabled]}
//           onPress={handleBuyNow}
//           disabled={hasStockProblem || anyItemBusy}
//         >
//           <Text style={styles.buttonText}>Buy Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f8f9fa' },
//   card: {
//     backgroundColor: '#ffffff',
//     borderRadius: 16,
//     margin: 16,
//     marginBottom: 0,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 3,
//     overflow: 'hidden',
//   },
//   image: { width: '100%', height: 300, backgroundColor: '#f2f2f2' },
//   infoContainer: { padding: 20 },
//   brand: {
//     fontSize: 14, fontWeight: '600', color: '#8e8e93',
//     textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
//   },
//   title: { fontSize: 22, fontWeight: 'bold', color: '#1c1c1e', marginBottom: 12 },
//   metaRow: {
//     flexDirection: 'row', justifyContent: 'space-between',
//     alignItems: 'center', marginBottom: 16,
//   },
//   price: { fontSize: 20, fontWeight: '700', color: 'red' },
//   sizeBadge: {
//     backgroundColor: '#f2f2f7', paddingHorizontal: 12,
//     paddingVertical: 6, borderRadius: 8,
//   },
//   sizeText: { fontSize: 14, fontWeight: '600', color: '#3a3a3c' },
//   qtyRow: { flexDirection: 'row', alignItems: 'center' },
//   qtyBtn: {
//     backgroundColor: '#f2f2f7', width: 34, height: 34, borderRadius: 8,
//     alignItems: 'center', justifyContent: 'center',
//   },
//   qtyBtnDisabled: { backgroundColor: '#e5e5ea' },
//   qtyBtnText: { fontSize: 18, fontWeight: '600' },
//   qtyBtnTextDisabled: { color: '#c7c7cc' },
//   qtyText: { marginHorizontal: 14, fontSize: 16, fontWeight: '600' },
//   removeBtn: { marginLeft: 'auto', minWidth: 60, alignItems: 'flex-end' },
//   removeText: { color: '#8e8e93', fontSize: 14 },
//   stockWarning: { color: 'red', fontSize: 13, marginTop: 8 },
//   divider: { height: 1, backgroundColor: '#e5e5ea', marginVertical: 16 },
//   detailTitle: { fontSize: 16, fontWeight: '600', color: '#1c1c1e', marginBottom: 8 },
//   detailText: { fontSize: 14, color: '#666666', lineHeight: 20 },
//   footer: { padding: 16, paddingBottom: 32 },
//   total: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
//   button: { backgroundColor: 'red', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
//   buttonDisabled: { backgroundColor: '#c7c7cc' },
//   buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
// });

// export default Cart;  


import React, { useCallback, useState } from 'react';
import {
  View, Image, Text, StyleSheet, ScrollView,
  TouchableOpacity, ActivityIndicator, Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import api from '../api'; // App/api.js (adds the JWT token automatically)

const SERVER_URL = 'http://localhost:3000'; // only used for image URLs
const CART_URL = '/api/cart';

const Cart = () => {
  const navigation = useNavigation();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Tracks which product is mid-request and what kind of action, e.g.
  // { "64f...": "remove" } or { "64f...": "qty" }.
  const [busyItems, setBusyItems] = useState({});

  const setBusy = (productId, action) => {
    setBusyItems((prev) => ({ ...prev, [productId]: action }));
  };

  const clearBusy = (productId) => {
    setBusyItems((prev) => {
      const next = { ...prev };
      delete next[productId];
      return next;
    });
  };

  const fetchCart = async () => {
    try {
      const res = await api.get(CART_URL);
      setCart(res.data.cart);
    } catch (error) {
      if (error.response?.status === 404) {
        setCart({ items: [] }); // no cart yet = empty cart
      } else {
        Alert.alert('Error', error.response?.data?.message || error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Runs every time you arrive on this screen (e.g. after Add to Cart)
  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const changeQty = async (item, delta) => {
    const productId = item.product._id;

    // Ignore taps while a request for this item is already in flight
    if (busyItems[productId]) return;

    const newQty = item.quantity + delta;
    const stock = item.product.stockQuantity ?? 0;

    // Block increasing beyond available stock
    if (delta > 0 && newQty > stock) {
      Alert.alert('Stock limit', `Only ${stock} available in stock.`);
      return;
    }

    setBusy(productId, newQty < 1 ? 'remove' : 'qty');

    try {
      if (newQty < 1) {
        await api.delete(`${CART_URL}/items/${productId}`);
      } else {
        await api.put(`${CART_URL}/items/${productId}`, { quantity: newQty });
      }
      await fetchCart();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || error.message);
      await fetchCart(); // refresh in case stock changed
    } finally {
      clearBusy(productId);
    }
  };

  const removeItem = async (item) => {
    const productId = item.product._id;

    if (busyItems[productId]) return;

    setBusy(productId, 'remove');

    try {
      await api.delete(`${CART_URL}/items/${productId}`);
      await fetchCart();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || error.message);
    } finally {
      clearBusy(productId);
    }
  };

  const items = (cart?.items || []).filter((i) => i.product); // skip deleted products
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  // True if any item is out of stock or the cart quantity is above current stock
  const hasStockProblem = items.some(
    (i) => (i.product.stockQuantity ?? 0) < 1 || i.quantity > i.product.stockQuantity
  );

  const anyItemBusy = Object.keys(busyItems).length > 0;

  const handleBuyNow = () => {
    if (hasStockProblem) {
      Alert.alert(
        'Stock issue',
        'Some items are out of stock or exceed available stock. Please adjust your cart.'
      );
      return;
    }
    navigation.navigate('CheckOut', { items, total });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="red" style={{ flex: 1 }} />;
  }

  if (items.length === 0) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.detailText}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {items.map((item) => {
        const p = item.product;
        const stock = p.stockQuantity ?? 0;
        const outOfStock = stock < 1;
        const overStock = !outOfStock && item.quantity > stock;
        const atLimit = item.quantity >= stock;

        const busyAction = busyItems[p._id]; // undefined | 'qty' | 'remove'
        const isRemoving = busyAction === 'remove';
        const isChangingQty = busyAction === 'qty';
        const isBusy = Boolean(busyAction);

        return (
          <View style={styles.card} key={p._id}>
            {/* Product Image (from server) */}
            <Image
              source={{ uri: `${SERVER_URL}${p.image}` }}
              style={styles.image}
              resizeMode="cover"
            />

            <View style={styles.infoContainer}>
              {p.brand ? <Text style={styles.brand}>{p.brand}</Text> : null}
              <Text style={styles.title}>{p.name || p.title}</Text>

              <View style={styles.metaRow}>
                <Text style={styles.price}>Rs. {item.price.toLocaleString()}</Text>
                {p.size ? (
                  <View style={styles.sizeBadge}>
                    <Text style={styles.sizeText}>Size {p.size}</Text>
                  </View>
                ) : null}
              </View>

              {/* Quantity controls */}
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={[styles.qtyBtn, isBusy && styles.qtyBtnDisabled]}
                  onPress={() => changeQty(item, -1)}
                  disabled={isBusy}
                >
                  {isChangingQty ? (
                    <ActivityIndicator size="small" color="#8e8e93" />
                  ) : (
                    <Text style={styles.qtyBtnText}>−</Text>
                  )}
                </TouchableOpacity>

                <Text style={styles.qtyText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={[styles.qtyBtn, (atLimit || isBusy) && styles.qtyBtnDisabled]}
                  onPress={() => changeQty(item, 1)}
                  disabled={atLimit || isBusy}
                >
                  {isChangingQty ? (
                    <ActivityIndicator size="small" color="#8e8e93" />
                  ) : (
                    <Text style={[styles.qtyBtnText, atLimit && styles.qtyBtnTextDisabled]}>+</Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => removeItem(item)}
                  style={styles.removeBtn}
                  disabled={isBusy}
                >
                  {isRemoving ? (
                    <ActivityIndicator size="small" color="#8e8e93" />
                  ) : (
                    <Text style={styles.removeText}>Remove</Text>
                  )}
                </TouchableOpacity>
              </View>

              {/* Stock messages */}
              {outOfStock ? (
                <Text style={styles.stockWarning}>Out of stock. Please remove this item.</Text>
              ) : overStock ? (
                <Text style={styles.stockWarning}>
                  Only {stock} available. Please reduce the quantity.
                </Text>
              ) : atLimit ? (
                <Text style={styles.stockWarning}>Max available: {stock}</Text>
              ) : null}

              <View style={styles.divider} />

              {p.description ? (
                <>
                  <Text style={styles.detailTitle}>Product Details</Text>
                  <Text style={styles.detailText}>{p.description}</Text>
                </>
              ) : null}
            </View>
          </View>
        );
      })}

      {/* Total + Buy Now */}
      <View style={styles.footer}>
        <Text style={styles.total}>Total: Rs. {total.toLocaleString()}</Text>
        <TouchableOpacity
          style={[styles.button, (hasStockProblem || anyItemBusy) && styles.buttonDisabled]}
          onPress={handleBuyNow}
          disabled={hasStockProblem || anyItemBusy}
        >
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    margin: 16,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 300, backgroundColor: '#f2f2f2' },
  infoContainer: { padding: 20 },
  brand: {
    fontSize: 14, fontWeight: '600', color: '#8e8e93',
    textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4,
  },
  title: { fontSize: 22, fontWeight: 'bold', color: '#1c1c1e', marginBottom: 12 },
  metaRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 16,
  },
  price: { fontSize: 20, fontWeight: '700', color: 'red' },
  sizeBadge: {
    backgroundColor: '#f2f2f7', paddingHorizontal: 12,
    paddingVertical: 6, borderRadius: 8,
  },
  sizeText: { fontSize: 14, fontWeight: '600', color: '#3a3a3c' },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyBtn: {
    backgroundColor: '#f2f2f7', width: 34, height: 34, borderRadius: 8,
    alignItems: 'center', justifyContent: 'center',
  },
  qtyBtnDisabled: { backgroundColor: '#e5e5ea' },
  qtyBtnText: { fontSize: 18, fontWeight: '600' },
  qtyBtnTextDisabled: { color: '#c7c7cc' },
  qtyText: { marginHorizontal: 14, fontSize: 16, fontWeight: '600' },
  removeBtn: { marginLeft: 'auto', minWidth: 60, alignItems: 'flex-end' },
  removeText: { color: '#8e8e93', fontSize: 14 },
  stockWarning: { color: 'red', fontSize: 13, marginTop: 8 },
  divider: { height: 1, backgroundColor: '#e5e5ea', marginVertical: 16 },
  detailTitle: { fontSize: 16, fontWeight: '600', color: '#1c1c1e', marginBottom: 8 },
  detailText: { fontSize: 14, color: '#666666', lineHeight: 20 },
  footer: { padding: 16, paddingBottom: 32 },
  total: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  button: { backgroundColor: 'red', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#c7c7cc' },
  buttonText: { color: '#ffffff', fontSize: 16, fontWeight: '600' },
});

export default Cart;