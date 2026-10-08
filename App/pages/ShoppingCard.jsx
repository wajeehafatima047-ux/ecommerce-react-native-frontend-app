



// import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
// import React from 'react';
// import { useNavigation } from '@react-navigation/native';
// const ShoppingCard = () => {

//    const navigation=useNavigation();
//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
//       {/* 1. PRODUCT CARD SECTION */}
//       <View style={styles.productCard}>
//         <Image 
//           source={require('./assets/womenshoes.jpg')} 
//           style={styles.productImage} 
//           resizeMode="cover"
//         />

//         <View style={styles.productDetails}>
//           <Text style={styles.productTitle}>Women Shoes</Text>
//           <Text style={styles.productDescription}>This shoes for women</Text>
          
//           <View style={styles.dropdownRow}>
//             <TouchableOpacity style={styles.dropdownButton}>
//               <Text style={styles.dropdownText}>Size 7 ▼</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.dropdownButton}>
//               <Text style={styles.dropdownText}>Qty 1 ▼</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       {/* 2. COUPON SECTION */}
//       <View style={styles.couponCard}>
//         <Text style={styles.couponLabel}>Apply Coupon</Text>
//         <TouchableOpacity style={styles.selectButton}>
//           <Text style={styles.selectButtonText}>Select</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 3. PAYMENT DETAILS SECTION */}
//       <Text style={styles.sectionHeading}>Order Payment Details</Text>
      
//       <View style={styles.summaryCard}>
//         <View style={styles.row}>
//           <Text style={styles.rowLabel}>Order Amount</Text>
//           <Text style={styles.rowValue}>Rs: 7,000</Text>
//         </View>

//         <View style={styles.row}>
//           <View style={styles.labelWithAction}>
//             <Text style={styles.rowLabel}>Convenience</Text>
//             <TouchableOpacity><Text style={styles.inlineLink}>Know More</Text></TouchableOpacity>
//           </View>
//           <TouchableOpacity><Text style={styles.actionTextButton}>Apply Coupon</Text></TouchableOpacity>
//         </View>

//         <View style={styles.row}>
//           <Text style={styles.rowLabel}>Delivery</Text>
//           <Text style={styles.freeText}>Free</Text>
//         </View>

//         <View style={styles.divider} />

//         <View style={styles.totalRow}>
//           <Text style={styles.totalLabel}>Order Total</Text>
//           <Text style={styles.totalValue}>Rs: 7,000</Text>
//         </View>
//       </View>

//       {/* 4. BOTTOM CHECKOUT & EMI SECTION */}
//       <View style={styles.checkoutSection}>
//         <View style={styles.emiRow}>
//           <Text style={styles.emiLabel}>EMI Details available</Text>
//           <TouchableOpacity><Text style={styles.inlineLink}>View Plan</Text></TouchableOpacity>
//         </View>

//         <View style={styles.footerPricingRow}>
//           <View>
//             <Text style={styles.footerPrice}>Rs: 7,000</Text>
//             <TouchableOpacity><Text style={styles.inlineLink}>View Breakup</Text></TouchableOpacity>
//           </View>

//           <TouchableOpacity style={styles.paymentButton}  onPress={() => navigation.navigate('PaymentDetail')}>
//             <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
//           </TouchableOpacity>
//         </View>
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
//   // Product Card Styles
//   productCard: {
//     flexDirection: 'row',
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 12,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//   },
//   productImage: {
//     width: 90,
//     height: 90,
//     borderRadius: 8,
//     backgroundColor: '#eaeaea',
//   },
//   productDetails: {
//     flex: 1,
//     paddingLeft: 12,
//     justifyContent: 'center',
//   },
//   productTitle: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1a1a1a',
//     marginBottom: 4,
//   },
//   productDescription: {
//     fontSize: 13,
//     color: '#7a7a7a',
//     marginBottom: 10,
//   },
//   dropdownRow: {
//     flexDirection: 'row',
//     gap: 8,
//   },
//   dropdownButton: {
//     backgroundColor: '#f1f3f5',
//     borderWidth: 1,
//     borderColor: '#e9ecef',
//     borderRadius: 6,
//     paddingVertical: 4,
//     paddingHorizontal: 10,
//   },
//   dropdownText: {
//     fontSize: 12,
//     fontWeight: '500',
//     color: '#495057',
//   },
//   // Coupon Section Styles
//   couponCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 24,
//     elevation: 1,
//   },
//   couponLabel: {
//     fontSize: 15,
//     fontWeight: '600',
//     color: '#1a1a1a',
//   },
//   selectButton: {
//     backgroundColor: '#e3f2fd',
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 6,
//   },
//   selectButtonText: {
//     color: '#007aff',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   // Payment Details Styles
//   sectionHeading: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1a1a1a',
//     marginBottom: 12,
//   },
//   summaryCard: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 24,
//     elevation: 2,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 14,
//   },
//   labelWithAction: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   rowLabel: {
//     fontSize: 14,
//     color: '#4a4a4a',
//   },
//   rowValue: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#1a1a1a',
//   },
//   inlineLink: {
//     fontSize: 12,
//     color: '#007aff',
//     textDecorationLine: 'underline',
//   },
//   actionTextButton: {
//     fontSize: 13,
//     color: '#ff3b30',
//     fontWeight: '600',
//   },
//   freeText: {
//     fontSize: 14,
//     color: '#34c759',
//     fontWeight: '600',
//   },
//   divider: {
//     height: 1,
//     backgroundColor: '#eeeeee',
//     marginVertical: 12,
//   },
//   totalRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   totalLabel: {
//     fontSize: 16,
//     fontWeight: '700',
//     color: '#1a1a1a',
//   },
//   totalValue: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#000000',
//   },
//   // Footer Checkout Section Styles
//   checkoutSection: {
//     backgroundColor: '#ffffff',
//     borderRadius: 12,
//     padding: 16,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: -2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   emiRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//     backgroundColor: '#f8f9fa',
//     padding: 10,
//     borderRadius: 8,
//   },
//   emiLabel: {
//     fontSize: 13,
//     color: '#4a4a4a',
//   },
//   footerPricingRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   footerPrice: {
//     fontSize: 20,
//     fontWeight: '800',
//     color: '#000000',
//   },
//   paymentButton: {
//     backgroundColor: 'red',
//     paddingVertical: 14,
//     paddingHorizontal: 24,
//     borderRadius: 10,
//   },
//   paymentButtonText: {
//     color: '#ffffff',
//     fontSize: 15,
//     fontWeight: '700',
//   },
// });

// export default ShoppingCard;


import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const ShoppingCard = () => {
  const navigation = useNavigation();

  // Interactive UI State Management
  const [selectedSize, setSelectedSize] = useState(7);
  const [selectedQty, setSelectedQty] = useState(1);
  const baseItemPrice = 7000;

  // Calculative Properties
  const orderAmount = baseItemPrice * selectedQty;
  const deliveryFee = 0; 
  const totalOrderAmount = orderAmount + deliveryFee;

  // Dropdown Toggles (Simulated Actions)
  const handleSizePress = () => {
    Alert.alert("Select Size", "Choose your product fit:", [
      { text: "Size 6", onPress: () => setSelectedSize(6) },
      { text: "Size 7 (Selected)", onPress: () => setSelectedSize(7) },
      { text: "Size 8", onPress: () => setSelectedSize(8) },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  const handleQtyPress = () => {
    Alert.alert("Select Quantity", "Choose number of pairs:", [
      { text: "1", onPress: () => setSelectedQty(1) },
      { text: "2", onPress: () => setSelectedQty(2) },
      { text: "3", onPress: () => setSelectedQty(3) },
      { text: "Cancel", style: "cancel" }
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* 1. PRODUCT CARD SECTION */}
      <View style={styles.productCard}>
        <Image 
          source={require('./assets/womenshoes.jpg')} 
          style={styles.productImage} 
          resizeMode="cover"
        />

        <View style={styles.productDetails}>
          <Text style={styles.productTitle}>Women Shoes</Text>
          <Text style={styles.productDescription}>This shoes for women</Text>
          
          <View style={styles.dropdownRow}>
            <TouchableOpacity style={styles.dropdownButton} onPress={handleSizePress}>
              <Text style={styles.dropdownText}>Size {selectedSize} ▼</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.dropdownButton} onPress={handleQtyPress}>
              <Text style={styles.dropdownText}>Qty {selectedQty} ▼</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 2. COUPON SECTION */}
      <View style={styles.couponCard}>
        <Text style={styles.couponLabel}>Apply Coupon</Text>
        <TouchableOpacity style={styles.selectButton} onPress={() => Alert.alert("Coupons", "No active coupons available.")}>
          <Text style={styles.selectButtonText}>Select</Text>
        </TouchableOpacity>
      </View>

      {/* 3. PAYMENT DETAILS SECTION */}
      <Text style={styles.sectionHeading}>Order Payment Details</Text>
      
      <View style={styles.summaryCard}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Order Amount</Text>
          <Text style={styles.rowValue}>Rs: {orderAmount.toLocaleString()}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.labelWithAction}>
            <Text style={styles.rowLabel}>Convenience</Text>
            <TouchableOpacity onPress={() => Alert.alert("Convenience", "Standard platform convenience and packaging parameters apply.")}>
              <Text style={styles.inlineLink}>Know More</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => Alert.alert("Coupon", "Enter standard promotional codes here.")}>
            <Text style={styles.actionTextButton}>Apply Coupon</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>Delivery</Text>
          <Text style={styles.freeText}>Free</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Order Total</Text>
          <Text style={styles.totalValue}>Rs: {totalOrderAmount.toLocaleString()}</Text>
        </View>
      </View>

      {/* 4. BOTTOM CHECKOUT & EMI SECTION */}
      <View style={styles.checkoutSection}>
        <View style={styles.emiRow}>
          <Text style={styles.emiLabel}>EMI Details available</Text>
          <TouchableOpacity onPress={() => Alert.alert("EMI Plans", "Credit card installment options starting from 3 months.")}>
            <Text style={styles.inlineLink}>View Plan</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footerPricingRow}>
          <View>
            <Text style={styles.footerPrice}>Rs: {totalOrderAmount.toLocaleString()}</Text>
            <TouchableOpacity onPress={() => Alert.alert("Breakup", `Items: Rs ${orderAmount}\nDelivery: Free`)}>
              <Text style={styles.inlineLink}>View Breakup</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.paymentButton} onPress={() => navigation.navigate('PaymentDetail')}>
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </View>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
    backgroundColor: '#eaeaea',
  },
  productDetails: {
    flex: 1,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  productDescription: {
    fontSize: 13,
    color: '#7a7a7a',
    marginBottom: 10,
  },
  dropdownRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dropdownButton: {
    backgroundColor: '#f1f3f5',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  dropdownText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#495057',
  },
  couponCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 1,
  },
  couponLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  selectButton: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  selectButtonText: {
    color: '#007aff',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  labelWithAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rowLabel: {
    fontSize: 14,
    color: '#4a4a4a',
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  inlineLink: {
    fontSize: 12,
    color: '#007aff',
    textDecorationLine: 'underline',
  },
  actionTextButton: {
    fontSize: 13,
    color: '#ff3b30',
    fontWeight: '600',
  },
  freeText: {
    fontSize: 14,
    color: '#34c759',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#eeeeee',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  checkoutSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emiRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 8,
  },
  emiLabel: {
    fontSize: 13,
    color: '#4a4a4a',
  },
  footerPricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000000',
  },
  paymentButton: {
    backgroundColor: 'red',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  paymentButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default ShoppingCard;

