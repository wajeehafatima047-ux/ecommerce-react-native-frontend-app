



// import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
// import React, { useState } from 'react'
// import { useNavigation } from '@react-navigation/native'
// import AsyncStorage from '@react-native-async-storage/async-storage'


// // USB debugging + `adb reverse tcp:3000 tcp:3000`  -> keep as 'http://localhost:3000'
// // Android emulator (AVD)                           -> 'http://10.0.2.2:3000'
// // Real device over Wi-Fi (no adb reverse)           -> 'http://<YOUR_PC_LAN_IP>:3000'
// const API_URL = 'http://localhost:3000/api/auth/login';

// const SignIn = (navigation, onLogin ) => {

//   const [identifier, setIdentifier] = useState('wajeeha') // can be email OR name
//   const [password, setPassword] = useState('123456')
//   const [showPassword, setShowPassword] = useState(false)
//   const [loading, setLoading] = useState(false)
//   // const navigation = useNavigation();

//   onLogin();

//  const handleLogin = async () => {
//   if (!identifier || !password) {
//     Alert.alert('Missing info', 'Please enter your username/email and password.');
//     return;
//   }

//   setLoading(true);
//   try {
//     const response = await fetch(API_URL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ identifier, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       Alert.alert('Login failed', data.message || 'Something went wrong');
//       return;
//     }

//     // Mongo id can come back as _id or id depending on your backend
//     const userId = data.user?._id || data.user?.id;

//     if (!userId) {
//       console.log('login response:', data); // check where the id is
//       Alert.alert('Error', 'Login worked but no user id was returned');
//       return;
//     }

//     // Save everything the other screens need
//     await AsyncStorage.setItem('userId', String(userId));
//     if (data.token) await AsyncStorage.setItem('token', data.token);
//     await AsyncStorage.setItem('user', JSON.stringify(data.user));

//     navigation.navigate('BottomTab');
//   } catch (error) {
//     console.error('Login error:', error);
//     Alert.alert(
//       'Network error',
//       'Could not reach the server. Check that the backend is running and adb reverse is set up.'
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (


//     <ScrollView style={{ height: '100%', backgroundColor: '#f3f0f8' }}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingTop: 80,
//           paddingBottom: 40
//         }}
//       >
//         <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>Sign In</Text>


//         <TextInput
//           placeholder="Username or email"
//           secureTextEntry={false}
//           autoCapitalize="none"
//           value={identifier}
//           onChangeText={setIdentifier}
//           style={{
//             borderWidth: 1,
//             borderColor: '#ddd',
//             width: '80%',
//             height: 50,
//             borderRadius: 10,
//             marginTop: 20,
//             backgroundColor: 'white',
//             paddingLeft: 15,
//           }}
//         />

//         {/* Password field with eye toggle */}
//         <View
//           style={{
//             width: '80%',
//             height: 50,
//             borderRadius: 10,
//             backgroundColor: 'white',
//             borderWidth: 1,
//             borderColor: '#ddd',
//             marginTop: 20,
//             flexDirection: 'row',
//             alignItems: 'center',
//           }}
//         >
//           <TextInput
//             placeholder="Password"
//             secureTextEntry={!showPassword}
//             value={password}
//             onChangeText={setPassword}
//             style={{
//               flex: 1,
//               height: 50,
//               paddingLeft: 15,
//             }}
//           />
//          <TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
//   <Text style={{ fontSize: 18, opacity: showPassword ? 1 : 0.5 }}>👁️</Text>
// </TouchableOpacity>
//         </View>

//         <TouchableOpacity
//           disabled={loading}
//           style={{
//             width: '80%',
//             height: 50,
//             backgroundColor: loading ? '#e08b8b' : 'red',
//             borderRadius: 10,
//             marginTop: 40,
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}

//           onPress={handleLogin}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
//           )}
//         </TouchableOpacity>


//         <TouchableOpacity
//           style={{ marginTop: 20, flexDirection: 'row' }}
//           onPress={() => navigation.navigate('SignUp')}
//         >
//           <Text style={{ color: 'grey', fontSize: 14 }}>account does not exist? </Text>
//           <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold' }}>SignUp</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>

//   )
// }

// export default SignIn



import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// USB debugging + `adb reverse tcp:3000 tcp:3000` -> 'http://localhost:3000'
// Android emulator (AVD)                          -> 'http://10.0.2.2:3000'
// Real device over Wi-Fi                          -> 'http://<YOUR_PC_LAN_IP>:3000'
const API_URL = 'http://localhost:3000/api/auth/login';

const SignIn = ({ navigation, onLogin }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Missing info', 'Please enter your username/email and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Login failed', data.message || 'Something went wrong');
        return;
      }

      const userId = data.user?._id || data.user?.id;
      if (!userId) {
        console.log('login response:', data);
        Alert.alert('Error', 'Login worked but no user id was returned');
        return;
      }

      await AsyncStorage.setItem('userId', String(userId));
      if (data.token) await AsyncStorage.setItem('token', data.token);
      await AsyncStorage.setItem('user', JSON.stringify(data.user));

      // Tell App.tsx we're logged in; it will swap to the BottomTab stack
      onLogin();
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert(
        'Network error',
        'Could not reach the server. Check that the backend is running and adb reverse is set up.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ height: '100%', backgroundColor: '#f3f0f8' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 80, paddingBottom: 40 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>Sign In</Text>

        <TextInput
          placeholder="Username or email"
          autoCapitalize="none"
          value={identifier}
          onChangeText={setIdentifier}
          style={{
            borderWidth: 1, borderColor: '#ddd', width: '80%', height: 50,
            borderRadius: 10, marginTop: 20, backgroundColor: 'white', paddingLeft: 15,
          }}
        />

        <View
          style={{
            width: '80%', height: 50, borderRadius: 10, backgroundColor: 'white',
            borderWidth: 1, borderColor: '#ddd', marginTop: 20,
            flexDirection: 'row', alignItems: 'center',
          }}
        >
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            value={password}
            onChangeText={setPassword}
            style={{ flex: 1, height: 50, paddingLeft: 15 }}
          />
          <TouchableOpacity style={{ paddingHorizontal: 15 }} onPress={() => setShowPassword((p) => !p)}>
            <Text style={{ fontSize: 18, opacity: showPassword ? 1 : 0.5 }}>👁️</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={loading}
          style={{
            width: '80%', height: 50, backgroundColor: loading ? '#e08b8b' : 'red',
            borderRadius: 10, marginTop: 40, justifyContent: 'center', alignItems: 'center',
          }}
          onPress={handleLogin}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Login</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 20, flexDirection: 'row' }} onPress={() => navigation.navigate('SignUp')}>
          <Text style={{ color: 'grey', fontSize: 14 }}>Account does not exist? </Text>
          <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold' }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignIn;