


// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const API_URL = 'https://ecommerce-backend-4l55.onrender.com';

// const api = axios.create({
//   baseURL: API_URL,
//   timeout: 60000, // 60s, gives the free Render server time to wake up
// });

// api.interceptors.request.use(async (config) => {
//   const token = await AsyncStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// export default api;



import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
 
export const API_URL = 'https://ecommerce-backend-4l55.onrender.com';
 
// Cloudinary images are full URLs; old images are /uploads/... paths
export const getImageUrl = (image) => {
  if (!image) return null;
  return image.startsWith('http') ? image : `${API_URL}${image}`;
};
 
const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60s, gives the free Render server time to wake up
});
 
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
 
export default api;
 