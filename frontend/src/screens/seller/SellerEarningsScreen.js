import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const EARNINGS = [
  { id: '1', item: 'Vintage Denim Jacket', date: 'Jun 24, 2026', amount: 1020, status: 'Paid' },
  { id: '2', item: 'Wool Overcoat', date: 'Jun 22, 2026', amount: 2673, status: 'Paid' },
  { id: '3', item: 'Black Hoodie', date: 'Jun 20, 2026', amount: 972, status: 'Processing' },
  { id: '4', item: 'White Dress Shirt', date: 'Jun 18, 2026', amount: 1928, status: 'Paid' },
];

export default function SellerEarningsScreen({ navigation }) {
  const total = EARNINGS.reduce((sum, e) => sum + e.amount, 0);
  const paid = EARNINGS.filter((e) => e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0);
  const pending = EARNINGS.filter((e) => e.status === 'Processing').reduce((sum, e) => sum + e.amount, 0);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Earnings"
  onBack={() => navigation.goBack()}
  rightIcon="💰"
/>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.totalCard}>
          <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>TOTAL EARNINGS</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '800', marginTop: spacing.xs }}>
            NPR {total.toLocaleString()}
          </Text>
          <View style={styles.earningsRow}>
            <View>
              <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>PAID</Text>
              <Text style={{ color: colors.mintIcon, fontWeight: '700', fontSize: 18 }}>
                NPR {paid.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>PROCESSING</Text>
              <Text style={{ color: colors.amber, fontWeight: '700', fontSize: 18 }}>
                NPR {pending.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        <Pressable style={styles.withdrawBtn}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Withdraw to Bank →
          </Text>
        </Pressable>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Transaction History
        </Text>

        {EARNINGS.map((earning) => (
          <View key={earning.id} style={styles.transCard}>
            <View style={styles.transIcon}>
              <Text style={{ fontSize: 20 }}>💰</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading} numberOfLines={1}>{earning.item}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {earning.date}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                + NPR {earning.amount}
              </Text>
              <View style={[styles.statusBadge, { backgroundColor: earning.status === 'Paid' ? colors.accentGreen + '22' : colors.amber + '22' }]}>
                <Text style={{ color: earning.status === 'Paid' ? colors.accentGreen : colors.amber, fontSize: 10, fontWeight: '700' }}>
                  {earning.status}
                </Text>
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
  totalCard: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg },
  earningsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg },
  withdrawBtn: { backgroundColor: colors.primaryTeal, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  transCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  transIcon: { width: 44, height: 44, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  statusBadge: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill, marginTop: 2 },
});