

// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// // 1. Import useNavigation hook
// import { useNavigation } from '@react-navigation/native';

// const Card = ({ title, description, imageUrl }) => {
//   // 2. Initialize the navigation hook
//   const navigation = useNavigation();

//   // 3. Handle navigation to your 'Cart' screen
//   const handlePress = () => {
//     navigation.navigate('Cart', {
//       productTitle: title,
//       productDescription: description,
//       productImage: imageUrl,
//     });
//   };

//   return (
//     <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
//       <Image source={imageUrl} style={styles.cardImage} resizeMode="cover" />
      
//       <View style={styles.cardDetails}>
//         <Text style={styles.cardTitle}>{title}</Text>
//         <Text style={styles.cardDescription}>{description}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   cardContainer: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     overflow: 'hidden',
//     marginTop: 20,
//     elevation: 3, 
//     shadowColor: '#000', 
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     flex: 1,
//   },
//   cardImage: {
//     width: '100%',     
//     height: 150,        
//   },
//   cardDetails: {
//     padding: 16,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1c1c1e',
//     marginBottom: 4,
//   },
//   cardDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default CheckoutCard;

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// 1. Import useNavigation hook
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native/types_generated/index';

const CheckoutCard = ({ title, description, imageUrl, Button1, Button2 }) => {
  // 2. Initialize the navigation hook
  const navigation = useNavigation();

  // 3. Handle navigation to your 'Cart' screen
  const handlePress = () => {
    navigation.navigate('ShoppingCard', {
      productTitle: title,
      productDescription: description,
      productImage: imageUrl,
      Button:Button1,
      Button:Button2,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
    <View style={styles.cardContainer}>
      <Image source={imageUrl} style={styles.cardImage} resizeMode="cover" />
      
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle}>{title}</Text>
                <View style={styles.buttonsRow}>
          <TouchableOpacity style={[styles.colorButton, styles.blackButton]}>
            <Text style={styles.blackButtonText}>Black</Text>
            {Button1}
          </TouchableOpacity>

          <TouchableOpacity style={[styles.colorButton, styles.redButton]}>
            <Text style={styles.redButtonText}>Red</Text>
            {Button2}
          </TouchableOpacity>
        </View>

        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </View>

    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 20,
    elevation: 3, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',// تصویر اور ٹیکسٹ کو آمنے سامنے رکھنے کے لیے
    alignItems: 'center',
  },
  cardImage: {
    width: 100, 
    height: 100,
    borderRadius: 8,
    marginLeft: 12,
  },
  cardDetails: {
    flex: 1, 
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  /* بٹنز کو آمنے سامنے لانے کا اسٹائل */
  buttonsRow: {
    flexDirection: 'row', 
    marginVertical: 8,
  },
  colorButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginRight: 10,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  blackButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  redButton: {
    backgroundColor: '#ff3b30',
    borderColor: '#ff3b30',
  },
  blackButtonText: {
    color: '#fff',
    fontWeight: '640',
    fontSize: 14,
  },
  redButtonText: {
    color: '#fff',
    fontWeight: '640',
    fontSize: 14,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default CheckoutCard;
