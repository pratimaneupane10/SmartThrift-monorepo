import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import WelcomeScreen from '../screens/buyer/WelcomeScreen';
import LoginScreen from '../screens/buyer/LoginScreen';
import SignUpScreen from '../screens/buyer/SignUpScreen';
import SellerLoginScreen from '../screens/seller/SellerLoginScreen';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import StylePreferenceScreen from '../screens/buyer/StylePreferenceScreen';

import MainTabs from './MainTabs';
import ProductDetailScreen from '../screens/buyer/ProductDetailScreen';
import CartScreen from '../screens/buyer/CartScreen';
import CheckoutScreen from '../screens/buyer/CheckoutScreen';
import NotificationsScreen from '../screens/buyer/NotificationsScreen';
import SearchResultsScreen from '../screens/buyer/SearchResultsScreen';
import SettingsScreen from '../screens/buyer/SettingsScreen';
import HelpScreen from '../screens/buyer/HelpScreen';
import ChatScreen from '../screens/buyer/ChatScreen';
import TrackOrderScreen from '../screens/buyer/TrackOrderScreen';
import ReviewScreen from '../screens/buyer/ReviewScreen';
import SellerProfileScreen from '../screens/seller/SellerProfileScreen';

import SellerTabs from './SellerTabs';
import CreateListingScreen from '../screens/seller/CreateListingScreen';
import ListingPreviewScreen from '../screens/seller/ListingPreviewScreen';
import ListingPublishedScreen from '../screens/seller/ListingPublishedScreen';
import SellerEarningsScreen from '../screens/seller/SellerEarningsScreen';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminListingsScreen from '../screens/admin/AdminListingsScreen';
import AdminReportsScreen from '../screens/admin/AdminReportsScreen';

const Stack = createNativeStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome"      component={WelcomeScreen} />
      <Stack.Screen name="Login"        component={LoginScreen} />
      <Stack.Screen name="SignUp"       component={SignUpScreen} />
      <Stack.Screen name="Register"     component={SignUpScreen} />
      <Stack.Screen name="SellerLogin"  component={SellerLoginScreen} />
      <Stack.Screen name="AdminLogin"   component={AdminLoginScreen} />
    </Stack.Navigator>
  );
}

function OnboardingScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="StylePreference" component={StylePreferenceScreen} />
    </Stack.Navigator>
  );
}

function BuyerScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs"      component={MainTabs} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen name="Cart"          component={CartScreen} />
      <Stack.Screen name="Checkout"      component={CheckoutScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
      <Stack.Screen name="Settings"      component={SettingsScreen} />
      <Stack.Screen name="Help"          component={HelpScreen} />
      <Stack.Screen name="Chat"          component={ChatScreen} />
      <Stack.Screen name="TrackOrder"    component={TrackOrderScreen} />
      <Stack.Screen name="Review"        component={ReviewScreen} />
      <Stack.Screen name="SellerProfile" component={SellerProfileScreen} />
    </Stack.Navigator>
  );
}

function SellerScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SellerTabs"       component={SellerTabs} />
      <Stack.Screen name="CreateListing"    component={CreateListingScreen} />
      <Stack.Screen name="ListingPreview"   component={ListingPreviewScreen} />
      <Stack.Screen name="ListingPublished" component={ListingPublishedScreen} />
      <Stack.Screen name="SellerEarnings"   component={SellerEarningsScreen} />
      <Stack.Screen name="Chat"             component={ChatScreen} />
      <Stack.Screen name="Settings"         component={SettingsScreen} />
      <Stack.Screen name="Help"             component={HelpScreen} />
    </Stack.Navigator>
  );
}

function AdminScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
      <Stack.Screen name="AdminUsers"     component={AdminUsersScreen} />
      <Stack.Screen name="AdminListings"  component={AdminListingsScreen} />
      <Stack.Screen name="AdminReports"   component={AdminReportsScreen} />
      <Stack.Screen name="Settings"       component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoggedIn, isNewUser } = useAuth();

  function renderScreens() {
    if (!isLoggedIn)             return <AuthScreens />;
    if (user?.role === 'seller') return <SellerScreens />;
    if (user?.role === 'admin')  return <AdminScreens />;
    if (isNewUser)               return <OnboardingScreens />;
    return <BuyerScreens />;
  }

  return (
    <NavigationContainer>
      {renderScreens()}
    </NavigationContainer>
  );
}