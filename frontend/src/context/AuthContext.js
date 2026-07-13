import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user,            setUser]            = useState(null);
  const [isLoggedIn,      setIsLoggedIn]      = useState(false);
  const [isNewUser,       setIsNewUser]       = useState(false);
  const [userPreferences, setUserPreferences] = useState({
    styles: [], age: null, bodyType: null, categories: [],
  });

  function login(email, password, role, method = 'email') {
    // Name from email for google, prompt user to set for email signup
    const defaultNames = {
      seller: 'Seller User',
      admin:  'Admin User',
      buyer:  '',
    };
    const name = method === 'google'
      ? email.split('@')[0].replace(/[^a-zA-Z\s]/g, ' ').trim()
      : defaultNames[role];

    setUser({ email, name, role, avatar: null, loginMethod: method });
    setIsNewUser(true);
    setIsLoggedIn(true);
  }

  function updateUser(updates) {
    setUser((prev) => ({ ...prev, ...updates }));
  }

  function completeOnboarding(preferences) {
    if (preferences) setUserPreferences(preferences);
    setIsNewUser(false);
  }

  function logout() {
    setUser(null);
    setIsLoggedIn(false);
    setIsNewUser(false);
    setUserPreferences({ styles: [], age: null, bodyType: null, categories: [] });
  }

  return (
    <AuthContext.Provider value={{
      user, isLoggedIn, isNewUser, userPreferences,
      login, logout, updateUser, completeOnboarding,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}