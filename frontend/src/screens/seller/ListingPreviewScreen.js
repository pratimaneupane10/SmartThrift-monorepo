import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

export default function ListingPreviewScreen({ route, navigation }) {
  const { listing } = route.params || {};
  const title = listing?.title || 'HERITAGE MOTO JACKET';
  const price = listing?.price || 2800;
  const size = listing?.size || 'S';
  const material = listing?.material || 'Full-Grain Leather';
  const condition = listing?.condition || 'Good';
  const image = listing?.image || require('../../../assets/item6.jpg');

  const imgSource = typeof image === 'string' ? { uri: image } : image;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Preview"
  onBack={() => navigation.goBack()}
  rightText="Help"
/>

      <ScrollView>
        <View style={{ position: 'relative' }}>
          <Image source={imgSource} style={styles.image} />
          <View style={styles.demandBadge}>
            <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
              PREDICTED HIGH DEMAND
            </Text>
          </View>
        </View>

        <View style={{ padding: spacing.lg }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={[typography.heading, { fontSize: 22, textTransform: 'uppercase' }]}>
                {title}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Size {size} · {material}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>NPR</Text>
              <Text style={[typography.heading, { color: colors.accentGreen, fontSize: 28 }]}>
                {price}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                MARKET VALUE{'\n'}PEAK
              </Text>
            </View>
          </View>

          <View style={styles.insightsCard}>
            <Text style={typography.subheading}>MARKET INSIGHTS</Text>
            <View style={styles.insightRow}>
              <Text style={typography.body}>Rising interest in luxury outerwear</Text>
              <Text style={[typography.caption, { color: colors.accentGreen }]}>+44%</Text>
            </View>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              Demand for this category has grown by 16% this week.
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={typography.caption}>LISTING ACCURACY</Text>
              <Text style={[typography.subheading, { color: colors.accentGreen }]}>High</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={typography.caption}>ESTIMATED SELL TIME</Text>
              <Text style={[typography.subheading, { color: colors.primary }]}>24-48 Hours</Text>
            </View>
          </View>

          <Pressable
            style={styles.publishBtn}
            onPress={() =>
              navigation.navigate('ListingPublished', {
                listing: { title, price, condition, size, material },
              })
            }
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
              PUBLISH LISTING
            </Text>
          </Pressable>

          <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.sm }]}>
            By publishing, you agree to our Editorial Marketplace Standards
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  image: { width: '100%', height: 380 },
  demandBadge: { position: 'absolute', top: spacing.md, left: spacing.md, backgroundColor: colors.accentGreen, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: radius.pill },
  insightsCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
  insightRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  statsRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
  statBox: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  publishBtn: { backgroundColor: colors.accentGreen, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});