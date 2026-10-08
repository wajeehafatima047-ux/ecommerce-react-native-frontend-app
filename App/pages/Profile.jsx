// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useNavigation } from '@react-navigation/native';
// import { AuthContext } from '../pages/AuthContext';

// import { Platform } from 'react-native';


// const Profile = () => {
//   const navigation = useNavigation();
//   const { onLogout } = useContext(AuthContext);
//   const [user, setUser] = useState(null);

//   // Load the user saved at login
//   useEffect(() => {
//     const loadUser = async () => {
//       const stored = await AsyncStorage.getItem('user');
//       if (stored) setUser(JSON.parse(stored));
//     };
//     loadUser();
//   }, []);

//   const doLogout = async () => {
//   await onLogout();   // clears storage + switches to the logged-out stack
// };

// const handleLogout = () => {
//   console.log('1. Logout button pressed');
//   Alert.alert('Logout', 'Are you sure you want to log out?', [
//     { text: 'Cancel', style: 'cancel' },
//     {
//       text: 'Logout',
//       style: 'destructive',
//       onPress: async () => {
//         console.log('2. Confirmed');
//         await onLogout();
//         console.log('3. onLogout finished');
//       },
//     },
//   ]);
// };
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* User info */}
//       <View style={styles.profile}>
//         <Text style={styles.name}>{user?.name || 'Guest'}</Text>
//         <Text style={styles.email}>{user?.email || ''}</Text>
//       </View>

//       {/* Options */}
//       <View style={styles.card}>
//         <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('WishList')}>
//           <Text style={styles.rowText}>❤️  My Wishlist</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Cart')}>
//           <Text style={styles.rowText}>🛒  My Cart</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.row}
//           onPress={() => Alert.alert('My Orders', 'Coming soon')}
//         >
//           <Text style={styles.rowText}>📦  My Orders</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Logout */}
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Logout</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
  
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#f3f0f8', padding: 16 },
//   profile: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//     marginBottom: 16,
//   },
//   name: { fontSize: 20, fontWeight: 'bold', color: 'black' },
//   email: { fontSize: 14, color: 'grey', marginTop: 4 },
//   card: { backgroundColor: 'white', borderRadius: 12, overflow: 'hidden' },
//   row: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   rowText: { fontSize: 16, color: 'black' },
//   logoutButton: {
//     backgroundColor: 'red',
//     height: 50,
//     borderRadius: 10,
//     marginTop: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   logoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
// });

// export default Profile;



import React, { useEffect, useState } from 'react';
import {
  View, Text, TouchableOpacity, Alert, StyleSheet, SafeAreaView, Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { triggerLogout } from '../authEvents'; // CHANGED: replaces AuthContext (fix path if needed)

const Profile = () => {
  const navigation = useNavigation();
  // CHANGED: removed useContext(AuthContext)
  const [user, setUser] = useState(null);

  // Load the user saved at login
  useEffect(() => {
    const loadUser = async () => {
      const stored = await AsyncStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    };
    loadUser();
  }, []);

  const doLogout = async () => {
    console.log('2. Confirmed');
    await triggerLogout(); // CHANGED
    console.log('3. Logout finished');
  };

  const handleLogout = () => {
    console.log('1. Logout button pressed');

    // Alert buttons don't work in a browser, so use confirm on web
    if (Platform.OS === 'web') {
      if (window.confirm('Are you sure you want to log out?')) doLogout();
      return;
    }

    Alert.alert('Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: doLogout },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* User info */}
      <View style={styles.profile}>
        <Text style={styles.name}>{user?.name || 'Guest'}</Text>
        <Text style={styles.email}>{user?.email || ''}</Text>
      </View>

      {/* Options */}
      <View style={styles.card}>
        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('WishList')}>
          <Text style={styles.rowText}>❤️  My Wishlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('Cart')}>
          <Text style={styles.rowText}>🛒  My Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.row}
          onPress={() => navigation.navigate("OrderHistory")}
        >
          <Text style={styles.rowText}>📦  My Orders</Text>
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f0f8', padding: 16 },
  profile: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  name: { fontSize: 20, fontWeight: 'bold', color: 'black' },
  email: { fontSize: 14, color: 'grey', marginTop: 4 },
  card: { backgroundColor: 'white', borderRadius: 12, overflow: 'hidden' },
  row: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  rowText: { fontSize: 16, color: 'black' },
  logoutButton: {
    backgroundColor: 'red',
    height: 50,
    borderRadius: 10,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default Profile;