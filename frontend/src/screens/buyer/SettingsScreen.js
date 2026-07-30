import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Switch, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [biddingAlerts, setBiddingAlerts] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [dropAlerts, setDropAlerts] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
        },
      },
    ]);
  }

  function handleDeactivate() {
    Alert.alert(
      'Deactivate Account',
      'This will permanently deactivate your account. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Deactivate',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  }

  const ACCOUNT_ITEMS = [
    { label: 'Edit Profile', sub: 'Update your name, photo and bio', icon: '👤', screen: 'EditProfile' },
    { label: 'Change Password', sub: 'Update your login password', icon: '🔒', screen: 'ChangePassword' },
    { label: 'My Addresses', sub: 'Manage delivery addresses', icon: '📍', screen: 'Address' },
    { label: 'Privacy Policy', sub: 'How we handle your data', icon: '🛡', screen: 'Privacy' },
    { label: 'Terms & Conditions', sub: 'Platform rules and policies', icon: '📄', screen: 'Terms' },
    { label: 'Help & Support', sub: 'FAQs and contact us', icon: '❓', screen: 'Help' },
  ];

  const TOGGLES = [
    { label: 'Bidding Alerts', sub: 'Receive updates on items you bid on', value: biddingAlerts, setter: setBiddingAlerts },
    { label: 'New Messages', sub: 'Chat notifications from sellers', value: newMessages, setter: setNewMessages },
    { label: 'Drop Alerts', sub: 'Be first to know about new drops', value: dropAlerts, setter: setDropAlerts },
    { label: 'Email Notifications', sub: 'Receive emails for orders', value: emailNotif, setter: setEmailNotif },
    { label: 'Dark Mode', sub: 'Switch to dark theme', value: darkMode, setter: setDarkMode },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Settings</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={{ fontSize: 28 }}>👤</Text>
          </View>
          <View style={{ marginLeft: spacing.md }}>
            <Text style={typography.subheading}>{user?.name || 'Ramesh Thapa'}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {user?.email || 'ramesh@gmail.com'}
            </Text>
            <Pressable onPress={() => navigation.navigate('EditProfile')}>
              <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700', marginTop: 2 }]}>
                Edit Profile
              </Text>
            </Pressable>
          </View>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Account
        </Text>
        <View style={styles.section}>
          {ACCOUNT_ITEMS.map((item, i) => (
            <Pressable
              key={item.label}
              style={[styles.settingRow, i === ACCOUNT_ITEMS.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => navigation.navigate(item.screen)}
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
                trackColor={{ true: colors.accentGreen }}
              />
            </View>
          ))}
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ color: colors.primary, fontWeight: '700', fontSize: 16 }}>
            Logout
          </Text>
        </Pressable>

        <Pressable style={styles.deactivateBtn} onPress={handleDeactivate}>
          <Text style={{ color: colors.danger, fontWeight: '700', fontSize: 16 }}>
            Deactivate Account
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
  avatar: { width: 60, height: 60, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.primary },
  section: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  toggleRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  logoutBtn: { borderWidth: 2, borderColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
  deactivateBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm, marginBottom: spacing.xl },
});