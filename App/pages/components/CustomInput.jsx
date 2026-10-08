import { View, Text,TextInput, ImageBackground,StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({lable,value,onChangeText,placeholder,secureTextEntery }) => {
  return (
    <View style={styles.container}>

      {lable&& <Text style={styles.lable}>{lable}</Text>}
      <TextInput 
      style={styles.input} 
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntery}
      placeholderTextColor='#888'
      
      />

      
    </View>
  )
}


const styles=StyleSheet.create({

  container:{
    width:'100%'
  
  },

  lable:{

    fontSize:14,
    fontWeight:'600',
    color:'#333',
    marginBottom:5,
  },

input: {
  width: "100%",
  height: 48,
  borderWidth: 1,
  borderColor: '#CCC',
  borderRadius: 8,
  paddingHorizontal: 12,   // fixed
  fontSize: 16,
  color: '#000',
  // removed invalid ImageBackground line
}
})

export default CustomInput