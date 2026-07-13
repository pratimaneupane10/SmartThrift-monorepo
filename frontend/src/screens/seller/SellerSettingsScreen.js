import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Switch, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function SellerSettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [newOrders, setNewOrders] = useState(true);
  const [messages, setMessages] = useState(true);
  const [priceAlerts, setPriceAlerts] = useState(false);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [autoReply, setAutoReply] = useState(false);

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => logout() },
    ]);
  }

  const SHOP_ITEMS = [
    { label: 'Shop Profile', sub: 'Edit shop name and description', icon: '🏪', onPress: () => Alert.alert('Coming Soon', 'Shop profile editor coming soon!') },
    { label: 'Payment Details', sub: 'Bank account and eSewa linked', icon: '💳', onPress: () => Alert.alert('Payment', 'eSewa: 98XXXXXXXX\nBank: linked') },
    { label: 'Shipping Settings', sub: 'Delivery zones and rates', icon: '🚚', onPress: () => Alert.alert('Shipping', 'Standard: NPR 150\nExpress: NPR 300') },
    { label: 'Shop Addresses', sub: 'Pickup and return addresses', icon: '📍', onPress: () => navigation.navigate('SellerAddress') },
    { label: 'Analytics', sub: 'Sales and performance data', icon: '📊', onPress: () => navigation.navigate('SellerAnalytics') },
    { label: 'Change Password', sub: 'Update login credentials', icon: '🔒', onPress: () => navigation.navigate('ChangePassword') },
    { label: 'Privacy Policy', sub: 'Seller data policies', icon: '🛡', onPress: () => navigation.navigate('Privacy') },
    { label: 'Terms & Conditions', sub: 'Seller agreement', icon: '📄', onPress: () => navigation.navigate('Terms') },
    { label: 'Help & Support', sub: 'Get help with your shop', icon: '❓', onPress: () => navigation.navigate('Help') },
    { label: 'Customer Reviews', sub: 'See what buyers say about you', icon: '⭐', onPress: () => navigation.navigate('SellerReviews') },
{ label: 'Help & Support', sub: 'Seller guides and FAQs', icon: '❓', onPress: () => navigation.navigate('SellerHelp') },
  ];

  const TOGGLES = [
    { label: 'New Order Alerts', sub: 'Alert when order is placed', value: newOrders, setter: setNewOrders },
    { label: 'Message Alerts', sub: 'Buyer inquiry notifications', value: messages, setter: setMessages },
    { label: 'Price Change Alerts', sub: 'Market price notifications', value: priceAlerts, setter: setPriceAlerts },
    { label: 'Weekly Sales Report', sub: 'Summary every Monday', value: weeklyReport, setter: setWeeklyReport },
    { label: 'Auto Reply', sub: 'Auto respond to buyers when away', value: autoReply, setter: setAutoReply },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Seller Settings</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 28 }}>🏪</Text>
          </View>
          <View style={{ marginLeft: spacing.md }}>
            <Text style={typography.subheading}>{user?.name || 'Seller User'}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {user?.email || 'seller@shop.com'}
            </Text>
            <View style={styles.verifiedBadge}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>VERIFIED SELLER</Text>
            </View>
          </View>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Shop Settings
        </Text>
        <View style={styles.section}>
          {SHOP_ITEMS.map((item, i) => (
            <Pressable
              key={item.label}
              style={[styles.settingRow, i === SHOP_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
              onPress={item.onPress}
            >
              <Text style={{ fontSize: 20, marginRight: spacing.md }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={typography.subheading}>{item.label}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.sub}</Text>
              </View>
              <Text style={{ color: colors.textSecondary, fontSize: 20 }}>{'>'}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Notifications
        </Text>
        <View style={styles.section}>
          {TOGGLES.map((item, i) => (
            <View
              key={item.label}
              style={[styles.toggleRow, i === TOGGLES.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={typography.subheading}>{item.label}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.sub}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.setter}
                trackColor={{ true: colors.primaryTeal }}
              />
            </View>
          ))}
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ color: colors.danger, fontWeight: '700', fontSize: 16 }}>
            Logout
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  avatar: { width: 60, height: 60, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.primaryTeal },
  verifiedBadge: { backgroundColor: colors.primaryTeal, alignSelf: 'flex-start', paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill, marginTop: 4 },
  section: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  toggleRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  logoutBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xl },
});