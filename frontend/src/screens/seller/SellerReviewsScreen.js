import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const REVIEWS = [
  { id: '1', buyer: 'Ramesh T.', item: 'Vintage Denim Jacket', rating: 5, comment: 'Excellent quality! Exactly as described. Will buy again.', date: 'Jun 20, 2026', verified: true },
  { id: '2', buyer: 'Sita S.', item: 'Wool Overcoat', rating: 4, comment: 'Good condition, slight wear but great value for money.', date: 'Jun 18, 2026', verified: true },
  { id: '3', buyer: 'Hari P.', item: 'Black Hoodie', rating: 5, comment: 'Fast shipping! Item was well packaged and authentic.', date: 'Jun 15, 2026', verified: true },
  { id: '4', buyer: 'Maya G.', item: 'White Dress Shirt', rating: 3, comment: 'Item was okay but description could be more detailed.', date: 'Jun 12, 2026', verified: false },
];

export default function SellerReviewsScreen({ navigation }) {
  const avgRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;
  const totalReviews = REVIEWS.length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>My Reviews</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.summaryCard}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 48, fontWeight: '800', color: colors.primary }}>
              {avgRating.toFixed(1)}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={{ fontSize: 20, color: star <= Math.round(avgRating) ? colors.amber : colors.border }}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              {totalReviews + ' reviews'}
            </Text>
          </View>
          <View style={{ flex: 1, marginLeft: spacing.lg }}>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = REVIEWS.filter((r) => r.rating === star).length;
              const pct = (count / totalReviews) * 100;
              return (
                <View key={star} style={styles.ratingBar}>
                  <Text style={[typography.caption, { width: 20 }]}>{star}★</Text>
                  <View style={styles.barTrack}>
                    <View style={[styles.barFill, { width: pct + '%' }]} />
                  </View>
                  <Text style={[typography.caption, { width: 20, textAlign: 'right' }]}>{count}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.tipsCard}>
          <Text style={{ fontSize: 16 }}>💡</Text>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={[typography.subheading, { fontSize: 14 }]}>Improve Your Rating</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              Respond to buyers quickly and describe items accurately to maintain high ratings.
            </Text>
          </View>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          All Reviews
        </Text>

        {REVIEWS.map((rev) => (
          <View key={rev.id} style={styles.reviewCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.avatar}>
                  <Text style={{ fontWeight: '700', color: colors.primary }}>
                    {rev.buyer[0]}
                  </Text>
                </View>
                <View style={{ marginLeft: spacing.sm }}>
                  <Text style={typography.subheading}>{rev.buyer}</Text>
                  {rev.verified && (
                    <Text style={[typography.caption, { color: colors.accentGreen }]}>
                      ✓ Verified Purchase
                    </Text>
                  )}
                </View>
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{rev.date}</Text>
            </View>
            <Text style={[typography.caption, { color: colors.primaryTeal, marginTop: spacing.xs }]}>
              {rev.item}
            </Text>
            <View style={{ flexDirection: 'row', marginVertical: spacing.xs }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={{ color: star <= rev.rating ? colors.amber : colors.border }}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={[typography.body, { color: colors.textSecondary, lineHeight: 20 }]}>
              {rev.comment}
            </Text>
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
  summaryCard: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg },
  ratingBar: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  barTrack: { flex: 1, height: 6, backgroundColor: colors.border, borderRadius: radius.pill, marginHorizontal: spacing.xs },
  barFill: { height: '100%', backgroundColor: colors.amber, borderRadius: radius.pill },
  tipsCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFBF0', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md, borderWidth: 1, borderColor: colors.amber },
  reviewCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  avatar: { width: 36, height: 36, borderRadius: 999, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
});