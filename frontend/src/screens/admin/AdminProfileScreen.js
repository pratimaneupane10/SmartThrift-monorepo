import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const STATS = [
  { label: 'Total Users', value: '2,481', icon: '👥', color: colors.primaryTeal },
  { label: 'Active Listings', value: '1,204', icon: '📋', color: colors.accentGreen },
  { label: 'Orders Today', value: '48', icon: '📦', color: colors.amber },
  { label: 'Revenue', value: 'NPR 124k', icon: '💰', color: colors.primary },
];

const INITIAL_PENDING = [
  { id: '1', title: 'Vintage Leather Jacket', seller: 'Aarav Shop', price: 4500 },
  { id: '2', title: 'Silk Dress', seller: 'Priya Store', price: 2200 },
  { id: '3', title: 'Denim Overalls', seller: 'Ram Thrift', price: 1800 },
];

const RECENT_USERS = [
  { id: '1', name: 'Ramesh Thapa', role: 'Buyer', status: 'Active' },
  { id: '2', name: 'Sita Sharma', role: 'Seller', status: 'Pending' },
  { id: '3', name: 'Hari Prasad', role: 'Buyer', status: 'Active' },
  { id: '4', name: 'Maya Gurung', role: 'Seller', status: 'Active' },
];

export default function AdminDashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [pendingListings, setPendingListings] = useState(INITIAL_PENDING);

  function handleLogout() {
    logout();
  }

  function approveListing(id) {
    setPendingListings((prev) => prev.filter((l) => l.id !== id));
  }

  function rejectListing(id) {
    setPendingListings((prev) => prev.filter((l) => l.id !== id));
  }

  const QUICK_ACTIONS = [
    { label: 'Manage Users', icon: '👥', screen: 'AdminUsers' },
    { label: 'View Reports', icon: '📊', screen: 'AdminReports' },
    { label: 'Moderate Listings', icon: '📋', screen: 'AdminListings' },
    { label: 'Send Notification', icon: '🔔', screen: 'AdminNotifications' },
    { label: 'Settings', icon: '⚙', screen: 'AdminSettings' },
    { label: 'Analytics', icon: '📈', screen: 'AdminReports' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <View>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>ADMIN PANEL</Text>
          <Text style={[typography.subheading, { color: colors.primary }]}>Smart Thrift</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.sm }}>
          <Pressable
            style={styles.profileBtn}
            onPress={() => navigation.navigate('AdminProfile')}
          >
            <Text style={{ fontSize: 18 }}>🛡</Text>
          </Pressable>
          <Pressable style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={{ color: colors.danger, fontWeight: '700' }}>Logout</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: spacing.md, paddingBottom: spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[typography.heading, { marginBottom: spacing.md }]}>
          {'Welcome, ' + (user?.name || 'Admin')}
        </Text>

        <View style={styles.statsGrid}>
          {STATS.map((stat) => (
            <View key={stat.label} style={[styles.statCard, { borderLeftColor: stat.color }]}>
              <Text style={{ fontSize: 24 }}>{stat.icon}</Text>
              <Text style={[typography.heading, { color: stat.color, marginTop: spacing.xs }]}>
                {stat.value}
              </Text>
              <Text style={typography.caption}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          {'Pending Listings (' + pendingListings.length + ')'}
        </Text>
        {pendingListings.length === 0 ? (
          <View style={[styles.listingCard, { justifyContent: 'center' }]}>
            <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
              No pending listings
            </Text>
          </View>
        ) : (
          pendingListings.map((listing) => (
            <View key={listing.id} style={styles.listingCard}>
              <View style={{ flex: 1 }}>
                <Text style={typography.subheading}>{listing.title}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {'By ' + listing.seller + ' · NPR ' + listing.price}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                <Pressable
                  style={styles.approveBtn}
                  onPress={() => approveListing(listing.id)}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>
                    Approve
                  </Text>
                </Pressable>
                <Pressable
                  style={styles.rejectBtn}
                  onPress={() => rejectListing(listing.id)}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>
                    Reject
                  </Text>
                </Pressable>
              </View>
            </View>
          ))
        )}

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Recent Users
        </Text>
        {RECENT_USERS.map((u) => (
          <Pressable
            key={u.id}
            style={styles.userCard}
            onPress={() => navigation.navigate('AdminUsers')}
          >
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 20 }}>{u.role === 'Seller' ? '🏪' : '🛍'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading}>{u.name}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{u.role}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: u.status === 'Active' ? colors.accentGreen + '22' : colors.amber + '22' }]}>
              <Text style={{ color: u.status === 'Active' ? colors.accentGreen : colors.amber, fontSize: 11, fontWeight: '700' }}>
                {u.status}
              </Text>
            </View>
          </Pressable>
        ))}

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Quick Actions
        </Text>
        <View style={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <Pressable
              key={action.label}
              style={styles.actionBtn}
              onPress={() => navigation.navigate(action.screen)}
            >
              <Text style={{ fontSize: 28 }}>{action.icon}</Text>
              <Text style={[typography.caption, { marginTop: spacing.xs, textAlign: 'center' }]}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  logoutBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  profileBtn: { width: 36, height: 36, borderRadius: 999, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statCard: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderLeftWidth: 4 },
  listingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  approveBtn: { backgroundColor: colors.accentGreen, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  rejectBtn: { backgroundColor: colors.danger, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  userAvatar: { width: 44, height: 44, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actionBtn: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
});