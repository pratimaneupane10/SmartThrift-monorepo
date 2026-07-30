import { createContext, useContext, useState } from 'react';
import client, { setAuthToken, clearAuthToken } from '../api/client';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,            setUser]            = useState(null);
  const [isLoggedIn,      setIsLoggedIn]      = useState(false);
  const [isNewUser,       setIsNewUser]       = useState(false);
  const [justLoggedOut,   setJustLoggedOut]   = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    styles: [], age: null, bodyType: null, categories: [],
  });

  /** Helper: set user state from backend response */
  function applyUserData(data, method = 'email') {
    const isBuyer = data.role === 'buyer';
    const shouldShowBuyerOnboarding = isBuyer && !data.hasCompletedOnboarding;

    setAuthToken(data.token);
    setUser({
      _id: data._id,
      email: data.email,
      name: data.name,
      role: data.role,
      avatar: data.profilePicture || null,
      loginMethod: method,
      token: data.token,
    });
    setIsNewUser(shouldShowBuyerOnboarding);
    setIsLoggedIn(true);
    setJustLoggedOut(false);
  }

  /**
   * Log in against the backend.
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  async function login(email, password, role = 'buyer', method = 'email') {
    try {
      const res = await client.post('/api/auth/login', {
        email,
        password,
        expectedRole: role,
      });
      console.log('[AuthContext] Login response data:', JSON.stringify(res.data));
      console.log('[AuthContext] Role from backend:', res.data.role);
      applyUserData(res.data, method);
      return { success: true };
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.';
      console.log('[AuthContext] Login error:', msg);
      return { success: false, message: msg };
    }
  }

  /**
   * Register a new account via the backend.
   * @returns {Promise<{success: boolean, message?: string}>}
   */
  async function register(name, email, password, role = 'buyer') {
    try {
      const res = await client.post('/api/auth/register', {
        name,
        email,
        password,
        role,
      });
      applyUserData(res.data, 'email');
      return { success: true };
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Registration failed. Please try again.';
      return { success: false, message: msg };
    }
  }

  function updateUser(updates) {
    setUser((prev) => ({ ...prev, ...updates }));
  }

  function completeOnboarding(preferences) {
    if (preferences) setUserPreferences(preferences);
    setIsNewUser(false);
  }

  function logout() {
    clearAuthToken();
    setUser(null);
    setIsLoggedIn(false);
    setIsNewUser(false);
    setJustLoggedOut(true);
    setUserPreferences({ styles: [], age: null, bodyType: null, categories: [] });
  }

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn, isNewUser, userPreferences, justLoggedOut,
      login, register, logout, updateUser, completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}