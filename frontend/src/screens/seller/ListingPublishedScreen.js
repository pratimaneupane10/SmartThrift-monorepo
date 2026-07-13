import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

export default function ListingPublishedScreen({ route, navigation }) {
  const { listing } = route.params || {};
  const title = listing?.title || 'Your Item';
  const price = listing?.price || 0;
  const condition = listing?.condition || 'Good';

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={[typography.subheading, { color: colors.primary }]}>The Exchange</Text>
        <Pressable onPress={() => navigation.navigate('SellerTabs')}>
          <Text style={{ fontSize: 20 }}>✕</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, alignItems: 'center' }}>
        <View style={styles.successCircle}>
          <Text style={{ color: '#FFFFFF', fontSize: 32 }}>✓</Text>
        </View>

        <Text style={[typography.heading, { marginTop: spacing.lg, textAlign: 'center' }]}>
          Listing Published!
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs }]}>
          Your item is now live and visible to thousands of collectors.
        </Text>

        <View style={styles.previewCard}>
          <View style={styles.demandBadge}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
              PREDICTED HIGH DEMAND
            </Text>
          </View>
          <Text style={typography.subheading}>{title}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs }}>
            <Text style={{ color: colors.accentGreen, fontWeight: '700', fontSize: 18 }}>
              {'NPR ' + Number(price).toLocaleString()}
            </Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {'Condition: ' + condition}
            </Text>
          </View>
        </View>

        <View style={styles.insightRow}>
          <Text style={{ fontSize: 16 }}>📈</Text>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={typography.subheading}>Market Insight</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              With rising interest in thrift fashion, we expect this listing to sell within 48 hours.
            </Text>
          </View>
        </View>

        <View style={styles.insightRow}>
          <Text style={{ fontSize: 16 }}>👁</Text>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={typography.subheading}>Views Predicted</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              1.2K - 2.5K views in first 24 hours
            </Text>
          </View>
        </View>

        <View style={styles.badgeRow}>
          <Text style={{ fontSize: 16 }}>🏆</Text>
          <Text style={[typography.subheading, { marginLeft: spacing.sm }]}>
            Seller Badge Unlocked!
          </Text>
        </View>

        <Pressable
          style={styles.viewBtn}
          onPress={() => navigation.navigate('SellerTabs')}
        >
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            View My Listings 👁
          </Text>
        </Pressable>

        <Pressable
          style={styles.homeBtn}
          onPress={() => navigation.navigate('SellerTabs')}
        >
          <Text style={{ color: colors.primary, fontWeight: '700' }}>
            Go to Dashboard 🏠
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  successCircle: { width: 80, height: 80, borderRadius: 999, backgroundColor: colors.accentGreen, justifyContent: 'center', alignItems: 'center' },
  previewCard: { width: '100%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
  demandBadge: { backgroundColor: colors.accentGreen, alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill, marginBottom: spacing.sm },
  insightRow: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md, width: '100%' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF9E6', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md, width: '100%' },
  viewBtn: { borderWidth: 1, borderColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg, width: '100%' },
  homeBtn: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm, width: '100%', marginBottom: spacing.xl },
});