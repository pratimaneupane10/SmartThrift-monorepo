import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Switch, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function AdminSettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [newSellerApproval, setNewSellerApproval] = useState(true);
  const [autoApproveListings, setAutoApproveListings] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [fraudDetection, setFraudDetection] = useState(true);

  function handleLogout() {
    Alert.alert('Logout', 'Are you sure you want to logout from admin panel?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => logout() },
    ]);
  }

  function handleMaintenanceToggle(val) {
    if (val) {
      Alert.alert(
        'Enable Maintenance Mode?',
        'This will disable the app for ALL users. Are you sure?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Enable', style: 'destructive', onPress: () => setMaintenanceMode(true) },
        ]
      );
    } else {
      setMaintenanceMode(false);
    }
  }

  const ADMIN_ACTIONS = [
    { label: 'Manage Users', sub: 'View and manage all users', icon: '👥', screen: 'AdminUsers' },
    { label: 'Moderate Listings', sub: 'Approve or reject listings', icon: '📋', screen: 'AdminListings' },
    { label: 'View Reports', sub: 'Revenue and analytics', icon: '📊', screen: 'AdminReports' },
    { label: 'Send Notification', sub: 'Push notification to users', icon: '🔔', screen: 'AdminNotifications' },
    { label: 'Activity Logs', sub: 'View admin activity history', icon: '📜', action: () => Alert.alert('Activity Logs', 'Last login: Today 10:30 AM\nActions taken: 12\nListings approved: 8\nListings rejected: 4') },
    { label: 'Backup Data', sub: 'Export platform data', icon: '💾', action: () => Alert.alert('Backup', 'Last backup: Jun 24, 2026 12:00 AM\nNext scheduled: Jun 25, 2026\n\nManual backup initiated!') },
    { label: 'API Settings', sub: 'Manage API keys and webhooks', icon: '⚙', action: () => Alert.alert('API Settings', 'eSewa API: Connected\nKhalti API: Connected\nSMS Gateway: Active\nEmail Service: Active') },
    { label: 'Change Password', sub: 'Update admin credentials', icon: '🔒', screen: 'ChangePassword' },
    { label: 'Transactions', sub: 'All payment transactions', icon: '💳', screen: 'AdminTransactions' },
{ label: 'Support Tickets', sub: 'User support requests', icon: '🎫', screen: 'AdminSupport' },
  ];

  const PLATFORM_TOGGLES = [
    { label: 'Maintenance Mode', sub: 'Disable app for all users', value: maintenanceMode, setter: handleMaintenanceToggle, danger: true },
    { label: 'New Seller Approval', sub: 'Manually review new sellers', value: newSellerApproval, setter: setNewSellerApproval, danger: false },
    { label: 'Auto-Approve Listings', sub: 'Skip manual listing review', value: autoApproveListings, setter: setAutoApproveListings, danger: false },
    { label: 'Email Notifications', sub: 'Admin email alerts', value: emailNotifications, setter: setEmailNotifications, danger: false },
    { label: 'SMS Alerts', sub: 'Critical system SMS alerts', value: smsAlerts, setter: setSmsAlerts, danger: false },
    { label: 'Fraud Detection', sub: 'AI fraud monitoring system', value: fraudDetection, setter: setFraudDetection, danger: false },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Admin Settings</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.adminCard}>
          <View style={styles.adminAvatar}>
            <Text style={{ fontSize: 28 }}>⚙</Text>
          </View>
          <View style={{ marginLeft: spacing.md }}>
            <Text style={typography.subheading}>{user?.name || 'Admin User'}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {user?.email || 'admin@smartthrift.com'}
            </Text>
            <View style={styles.adminBadge}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>SUPER ADMIN</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {[
            { label: 'Total Users', value: '2,481', color: colors.primaryTeal },
            { label: 'Active Sellers', value: '48', color: colors.accentGreen },
            { label: 'Total Listings', value: '1,204', color: colors.primary },
            { label: 'Today Revenue', value: 'NPR 12k', color: colors.amber },
          ].map((stat) => (
            <View key={stat.label} style={[styles.statCard, { borderTopColor: stat.color }]}>
              <Text style={[typography.heading, { color: stat.color, fontSize: 18 }]}>{stat.value}</Text>
              <Text style={typography.caption}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Admin Actions
        </Text>
        <View style={styles.section}>
          {ADMIN_ACTIONS.map((item, i) => (
            <Pressable
              key={item.label}
              style={[styles.settingRow, i === ADMIN_ACTIONS.length - 1 && { borderBottomWidth: 0 }]}
              onPress={() => {
                if (item.screen) navigation.navigate(item.screen);
                else if (item.action) item.action();
              }}
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
          Platform Controls
        </Text>
        <View style={styles.section}>
          {PLATFORM_TOGGLES.map((item, i) => (
            <View
              key={item.label}
              style={[styles.toggleRow, i === PLATFORM_TOGGLES.length - 1 && { borderBottomWidth: 0 }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[typography.subheading, item.danger && { color: colors.danger }]}>
                  {item.label}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.sub}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.setter}
                trackColor={{ true: item.danger ? colors.danger : colors.accentGreen }}
              />
            </View>
          ))}
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ color: colors.danger, fontWeight: '700', fontSize: 16 }}>
            Logout Admin
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
  adminCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  adminAvatar: { width: 60, height: 60, borderRadius: 999, backgroundColor: colors.amber + '22', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.amber },
  adminBadge: { backgroundColor: '#1A1A2E', alignSelf: 'flex-start', paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill, marginTop: 4 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  statCard: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', borderTopWidth: 3 },
  section: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  toggleRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  logoutBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl, marginBottom: spacing.xl },
});