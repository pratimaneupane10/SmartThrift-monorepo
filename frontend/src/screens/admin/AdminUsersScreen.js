import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const USERS = [
  { id: '1', name: 'Ramesh Thapa', email: 'ramesh@gmail.com', role: 'Buyer', status: 'Active', joined: 'Jan 2024' },
  { id: '2', name: 'Sita Sharma', email: 'sita@gmail.com', role: 'Seller', status: 'Pending', joined: 'Feb 2024' },
  { id: '3', name: 'Hari Prasad', email: 'hari@gmail.com', role: 'Buyer', status: 'Active', joined: 'Mar 2024' },
  { id: '4', name: 'Maya Gurung', email: 'maya@gmail.com', role: 'Seller', status: 'Active', joined: 'Mar 2024' },
  { id: '5', name: 'Bikash KC', email: 'bikash@gmail.com', role: 'Buyer', status: 'Banned', joined: 'Apr 2024' },
  { id: '6', name: 'Sunita Rai', email: 'sunita@gmail.com', role: 'Seller', status: 'Active', joined: 'May 2024' },
];

const STATUS_COLORS = {
  Active: colors.accentGreen,
  Pending: colors.amber,
  Banned: colors.danger,
};

export default function AdminUsersScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = USERS.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || u.role === filter || u.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        title="Manage Users"
        onBack={() => navigation.goBack()}
      />
      <View style={{ padding: spacing.md }}>
        <View style={styles.searchBar}>
          <Text style={{ marginRight: spacing.sm }}>🔍</Text>
          <TextInput
            placeholder="Search users..."
            placeholderTextColor={colors.textSecondary}
            style={{ flex: 1 }}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.sm }}>
          {['All', 'Buyer', 'Seller', 'Active', 'Pending', 'Banned'].map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
            >
              <Text style={{ color: filter === f ? '#FFFFFF' : colors.textPrimary, fontSize: 12 }}>
                {f}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {filtered.map((user) => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.avatar}>
              <Text style={{ fontSize: 20 }}>{user.role === 'Seller' ? '🏪' : '🛍'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading}>{user.name}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{user.email}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {user.role} · Joined {user.joined}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: spacing.xs }}>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[user.status] + '22' }]}>
                <Text style={{ color: STATUS_COLORS[user.status], fontSize: 10, fontWeight: '700' }}>
                  {user.status}
                </Text>
              </View>
              <Pressable style={styles.actionBtn}>
                <Text style={{ fontSize: 12, color: colors.primaryTeal }}>Manage</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill, backgroundColor: colors.surface, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.primary },
  userCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  avatar: { width: 44, height: 44, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill },
  actionBtn: { borderWidth: 1, borderColor: colors.primaryTeal, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
});