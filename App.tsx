



// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import  {AuthContext} from './App/pages/AuthContext';

// import SignUp from './App/pages/signUp';
// import SignIn from './App/pages/signIn';
// import ForgotPassword from './App/pages/ForgotPassword';
// import BottomTab from './App/pages/Tabs/BottomTab';
// import CheckOut from './App/pages/CheckOut';
// import DetailsScreen from './App/pages/DetailsScreen';
// import ShoppingCard from './App/pages/ShoppingCard';
// import PaymentDetail from './App/pages/PaymentDetail';
// import ProductDetail from "./App/pages/ProductDetail"



// const Stack = createNativeStackNavigator();

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [checking, setChecking] = useState(true);

//   // Restore session on app start
//   useEffect(() => {
//     (async () => {
//       try {
//         const token = await AsyncStorage.getItem('token');
//         const userId = await AsyncStorage.getItem('userId');
//         if (token || userId) setIsLoggedIn(true);
//       } finally {
//         setChecking(false);
//       }
//     })();
//   }, []);

//   if (checking) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//  return (

  
// <AuthContext.Provider value={{ onLogout: () => setIsLoggedIn(false) }}>

//     <View style={{ flex: 1 }}>
//       <NavigationContainer>
//         {/* Adding a conditional key forces a complete navigation clean-slate reset */}
//         <Stack.Navigator key={isLoggedIn ? "auth" : "unauth"}>
//           {isLoggedIn ? (
//             <>
//               <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
//               <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{headerShown:false}} />
//               <Stack.Screen name="CheckOut" component={CheckOut} options={{headerShown:false}}/>
//               <Stack.Screen name="ShoppingCard" component={ShoppingCard} />
//               <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
//               <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
//             </>
//           ) : (
//             <>
//               {/* This will now reliably become the absolute initial fallback screen */}
//               <Stack.Screen name="SignIn" options={{ headerShown: false }}>
//                 {(props) => <SignIn {...props} onLogin={() => setIsLoggedIn(true)} />}
//               </Stack.Screen>
//               <Stack.Screen name="SignUp" component={SignUp} />
//               <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//             </>
//           )}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </View>
//   </AuthContext.Provider>
// );

// }




import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from './App/pages/AuthContext';

import SignUp from './App/pages/signUp';
import SignIn from './App/pages/signIn';
import ForgotPassword from './App/pages/ForgotPassword';
import BottomTab from './App/pages/Tabs/BottomTab';
import CheckOut from './App/pages/CheckOut';
import DetailsScreen from './App/pages/DetailsScreen';
import ShoppingCard from './App/pages/ShoppingCard';
import PaymentDetail from './App/pages/PaymentDetail';
import ProductDetail from './App/pages/ProductDetail';
import { setLogoutHandler } from './App/authEvents';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);

  // Restore session on app start
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');
        if (token || userId) setIsLoggedIn(true);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  useEffect(() => {
  setLogoutHandler(async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('user');
    } catch (e) {
      console.log('Logout storage error:', e);
    } finally {
      setIsLoggedIn(false);
    }
  });
}, []);

  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // CHANGED: logout now clears storage here, then switches to the logged-out stack
  const authValue = {
    onLogout: async () => {
      await AsyncStorage.multiRemove(['token', 'userId', 'user']);
      setIsLoggedIn(false);
    },

  };

  return (
    <AuthContext.Provider value={authValue}> {/* CHANGED */}
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          {/* The key forces a complete navigation reset when login state changes */}
          <Stack.Navigator
            key={isLoggedIn ? 'auth' : 'unauth'}
            initialRouteName={isLoggedIn ? 'BottomTab' : 'SignUp'} // CHANGED: logout lands on SignUp
          >
            {isLoggedIn ? (
              <>
                <Stack.Screen name="BottomTab" component={BottomTab} options={{ headerShown: false }} />
                <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name="CheckOut" component={CheckOut} options={{ headerShown: false }} />
                <Stack.Screen name="ShoppingCard" component={ShoppingCard} />
                <Stack.Screen name="PaymentDetail" component={PaymentDetail} />
                <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
              </>
            ) : (
              <>
                <Stack.Screen name="SignIn" options={{ headerShown: false }}>
                  {(props) => <SignIn {...props} onLogin={() => setIsLoggedIn(true)} />}
                </Stack.Screen>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </AuthContext.Provider>
  );
}