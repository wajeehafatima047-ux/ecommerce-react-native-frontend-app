



// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Real device over USB + `adb reverse tcp:3000 tcp:3000`  -> keep as 'http://localhost:3000'
// // Android emulator (AVD)                                  -> 'http://10.0.2.2:3000'
// // Real device over Wi-Fi (no adb reverse)                 -> 'http://<YOUR_PC_LAN_IP>:3000'
// const API_URL = 'http://localhost:3000/api/auth/signup';

// const Signup = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const navigation = useNavigation();

//   const handleSignup = async () => {
//     // basic client-side checks so you don't even hit the network for obvious mistakes
//     if (!name || !email || !password || !confirmPassword) {
//       Alert.alert('Missing info', 'Please fill in all fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       Alert.alert('Password mismatch', 'Passwords do not match.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(API_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, confirmPassword }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         // backend sends { message: '...' } on 400/409/500
//         Alert.alert('Signup failed', data.message || 'Something went wrong');
//         return;
//       }

//       // Success: store the JWT so the user is "logged in" right after signup
//       await AsyncStorage.setItem('token', data.token);
//       await AsyncStorage.setItem('user', JSON.stringify(data.user));

//       Alert.alert('Success', 'Account created!');
//       navigation.navigate('SignIn'); // or navigate straight into your app if you prefer
//     } catch (error) {
//       // this branch fires for network errors (wrong IP, server down, no internet)
//       console.error('Signup error:', error);
//       Alert.alert(
//         'Network error',
//         'Could not reach the server. Check that the backend is running and that API_BASE_URL in config/api.js is correct for your device.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={{ height: '100%', backgroundColor: '#f3f0f8' }}>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: 'center',
//           alignItems: 'center',
//           paddingTop: 80,
//           paddingBottom: 40,
//         }}
//       >
//         <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'black' }}>Sign Up</Text>
//         <Text style={{ fontSize: 16, color: 'grey', marginTop: 5 }}>Create an account</Text>

//         <TextInput
//           placeholder="Full name"
//           value={name}
//           onChangeText={setName}
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

//         <TextInput
//           placeholder="Email"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={setEmail}
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

//         <TextInput
//           placeholder="Password"
//           secureTextEntry={true}
//           value={password}
//           onChangeText={setPassword}
//           style={{
//             borderWidth: 1,
//             borderColor: '#ddd',
//             width: '80%',
//             height: 50,
//             borderRadius: 10,
//             backgroundColor: 'white',
//             marginTop: 20,
//             paddingLeft: 15,
//           }}
//         />

//         <TextInput
//           placeholder="Confirm password"
//           secureTextEntry={true}
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           style={{
//             borderWidth: 1,
//             borderColor: '#ddd',
//             width: '80%',
//             height: 50,
//             borderRadius: 10,
//             backgroundColor: 'white',
//             marginTop: 20,
//             paddingLeft: 15,
//           }}
//         />

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
//           onPress={handleSignup}
//         >
//           {loading ? (
//             <ActivityIndicator color="white" />
//           ) : (
//             <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
//               Create Account
//             </Text>
//           )}
//         </TouchableOpacity>

//         <TouchableOpacity
//   style={{ marginTop: 20, flexDirection: 'row' }}
//   onPress={() => navigation.navigate('SignIn')}
// >
//   <Text style={{ color: 'grey', fontSize: 14 }}>Already have an account? </Text>
//   <Text style={{ color: 'red', fontSize: 14, fontWeight: 'bold' }}>Login</Text>
// </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// export default Signup;



import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://localhost:3000/api/auth/signup';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // States to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigation = useNavigation();

  const handleSignup = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Missing info', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Signup failed', data.message || 'Something went wrong');
        return;
      }

 

      Alert.alert('Success', 'Account created!');
      navigation.navigate('SignIn');
    } catch (error) {
      console.error('Signup error:', error);
      Alert.alert(
        'Network error',
        'Could not reach the server. Check that the backend is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Text style={styles.subtitle}>Create an account</Text>

        {/* Full Name Input */}
        <TextInput
          placeholder="Full name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        {/* Password Input Wrapper */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.inputField}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Text style={[styles.eyeIcon, { opacity: showPassword ? 1 : 0.5 }]}>👁️</Text>
          </TouchableOpacity>
        </View>

        {/* Confirm Password Input Wrapper */}
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.inputField}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowConfirmPassword((prev) => !prev)}
          >
            <Text style={[styles.eyeIcon, { opacity: showConfirmPassword ? 1 : 0.5 }]}>👁️</Text>
          </TouchableOpacity>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          disabled={loading}
          style={[styles.button, { backgroundColor: loading ? '#e08b8b' : 'red' }]}
          onPress={handleSignup}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.linkContainer}
          onPress={() => navigation.navigate('SignIn')}
        >
          <Text style={styles.linkText}>Already have an account? </Text>
          <Text style={styles.linkAction}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#f3f0f8',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: 'grey',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'white',
    paddingLeft: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    width: '80%',
    height: 50,
    borderRadius: 10,
    marginTop: 20,
    backgroundColor: 'white',
    position: 'relative',
  },
  inputField: {
    flex: 1,
    height: '100%',
    paddingLeft: 15,
    paddingRight: 50,
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    height: '100%',
    justifyContent: 'center',
  },
  eyeIcon: {
    fontSize: 18,
  },
  button: {
    width: '80%',
    height: 50,
    borderRadius: 10,
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkContainer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  linkText: {
    color: 'grey',
    fontSize: 14,
  },
  linkAction: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Signup;