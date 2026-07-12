import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const DEMAND_CHANGES = [
  { category: 'Jackets', sub: 'Outerwear', change: '+20%', up: true },
  { category: 'Hoodies', sub: 'Casual', change: '+30%', up: false },
];

const TRENDING = [
  { name: 'Vintage Tech', listings: '9.2k listings' },
  { name: 'Collectibles', listings: '14.1k listings' },
  { name: 'Modernist', listings: '3.4k listings' },
  { name: 'Horology', listings: '1.4k listings' },
];

export default function InsightsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={{ fontSize: 20 }}>📊</Text>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
          The Exchange
        </Text>
        <Text style={{ fontSize: 20 }}>🔔</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={[typography.heading, { fontSize: 28 }]}>Insights</Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          Real-time market velocity and category demand.
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg }}>
          <Text style={typography.subheading}>Demand Changes</Text>
          <Text style={[typography.caption, { color: colors.primaryTeal }]}>LIVE UPDATE</Text>
        </View>

        {DEMAND_CHANGES.map((item) => (
          <View key={item.category} style={styles.demandRow}>
            <View style={styles.categoryIcon}>
              <Text style={{ fontSize: 20 }}>{item.up ? '🧥' : '👕'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading}>{item.category}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.sub}</Text>
            </View>
            <View style={[styles.changeBadge, { backgroundColor: item.up ? colors.accentGreen + '22' : colors.danger + '22' }]}>
              <Text style={{ color: item.up ? colors.accentGreen : colors.danger, fontWeight: '700' }}>
                {item.change}
              </Text>
            </View>
          </View>
        ))}

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Trending Categories
        </Text>
        <View style={styles.trendingGrid}>
          {TRENDING.map((item) => (
            <Pressable key={item.name} style={styles.trendingCard}>
              <Text style={{ fontSize: 24 }}>📈</Text>
              <Text style={[typography.subheading, { marginTop: spacing.xs, fontSize: 13 }]}>{item.name}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.listings}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.marketHealth}>
          <Text style={typography.subheading}>Market Health</Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Exchange volume is up 12.4% this week; dealer satisfaction is healthy with high demand for premium outerwear.
          </Text>
          <View style={styles.healthBar}>
            <View style={[styles.healthFill, { width: '75%' }]} />
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={typography.caption}>VIEWS/HOUR</Text>
            <Text style={[typography.heading, { color: colors.primary }]}>2.4k</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={typography.caption}>AVG SALE PRICE</Text>
            <Text style={[typography.heading, { color: colors.primary }]}>$124.00</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={typography.caption}>LISTING GROWTH</Text>
            <Text style={[typography.heading, { color: colors.accentGreen }]}>+8.1%</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  demandRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.sm },
  categoryIcon: { width: 44, height: 44, borderRadius: radius.sm, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  changeBadge: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.pill },
  trendingGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  trendingCard: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  marketHealth: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
  healthBar: { height: 8, backgroundColor: colors.border, borderRadius: radius.pill, marginTop: spacing.sm },
  healthFill: { height: '100%', backgroundColor: colors.accentGreen, borderRadius: radius.pill },
  statsRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  statBox: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
});