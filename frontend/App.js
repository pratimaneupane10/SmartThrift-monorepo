import AppNavigator from './src/navigation/AppNavigator';
import { WishlistProvider } from './src/context/WishlistContext';
import { CartProvider } from './src/context/CartContext';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppNavigator />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}