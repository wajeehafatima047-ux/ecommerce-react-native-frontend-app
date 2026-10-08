

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

// export default Card;



import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ title, description, imageUrl, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress} activeOpacity={0.8}>
      <Image source={imageUrl} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardDetails}>
        <Text style={styles.cardTitle} numberOfLines={1}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
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
    flex: 1,
  },
  cardImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f2f2f2',
  },
  cardDetails: {
    padding: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1c1c1e',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Card;