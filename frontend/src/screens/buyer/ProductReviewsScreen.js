import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const REVIEWS = [
  { id: '1', name: 'Ramesh T.', rating: 5, comment: 'Amazing quality! Exactly as described. Fast shipping.', date: 'Jun 20, 2026', verified: true },
  { id: '2', name: 'Sita S.', rating: 4, comment: 'Good condition, slight wear but acceptable for the price.', date: 'Jun 18, 2026', verified: true },
  { id: '3', name: 'Hari P.', rating: 5, comment: 'Seller was very responsive. Item arrived well packaged.', date: 'Jun 15, 2026', verified: false },
];

export default function ProductReviewsScreen({ route, navigation }) {
  const { item } = route.params || {};
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [showForm, setShowForm] = useState(false);

  const avgRating = REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length;

  function submitReview() {
    if (rating === 0) {
      Alert.alert('Please select a rating');
      return;
    }
    if (review.length < 10) {
      Alert.alert('Please write at least 10 characters');
      return;
    }
    Alert.alert('✅ Review Submitted!', 'Thank you for your feedback!', [
      { text: 'OK', onPress: () => { setShowForm(false); setRating(0); setReview(''); } }
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Reviews</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.summaryCard}>
          <Text style={{ fontSize: 48, fontWeight: '800', color: colors.primary }}>
            {avgRating.toFixed(1)}
          </Text>
          <View style={{ marginLeft: spacing.lg }}>
            <View style={{ flexDirection: 'row' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={{ fontSize: 24, color: star <= Math.round(avgRating) ? colors.amber : colors.border }}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              Based on {REVIEWS.length} reviews
            </Text>
          </View>
        </View>

        {[5, 4, 3, 2, 1].map((star) => {
          const count = REVIEWS.filter((r) => r.rating === star).length;
          const percentage = (count / REVIEWS.length) * 100;
          return (
            <View key={star} style={styles.ratingBar}>
              <Text style={[typography.caption, { width: 20 }]}>{star}★</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${percentage}%` }]} />
              </View>
              <Text style={[typography.caption, { width: 20, textAlign: 'right' }]}>{count}</Text>
            </View>
          );
        })}

        <Pressable
          style={styles.writeReviewBtn}
          onPress={() => setShowForm(!showForm)}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
            {showForm ? 'Cancel' : '✏ Write a Review'}
          </Text>
        </Pressable>

        {showForm && (
          <View style={styles.reviewForm}>
            <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>
              Your Rating
            </Text>
            <View style={{ flexDirection: 'row', marginBottom: spacing.md }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable key={star} onPress={() => setRating(star)}>
                  <Text style={{ fontSize: 36, color: star <= rating ? colors.amber : colors.border }}>
                    ★
                  </Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={styles.reviewInput}
              value={review}
              onChangeText={setReview}
              placeholder="Share your experience with this item..."
              placeholderTextColor={colors.textSecondary}
              multiline
              numberOfLines={4}
            />
            <Pressable style={styles.submitBtn} onPress={submitReview}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Submit Review</Text>
            </Pressable>
          </View>
        )}

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.md }]}>
          Customer Reviews
        </Text>

        {REVIEWS.map((rev) => (
          <View key={rev.id} style={styles.reviewCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.reviewAvatar}>
                  <Text style={{ fontWeight: '700', color: colors.primary }}>
                    {rev.name[0]}
                  </Text>
                </View>
                <View style={{ marginLeft: spacing.sm }}>
                  <Text style={typography.subheading}>{rev.name}</Text>
                  {rev.verified && (
                    <Text style={[typography.caption, { color: colors.accentGreen }]}>
                      ✓ Verified Purchase
                    </Text>
                  )}
                </View>
              </View>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{rev.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', marginVertical: spacing.xs }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Text key={star} style={{ color: star <= rev.rating ? colors.amber : colors.border }}>
                  ★
                </Text>
              ))}
            </View>
            <Text style={[typography.body, { color: colors.textSecondary }]}>{rev.comment}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 36 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  summaryCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.md },
  ratingBar: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.xs },
  barTrack: { flex: 1, height: 8, backgroundColor: colors.border, borderRadius: radius.pill, marginHorizontal: spacing.sm },
  barFill: { height: '100%', backgroundColor: colors.amber, borderRadius: radius.pill },
  writeReviewBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  reviewForm: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  reviewInput: { backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, color: colors.textPrimary, height: 100, textAlignVertical: 'top', marginBottom: spacing.md },
  submitBtn: { backgroundColor: colors.accentGreen, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  reviewCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  reviewAvatar: { width: 36, height: 36, borderRadius: 999, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
});