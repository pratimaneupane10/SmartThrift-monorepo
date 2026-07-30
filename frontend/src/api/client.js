import axios from 'axios';
import { Platform } from 'react-native';

const USE_LOCAL_BACKEND = false;

const LOCAL_URL =
  Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'  
    : 'http://localhost:5000';

const DEPLOYED_URL = 'https://smartthrift-monorepo.onrender.com';

const BASE_URL = USE_LOCAL_BACKEND ? LOCAL_URL : DEPLOYED_URL;

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
});

export function setAuthToken(token) {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export function clearAuthToken() {
  delete client.defaults.headers.common['Authorization'];
}

export default client;