import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  return (
    <ScrollView style={{ height: '100%' }}>
      <Text>Forgot Password?</Text>

      <TextInput
        placeholder="Enter your email address"
        secureTextEntry={false}
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          borderColor: '#ddd',
          width: '80%',
          height: 50,
          borderRadius: 10,
          marginTop: 20,
          backgroundColor: 'white',
          paddingLeft: 15,
        }}
      ></TextInput>


      <Text style={{color:"grey", }}>We will send you a message to set or reset your new password</Text>

      <TouchableOpacity
        style={{
          width: '80%',
          height: 50,
          backgroundColor: 'red',
          borderRadius: 10,
          marginTop: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
          Submit
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ForgotPassword;
