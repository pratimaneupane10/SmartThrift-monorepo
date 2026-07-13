import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const MONTHLY_DATA = [
  { month: 'Jan', sales: 12, revenue: 14400 },
  { month: 'Feb', sales: 18, revenue: 21600 },
  { month: 'Mar', sales: 15, revenue: 18000 },
  { month: 'Apr', sales: 22, revenue: 26400 },
  { month: 'May', sales: 28, revenue: 33600 },
  { month: 'Jun', sales: 35, revenue: 42000 },
];

const TOP_PRODUCTS = [
  { title: 'Vintage Denim Jacket', sold: 8, revenue: 9600, trend: '+12%' },
  { title: 'Wool Overcoat', sold: 5, revenue: 15725, trend: '+8%' },
  { title: 'Black Hoodie', sold: 12, revenue: 13740, trend: '+24%' },
];

export default function SellerAnalyticsScreen({ navigation }) {
  const totalRevenue = MONTHLY_DATA.reduce((sum, m) => sum + m.revenue, 0);
  const totalSales = MONTHLY_DATA.reduce((sum, m) => sum + m.sales, 0);
  const maxRevenue = Math.max(...MONTHLY_DATA.map((m) => m.revenue));

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Analytics</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { borderLeftColor: colors.primary }]}>
            <Text style={[typography.heading, { color: colors.primary }]}>
              {'NPR ' + (totalRevenue / 1000).toFixed(0) + 'k'}
            </Text>
            <Text style={typography.caption}>Total Revenue</Text>
            <Text style={[typography.caption, { color: colors.accentGreen }]}>+18% this month</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: colors.accentGreen }]}>
            <Text style={[typography.heading, { color: colors.accentGreen }]}>{totalSales}</Text>
            <Text style={typography.caption}>Total Sales</Text>
            <Text style={[typography.caption, { color: colors.accentGreen }]}>+25% this month</Text>
          </View>
        </View>

        <View style={[styles.summaryRow, { marginTop: spacing.sm }]}>
          <View style={[styles.summaryCard, { borderLeftColor: colors.primaryTeal }]}>
            <Text style={[typography.heading, { color: colors.primaryTeal }]}>4.8</Text>
            <Text style={typography.caption}>Avg Rating</Text>
            <Text style={[typography.caption, { color: colors.primaryTeal }]}>127 reviews</Text>
          </View>
          <View style={[styles.summaryCard, { borderLeftColor: colors.amber }]}>
            <Text style={[typography.heading, { color: colors.amber }]}>98%</Text>
            <Text style={typography.caption}>Response Rate</Text>
            <Text style={[typography.caption, { color: colors.accentGreen }]}>Excellent</Text>
          </View>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.md }]}>
          Monthly Revenue
        </Text>
        <View style={styles.chartCard}>
          <View style={styles.chartBars}>
            {MONTHLY_DATA.map((data) => (
              <View key={data.month} style={styles.barGroup}>
                <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.xs }]}>
                  {'NPR' + (data.revenue / 1000).toFixed(0) + 'k'}
                </Text>
                <View style={[
                  styles.bar,
                  { height: (data.revenue / maxRevenue) * 120, backgroundColor: colors.primary }
                ]} />
                <Text style={[typography.caption, { marginTop: spacing.xs }]}>{data.month}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Top Performing Items
        </Text>
        {TOP_PRODUCTS.map((product, i) => (
          <View key={product.title} style={styles.productRow}>
            <View style={styles.rankBadge}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>{'#' + (i + 1)}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading} numberOfLines={1}>{product.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {product.sold + ' sold'}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                {'NPR ' + product.revenue}
              </Text>
              <Text style={[typography.caption, { color: colors.accentGreen }]}>{product.trend}</Text>
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
  summaryRow: { flexDirection: 'row', gap: spacing.sm },
  summaryCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, borderLeftWidth: 4 },
  chartCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  chartBars: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', height: 180 },
  barGroup: { alignItems: 'center', flex: 1 },
  bar: { width: 24, borderRadius: radius.sm },
  productRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  rankBadge: { width: 32, height: 32, borderRadius: 999, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
});