


import { createContext } from 'react';

export const AuthContext = createContext({
  onLogout: () => console.warn('AuthContext Provider not found'),
});