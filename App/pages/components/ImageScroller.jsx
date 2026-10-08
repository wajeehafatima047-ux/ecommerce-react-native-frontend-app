// import React from 'react';
// import { ScrollView, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');
// const CARD_SIZE = width * 0.4; 

// // 1. Reference your local images using require()
// const SCROLLER_DATA = [
//   { id: '1', title: 'T Shirts', imageSource: require('../assets/tshirt2.jpg')},
//   { id: '2', title: 'Shoes', imageSource: require('../assets/shoes.jpg'),},
//   { id: '3', title: 'Women Shoes', imageSource: require('../assets/womenshoes.jpg'), },
//   { id: '4', title: 'T shirt', imageSource: require('../assets/tshirt4.jpg'), },
// ];

// const ImageScroller = () => {
//   const handlePress = (title) => {
//     console.log(`Pressed ${title}`);
//   };

//   return (
//     <ScrollView 
//       horizontal 
//       showsHorizontalScrollIndicator={false} 
//       snapToInterval={CARD_SIZE + 24} 
//       decelerationRate="fast"
//       contentContainerStyle={styles.container}
//     >
//       {SCROLLER_DATA.map((item) => (
//         <TouchableOpacity 
//           key={item.id} 
//           style={styles.card} 
//           activeOpacity={0.7} 
//           onPress={() => handlePress(item.title)}
//         >
//           {/* 2. Pass the require reference directly to the source prop */}
//           <Image source={item.imageSource} style={styles.circularImage} />
//           <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
//         </TouchableOpacity>
//       ))}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 15,
//     gap: 24, 
//   },
//   card: {
//     width: CARD_SIZE,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   circularImage: {
//     width: CARD_SIZE - 20,
//     height: CARD_SIZE - 20,
//     borderRadius: (CARD_SIZE - 20) / 2, 
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#333333',
//     textAlign: 'center',
//   },
// });

// export default ImageScroller;


import React from 'react';
import { ScrollView, TouchableOpacity, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
// 1. Reduced multiplier from 0.4 to 0.25 for smaller item sizing
const CARD_SIZE = width * 0.25; 

const SCROLLER_DATA = [
  { id: '1', title: 'T Shirts', imageSource: require('../assets/tshirt2.jpg')},
  { id: '2', title: 'Shoes', imageSource: require('../assets/shoes.jpg')},
  { id: '3', title: 'Women Shoes', imageSource: require('../assets/womenshoes.jpg')},
  { id: '4', title: 'T shirt', imageSource: require('../assets/tshirt4.jpg')},
];

const ImageScroller = () => {
  const handlePress = (title) => {
    console.log(`Pressed ${title}`);
  };

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      // 2. Updated to match the new dynamic smaller size + gap spacing
      snapToInterval={CARD_SIZE + 16} 
      decelerationRate="fast"
      contentContainerStyle={styles.container}
    >
      {SCROLLER_DATA.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.card} 
          activeOpacity={0.7} 
          onPress={() => handlePress(item.title)}
        >
          <Image source={item.imageSource} style={styles.circularImage} />
          <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    // 3. Reduced gap slightly to look proportional with smaller circles
    gap: 16, 
  },
  card: {
    width: CARD_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularImage: {
    // 4. Removed the inner subtraction to maximize the circle footprint inside the smaller card bounds
    width: CARD_SIZE,
    height: CARD_SIZE,
    borderRadius: CARD_SIZE / 2, 
    marginBottom: 8,
  },
  title: {
    // 5. Scaled font down slightly to cleanly match the smaller layout size
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
});

export default ImageScroller;
