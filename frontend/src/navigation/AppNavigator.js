import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';

import WelcomeScreen from '../screens/buyer/WelcomeScreen';
import LoginScreen from '../screens/buyer/LoginScreen';
import SignUpScreen from '../screens/buyer/SignUpScreen';
import SellerLoginScreen from '../screens/seller/SellerLoginScreen';
import AdminLoginScreen from '../screens/admin/AdminLoginScreen';
import StylePreferenceScreen from '../screens/buyer/StylePreferenceScreen';
import AddressScreen from '../screens/buyer/AddressScreen';
import ProductReviewsScreen from '../screens/buyer/ProductReviewsScreen';
import OrderHistoryScreen from '../screens/buyer/OrderHistoryScreen';
import OnboardingScreen from '../screens/buyer/OnboardingScreen';
import DemandInsightsScreen from '../screens/buyer/DemandInsightsScreen';
import ForgotPasswordScreen from '../screens/buyer/ForgotPasswordScreen';
import OrderDetailScreen from '../screens/buyer/OrderDetailScreen';

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
import EditProfileScreen from '../screens/buyer/EditProfileScreen';
import ChangePasswordScreen from '../screens/buyer/ChangePasswordScreen';
import PrivacyScreen from '../screens/buyer/PrivacyScreen';
import TermsScreen from '../screens/buyer/TermsScreen';

import SellerTabs from './SellerTabs';
import CreateListingScreen from '../screens/seller/CreateListingScreen';
import ListingPreviewScreen from '../screens/seller/ListingPreviewScreen';
import ListingPublishedScreen from '../screens/seller/ListingPublishedScreen';
import SellerEarningsScreen from '../screens/seller/SellerEarningsScreen';
import SellerOrdersScreen from '../screens/seller/SellerOrdersScreen';
import SellerSettingsScreen from '../screens/seller/SellerSettingsScreen';
import SellerAnalyticsScreen from '../screens/seller/SellerAnalyticsScreen';
import SellerAddressScreen from '../screens/seller/SellerAddressScreen';
import SellerReviewsScreen from '../screens/seller/SellerReviewsScreen';
import SellerHelpScreen from '../screens/seller/SellerHelpScreen';

import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminUsersScreen from '../screens/admin/AdminUsersScreen';
import AdminListingsScreen from '../screens/admin/AdminListingsScreen';
import AdminReportsScreen from '../screens/admin/AdminReportsScreen';
import AdminNotificationsScreen from '../screens/admin/AdminNotificationsScreen';
import AdminSettingsScreen from '../screens/admin/AdminSettingsScreen';
import AdminProfileScreen from '../screens/admin/AdminProfileScreen';
import AdminTransactionsScreen from '../screens/admin/AdminTransactionsScreen';
import AdminSupportScreen from '../screens/admin/AdminSupportScreen';

const Stack = createNativeStackNavigator();

function AuthScreens() {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding"     component={OnboardingScreen} />
      <Stack.Screen name="Welcome"        component={WelcomeScreen} />
      <Stack.Screen name="Login"          component={LoginScreen} />
      <Stack.Screen name="SignUp"         component={SignUpScreen} />
      <Stack.Screen name="Register"       component={SignUpScreen} />
      <Stack.Screen name="SellerRegister" component={SignUpScreen} />
      <Stack.Screen name="SellerLogin"    component={SellerLoginScreen} />
      <Stack.Screen name="AdminLogin"     component={AdminLoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
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
      <Stack.Screen name="MainTabs"              component={MainTabs} />
      <Stack.Screen name="ProductDetail"         component={ProductDetailScreen} />
      <Stack.Screen name="Cart"                  component={CartScreen} />
      <Stack.Screen name="Checkout"              component={CheckoutScreen} />
      <Stack.Screen name="Notifications"         component={NotificationsScreen} />
      <Stack.Screen name="SearchResults"         component={SearchResultsScreen} />
      <Stack.Screen name="Settings"              component={SettingsScreen} />
      <Stack.Screen name="Help"                  component={HelpScreen} />
      <Stack.Screen name="Chat"                  component={ChatScreen} />
      <Stack.Screen name="TrackOrder"            component={TrackOrderScreen} />
      <Stack.Screen name="Review"                component={ReviewScreen} />
      <Stack.Screen name="SellerProfile"         component={SellerProfileScreen} />
      <Stack.Screen name="Address"               component={AddressScreen} />
      <Stack.Screen name="ProductReviews"        component={ProductReviewsScreen} />
      <Stack.Screen name="OrderHistory"          component={OrderHistoryScreen} />
      <Stack.Screen name="DemandInsights"        component={DemandInsightsScreen} />
      <Stack.Screen name="OrderDetail"           component={OrderDetailScreen} />
      <Stack.Screen name="ForgotPassword"        component={ForgotPasswordScreen} />
      <Stack.Screen name="EditProfile"           component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword"        component={ChangePasswordScreen} />
      <Stack.Screen name="Privacy"               component={PrivacyScreen} />
      <Stack.Screen name="Terms"                 component={TermsScreen} />
      <Stack.Screen name="StylePreference"       component={StylePreferenceScreen} />
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
      <Stack.Screen name="SellerOrders"     component={SellerOrdersScreen} />
      <Stack.Screen name="SellerSettings"   component={SellerSettingsScreen} />
      <Stack.Screen name="SellerAnalytics"  component={SellerAnalyticsScreen} />
      <Stack.Screen name="SellerAddress"    component={SellerAddressScreen} />
      <Stack.Screen name="ChangePassword"   component={ChangePasswordScreen} />
      <Stack.Screen name="Privacy"          component={PrivacyScreen} />
      <Stack.Screen name="Terms"            component={TermsScreen} />
      <Stack.Screen name="ForgotPassword"   component={ForgotPasswordScreen} />
      <Stack.Screen name="ProductDetail"    component={ProductDetailScreen} />
      <Stack.Screen name="EditProfile"      component={EditProfileScreen} />
      <Stack.Screen name="OrderHistory"     component={OrderHistoryScreen} />
      <Stack.Screen name="Address"          component={AddressScreen} />
      <Stack.Screen name="SellerReviews" component={SellerReviewsScreen} />
<Stack.Screen name="SellerHelp" component={SellerHelpScreen} />
    </Stack.Navigator>
  );
}

function AdminScreens() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard"     component={AdminDashboardScreen} />
      <Stack.Screen name="AdminUsers"         component={AdminUsersScreen} />
      <Stack.Screen name="AdminListings"      component={AdminListingsScreen} />
      <Stack.Screen name="AdminReports"       component={AdminReportsScreen} />
      <Stack.Screen name="Settings"           component={SettingsScreen} />
      <Stack.Screen name="AdminNotifications" component={AdminNotificationsScreen} />
      <Stack.Screen name="AdminSettings"      component={AdminSettingsScreen} />
      <Stack.Screen name="ChangePassword"     component={ChangePasswordScreen} />
      <Stack.Screen name="ForgotPassword"     component={ForgotPasswordScreen} />
      <Stack.Screen name="AdminProfile"       component={AdminProfileScreen} />
      <Stack.Screen name="AdminTransactions" component={AdminTransactionsScreen} />
<Stack.Screen name="AdminSupport" component={AdminSupportScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, isLoggedIn, isNewUser } = useAuth();

  // Each app "mode" gets a distinct key so Android's native-stack navigator
  // fully unmounts the old screen and mounts a fresh one when the mode
  // changes, instead of failing to visually update.
  function getNavigatorKey() {
    if (!isLoggedIn) return 'auth';
    if (user?.role === 'seller') return 'seller';
    if (user?.role === 'admin') return 'admin';
    if (isNewUser) return 'onboarding';
    return 'buyer';
  }

  function renderScreens() {
    if (!isLoggedIn)             return <AuthScreens />;
    if (user?.role === 'seller') return <SellerScreens />;
    if (user?.role === 'admin')  return <AdminScreens />;
    if (isNewUser)                return <OnboardingScreens />;
    return <BuyerScreens />;
  }

  return (
    <NavigationContainer key={getNavigatorKey()}>
      {renderScreens()}
    </NavigationContainer>
  );
}