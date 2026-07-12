// Central place to configure the backend URL.
//
// IMPORTANT (physical device / emulator):
// "localhost" refers to the phone/emulator itself, NOT your computer.
// Replace this with your computer's LAN IP address when testing on
// a real device or the Expo Go app, e.g. "http://192.168.1.42:5000".
//
// Find your LAN IP:
//   Windows:  ipconfig            (look for "IPv4 Address")
//   Mac/Linux: ifconfig | grep inet
//
// - Android emulator (AVD): use "http://10.0.2.2:5000" (special alias to host machine)
// - iOS simulator: "http://localhost:5000" works fine
// - Expo Go on a real phone: use your computer's LAN IP, phone and computer must be on the same Wi-Fi

export const API_BASE_URL = 'http://localhost:5000';

export const API_ROUTES = {
  auth: `${API_BASE_URL}/api/auth`,
  products: `${API_BASE_URL}/api/products`,
  orders: `${API_BASE_URL}/api/orders`,
  wishlist: `${API_BASE_URL}/api/wishlist`,
  requests: `${API_BASE_URL}/api/requests`,
  notifications: `${API_BASE_URL}/api/notifications`,
  chat: `${API_BASE_URL}/api/chat`,
  admin: `${API_BASE_URL}/api/admin`,
  recommendations: `${API_BASE_URL}/api/recommendations`,
  analytics: `${API_BASE_URL}/api/analytics`,
};
