import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import SellerDashboardScreen from '../screens/seller/SellerDashboardScreen';
import CreateListingScreen from '../screens/seller/CreateListingScreen';
import SellerInboxScreen from '../screens/seller/SellerInboxScreen';
import SellerEarningsScreen from '../screens/seller/SellerEarningsScreen';
import ProfileScreen from '../screens/buyer/ProfileScreen';
import { colors } from '../theme/theme';
import SellerSettingsScreen from '../screens/seller/SellerSettingsScreen';
const Tab = createBottomTabNavigator();

const ICONS = {
  Dashboard: 'grid-outline',
  Listings: 'add-circle-outline',
  Messages: 'chatbubble-outline',
  Earnings: 'cash-outline',
  Profile: 'person-outline',
};

export default function SellerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primaryTeal,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { borderTopColor: colors.border },
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={ICONS[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={SellerDashboardScreen} />
      <Tab.Screen name="Listings" component={CreateListingScreen} />
      <Tab.Screen name="Messages" component={SellerInboxScreen} />
      <Tab.Screen name="Earnings" component={SellerEarningsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}