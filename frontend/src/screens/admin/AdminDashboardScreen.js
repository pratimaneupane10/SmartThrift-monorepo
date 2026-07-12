import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const STATS = [
  { label: 'Total Users',      value: '2,481',     icon: '👥', color: colors.primaryTeal  },
  { label: 'Active Listings',  value: '1,204',     icon: '📋', color: colors.accentGreen  },
  { label: 'Orders Today',     value: '48',         icon: '📦', color: colors.amber        },
  { label: 'Revenue',          value: 'NPR 124k',  icon: '💰', color: colors.primary      },
];

const PENDING_LISTINGS = [
  { id: '1', title: 'Grey Zip Jacket', seller: 'Aarav Shop',  price: 4500 },
  { id: '2', title: 'Classic Blue Jeans', seller: 'Priya Store', price: 2200 },
  { id: '3', title: 'Black Graphic Tee', seller: 'Ram Thrift',  price: 1800 },
];

const RECENT_USERS = [
  { id: '1', name: 'Ramesh Thapa', role: 'Buyer',  status: 'Active'  },
  { id: '2', name: 'Sita Sharma',  role: 'Seller', status: 'Pending' },
  { id: '3', name: 'Hari Prasad',  role: 'Buyer',  status: 'Active'  },
  { id: '4', name: 'Maya Gurung',  role: 'Seller', status: 'Active'  },
];

const QUICK_ACTIONS = [
  { label: 'Manage Users',       icon: '👥', screen: 'AdminUsers'    },
  { label: 'View Reports',       icon: '📊', screen: 'AdminReports'  },
  { label: 'Moderate Listings',  icon: '📋', screen: 'AdminListings' },
  { label: 'Send Notification',  icon: '🔔', screen: null            },
];

export default function AdminDashboardScreen({ navigation }) {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>ADMIN PANEL</Text>
          <Text style={[typography.subheading, { color: colors.primary }]}>Smart Thrift</Text>
        </View>
        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ color: colors.danger, fontWeight: '700' }}>Logout</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <Text style={[typography.heading, { marginBottom: spacing.md }]}>
          Welcome, {user?.name}
        </Text>

        {/* Stats grid */}
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

        {/* Pending listings */}
        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Pending Listings (Approval Required)
        </Text>
        {PENDING_LISTINGS.map((listing) => (
          <View key={listing.id} style={styles.listingCard}>
            <View style={{ flex: 1 }}>
              <Text style={typography.subheading}>{listing.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                By {listing.seller} · NPR {listing.price}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: spacing.sm }}>
              <Pressable style={styles.approveBtn}>
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✓ Approve</Text>
              </Pressable>
              <Pressable style={styles.rejectBtn}>
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✕ Reject</Text>
              </Pressable>
            </View>
          </View>
        ))}

        {/* Recent users */}
        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Recent Users
        </Text>
        {RECENT_USERS.map((u) => (
          <View key={u.id} style={styles.userCard}>
            <View style={styles.userAvatar}>
              <Text style={{ fontSize: 20 }}>{u.role === 'Seller' ? '🏪' : '🛍'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading}>{u.name}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{u.role}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { backgroundColor: u.status === 'Active' ? colors.accentGreen + '22' : colors.amber + '22' },
            ]}>
              <Text style={{
                color: u.status === 'Active' ? colors.accentGreen : colors.amber,
                fontSize: 11,
                fontWeight: '700',
              }}>
                {u.status}
              </Text>
            </View>
          </View>
        ))}

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <Text style={[typography.subheading, { marginBottom: spacing.md }]}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            {QUICK_ACTIONS.map((action) => (
              <Pressable
                key={action.label}
                style={styles.actionBtn}
                onPress={() => action.screen && navigation.navigate(action.screen)}
              >
                <Text style={{ fontSize: 24 }}>{action.icon}</Text>
                <Text style={[typography.caption, { marginTop: spacing.xs, textAlign: 'center' }]}>
                  {action.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  logoutBtn: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    borderLeftWidth: 4,
  },
  listingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  approveBtn: {
    backgroundColor: colors.accentGreen,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  rejectBtn: {
    backgroundColor: colors.danger,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  quickActions: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  actionBtn: {
    width: '47%',
    backgroundColor: colors.background,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
});