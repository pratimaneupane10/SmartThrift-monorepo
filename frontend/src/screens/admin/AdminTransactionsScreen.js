import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const TRANSACTIONS = [
  { id: 'TXN-001', buyer: 'Ramesh Thapa', seller: 'Maya Store', item: 'Vintage Denim Jacket', amount: 1395, method: 'eSewa', date: 'Jun 24, 2026', status: 'Completed' },
  { id: 'TXN-002', buyer: 'Sita Sharma', seller: 'Aarav Shop', item: 'Wool Overcoat', amount: 3340, method: 'COD', date: 'Jun 23, 2026', status: 'Completed' },
  { id: 'TXN-003', buyer: 'Hari Prasad', seller: 'Priya Store', item: 'Black Hoodie', amount: 1340, method: 'COD', date: 'Jun 22, 2026', status: 'Pending' },
  { id: 'TXN-004', buyer: 'Maya Gurung', seller: 'Ram Thrift', item: 'White Dress Shirt', amount: 2463, method: 'eSewa', date: 'Jun 21, 2026', status: 'Refunded' },
  { id: 'TXN-005', buyer: 'Bikash KC', seller: 'Sunita Store', item: 'Plain White Tee', amount: 1095, method: 'eSewa', date: 'Jun 20, 2026', status: 'Completed' },
];

const STATUS_COLORS = {
  Completed: colors.accentGreen,
  Pending: colors.amber,
  Refunded: colors.danger,
};

const METHOD_ICONS = {
  eSewa: '💚',
  'Cash On Delivery': '💵',
};

export default function AdminTransactionsScreen({ navigation }) {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? TRANSACTIONS
    : TRANSACTIONS.filter((t) => t.status === filter);

  const totalRevenue = TRANSACTIONS.filter((t) => t.status === 'Completed').reduce((sum, t) => sum + t.amount, 0);
  const platformFee = Math.floor(totalRevenue * 0.03);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Transactions</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { borderLeftColor: colors.primary }]}>
            <Text style={[typography.heading, { color: colors.primary, fontSize: 18 }]}>
              {'NPR ' + totalRevenue.toLocaleString()}
            </Text>
            <Text style={typography.caption}>Total Volume</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: colors.accentGreen }]}>
            <Text style={[typography.heading, { color: colors.accentGreen, fontSize: 18 }]}>
              {'NPR ' + platformFee.toLocaleString()}
            </Text>
            <Text style={typography.caption}>Platform Fees</Text>
          </View>
        </View>

        <View style={styles.methodRow}>
          {Object.entries(METHOD_ICONS).map(([method, icon]) => {
            const count = TRANSACTIONS.filter((t) => t.method === method).length;
            return (
              <View key={method} style={styles.methodCard}>
                <Text style={{ fontSize: 24 }}>{icon}</Text>
                <Text style={[typography.subheading, { marginTop: spacing.xs }]}>{count}</Text>
                <Text style={typography.caption}>{method}</Text>
              </View>
            );
          })}
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: spacing.md }}>
          {['All', 'Completed', 'Pending', 'Refunded'].map((f) => (
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

        {filtered.map((txn) => (
          <View key={txn.id} style={styles.txnCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{txn.id}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{txn.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1 }}>
                <Text style={typography.subheading} numberOfLines={1}>{txn.item}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {txn.buyer + ' → ' + txn.seller}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs, gap: spacing.xs }}>
                  <Text style={{ fontSize: 14 }}>{METHOD_ICONS[txn.method]}</Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>{txn.method}</Text>
                </View>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={[typography.subheading, { color: colors.primary }]}>
                  {'NPR ' + txn.amount}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[txn.status] + '22' }]}>
                  <Text style={{ color: STATUS_COLORS[txn.status], fontSize: 10, fontWeight: '700' }}>
                    {txn.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  summaryRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  summaryCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderLeftWidth: 4 },
  methodRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.md },
  methodCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill, backgroundColor: colors.surface, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.primary },
  txnCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  statusBadge: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill, marginTop: spacing.xs },
});