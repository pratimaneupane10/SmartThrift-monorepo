import { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest, registerRequest } from '../api/authApi';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,               setUser]               = useState(null);
  const [isLoggedIn,         setIsLoggedIn]         = useState(false);
  const [isNewUser,          setIsNewUser]           = useState(false);
  const [authLoading,        setAuthLoading]        = useState(false);
  const [authError,          setAuthError]          = useState('');
  const [userPreferences,    setUserPreferences]     = useState({
    styles:     [],
    age:        null,
    bodyType:   null,
    categories: [],
  });

  // Calls POST /api/auth/login on the real backend.
  async function login(email, password) {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await loginRequest({ email, password });
      await AsyncStorage.setItem('token', data.token);
      setUser({ id: data._id, name: data.name, email: data.email, role: data.role, avatar: null });
      setIsLoggedIn(true);
      setIsNewUser(false);
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    } finally {
      setAuthLoading(false);
    }
  }

  // Calls POST /api/auth/register on the real backend.
  async function register(name, email, password) {
    setAuthLoading(true);
    setAuthError('');
    try {
      const data = await registerRequest({ name, email, password });
      await AsyncStorage.setItem('token', data.token);
      setUser({ id: data._id, name: data.name, email: data.email, role: data.role, avatar: null });
      setIsLoggedIn(true);
      setIsNewUser(true);
      return { success: true };
    } catch (error) {
      setAuthError(error.message);
      return { success: false, message: error.message };
    } finally {
      setAuthLoading(false);
    }
  }

  function completeOnboarding(preferences) {
    if (preferences) {
      setUserPreferences(preferences);
    }
    setIsNewUser(false);
  }

  async function logout() {
    await AsyncStorage.removeItem('token');
    setUser(null);
    setIsLoggedIn(false);
    setIsNewUser(false);
    setUserPreferences({ styles: [], age: null, bodyType: null, categories: [] });
  }

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn,
      isNewUser,
      authLoading,
      authError,
      userPreferences,
      login,
      register,
      logout,
      completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
