import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const TRENDING = [
  { category: 'Vintage Jackets', change: '+24%', listings: 248, hot: true },
  { category: 'Denim Jeans', change: '+18%', listings: 312, hot: true },
  { category: 'Hoodies', change: '+12%', listings: 189, hot: false },
  { category: 'Boots', change: '+8%', listings: 94, hot: false },
  { category: 'Tees', change: '-3%', listings: 421, hot: false },
];

const PRICE_RANGES = [
  { range: 'Under NPR 1,000', items: 142, color: colors.accentGreen },
  { range: 'NPR 1,000 - 3,000', items: 289, color: colors.primaryTeal },
  { range: 'NPR 3,000 - 5,000', items: 98, color: colors.amber },
  { range: 'Above NPR 5,000', items: 45, color: colors.danger },
];

export default function DemandInsightsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Market Insights</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.liveCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.liveDot} />
            <Text style={[typography.caption, { color: '#FFFFFF', marginLeft: spacing.xs }]}>
              LIVE MARKET DATA
            </Text>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginTop: spacing.sm }}>
            Smart Thrift Exchange
          </Text>
          <Text style={[typography.body, { color: '#FFFFFFAA', marginTop: spacing.xs }]}>
            Real-time demand analytics for thrift marketplace
          </Text>
          <View style={styles.liveStats}>
            <View style={styles.liveStat}>
              <Text style={{ color: '#FFFFFF', fontSize: 22, fontWeight: '800' }}>2,481</Text>
              <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>Live Listings</Text>
            </View>
            <View style={styles.liveStatDivider} />
            <View style={styles.liveStat}>
              <Text style={{ color: colors.mintIcon, fontSize: 22, fontWeight: '800' }}>+24%</Text>
              <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>Weekly Growth</Text>
            </View>
            <View style={styles.liveStatDivider} />
            <View style={styles.liveStat}>
              <Text style={{ color: colors.amber, fontSize: 22, fontWeight: '800' }}>NPR 2.4k</Text>
              <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>Avg Price</Text>
            </View>
          </View>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Trending Categories
        </Text>
        {TRENDING.map((item) => (
          <View key={item.category} style={styles.trendRow}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: spacing.xs }}>
                <Text style={typography.subheading}>{item.category}</Text>
                {item.hot && (
                  <Text style={{ fontSize: 14 }}>🔥</Text>
                )}
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {item.listings} active listings
              </Text>
            </View>
            <Text style={[typography.subheading, {
              color: item.change.startsWith('+') ? colors.accentGreen : colors.danger
            }]}>
              {item.change}
            </Text>
          </View>
        ))}

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Price Distribution
        </Text>
        {PRICE_RANGES.map((range) => (
          <View key={range.range} style={styles.priceRow}>
            <Text style={[typography.body, { flex: 1 }]}>{range.range}</Text>
            <View style={styles.priceBarTrack}>
              <View style={[
                styles.priceBarFill,
                { width: `${(range.items / 421) * 100}%`, backgroundColor: range.color }
              ]} />
            </View>
            <Text style={[typography.caption, { width: 30, textAlign: 'right' }]}>
              {range.items}
            </Text>
          </View>
        ))}

        <View style={styles.tipCard}>
          <Text style={{ fontSize: 20 }}>💡</Text>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={[typography.subheading, { fontSize: 14 }]}>Smart Shopping Tip</Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
              Items in the NPR 1,000-3,000 range sell fastest. Check new listings daily for best deals on trending categories.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  liveCard: { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg },
  liveDot: { width: 8, height: 8, borderRadius: 999, backgroundColor: colors.accentGreen },
  liveStats: { flexDirection: 'row', marginTop: spacing.lg },
  liveStat: { flex: 1, alignItems: 'center' },
  liveStatDivider: { width: 1, backgroundColor: '#FFFFFF33' },
  trendRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  priceRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  priceBarTrack: { flex: 1, height: 8, backgroundColor: colors.border, borderRadius: radius.pill, marginHorizontal: spacing.sm },
  priceBarFill: { height: '100%', borderRadius: radius.pill },
  tipCard: { flexDirection: 'row', backgroundColor: '#FFFBF0', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg, borderWidth: 1, borderColor: colors.amber },
});