import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const REPORTS = [
  { label: 'Total Revenue', value: 'NPR 1,24,000', change: '+12%', up: true },
  { label: 'Total Orders', value: '284', change: '+8%', up: true },
  { label: 'Active Sellers', value: '48', change: '+5%', up: true },
  { label: 'Returns', value: '12', change: '-3%', up: false },
];

const TOP_SELLERS = [
  { name: 'Maya Store', sales: 48, revenue: 'NPR 24,500' },
  { name: 'Aarav Shop', sales: 36, revenue: 'NPR 18,200' },
  { name: 'Priya Store', sales: 29, revenue: 'NPR 14,800' },
];

const TOP_ITEMS = [
  { title: 'Vintage Denim Jacket', sold: 24, revenue: 'NPR 28,800' },
  { title: 'Wool Overcoat', sold: 18, revenue: 'NPR 56,610' },
  { title: 'Leather Jacket', sold: 15, revenue: 'NPR 98,775' },
];

export default function AdminReportsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        title="Reports & Analytics"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <View style={styles.statsGrid}>
          {REPORTS.map((report) => (
            <View key={report.label} style={styles.statCard}>
              <Text style={typography.caption}>{report.label}</Text>
              <Text style={[typography.heading, { color: colors.primary, marginTop: spacing.xs }]}>
                {report.value}
              </Text>
              <Text style={{ color: report.up ? colors.accentGreen : colors.danger, fontWeight: '700' }}>
                {report.change}
              </Text>
            </View>
          ))}
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Top Sellers
        </Text>
        {TOP_SELLERS.map((seller, i) => (
          <View key={seller.name} style={styles.rankCard}>
            <Text style={[typography.heading, { color: colors.primary, fontSize: 20, width: 32 }]}>
              #{i + 1}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={typography.subheading}>{seller.name}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {seller.sales} sales
              </Text>
            </View>
            <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>{seller.revenue}</Text>
          </View>
        ))}

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Top Items
        </Text>
        {TOP_ITEMS.map((item, i) => (
          <View key={item.title} style={styles.rankCard}>
            <Text style={[typography.heading, { color: colors.primary, fontSize: 20, width: 32 }]}>
              #{i + 1}
            </Text>
            <View style={{ flex: 1 }}>
              <Text style={typography.subheading} numberOfLines={1}>{item.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {item.sold} sold
              </Text>
            </View>
            <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>{item.revenue}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  statCard: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  rankCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
});