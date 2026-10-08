
// import React from 'react';

// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import AntDesign from '@react-native-vector-icons/ant-design';
// import EvilIcons from '@react-native-vector-icons/evil-icons';
// import Entypo from '@react-native-vector-icons/entypo';

// import Home from '../Home';
// import Cart from '../Cart';


// import Setting from '../Setting';
// import productDetail from '../productDetail';

// const Tab = createBottomTabNavigator();

// export default function BottomTab() {
//   return (
//     <Tab.Navigator screenOptions={{ headerShown: false }}>
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <AntDesign name="home" size={24} color={color} />
//           ),
//         }}
//       />

//       <Tab.Screen
      
//       name="Product Detail" 
//       component={productDetail}
//       options={{tabBarIcon:({color})=>(

//           <Entypo name="list" color="#000" size={24} />
//       )}}
      
      
//       />

//       <Tab.Screen
//         name="Cart"
//         component={Cart}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <EvilIcons name="cart" color={color} size={24} />
//           ),
//         }}
//       />

   
//       <Tab.Screen
//         name="Setting"
//         component={Setting}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <AntDesign name="setting" color={"#000"} size={24} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//   );
// }



import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesign from '@react-native-vector-icons/ant-design';
import EvilIcons from '@react-native-vector-icons/evil-icons';

import Home from '../Home';
import Cart from '../Cart';


import Profile from "../Profile"
import OrderHistory from "../OrderHistory"

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ color }) => <EvilIcons name="cart" color={color} size={24} />,
        }}
      />

     <Tab.Screen
  name="OrderHistory"
  component={OrderHistory}
  options={{
    title: 'My Orders', // label shown under the icon
    tabBarIcon: ({ color }) => <AntDesign name="profile" color={color} size={24} />, // CHANGED
  }}
/>

    

       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => <AntDesign name="user" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
}
