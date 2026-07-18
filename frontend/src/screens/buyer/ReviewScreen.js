import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';
import { addReview } from '../../api/productApi';

export default function ReviewScreen({ navigation, route }) {
  const { productId } = route?.params || {};
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (rating === 0) {
      Alert.alert('Please select a rating');
      return;
    }
    if (!productId) {
      Alert.alert('Error', 'Product not found. Please go back and try again.');
      return;
    }
    setLoading(true);
    try {
      await addReview(productId, { rating, comment: review });
      Alert.alert('Review Submitted!', 'Thank you for your feedback.', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Failed to submit review.';
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        title="Write a Review"
        onBack={() => navigation.goBack()}
      />

      <View style={{ padding: spacing.lg }}>
        <Text style={[typography.heading, { textAlign: 'center' }]}>
          Rate your experience
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs }]}>
          How was your purchase?
        </Text>

        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable key={star} onPress={() => setRating(star)}>
              <Text style={{ fontSize: 40, color: star <= rating ? colors.amber : colors.border }}>
                ★
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={[typography.caption, { textAlign: 'center', color: colors.textSecondary }]}>
          {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
        </Text>

        <Text style={[styles.label, { marginTop: spacing.xl }]}>YOUR REVIEW</Text>
        <TextInput
          style={styles.reviewInput}
          value={review}
          onChangeText={setReview}
          placeholder="Tell others about your experience..."
          placeholderTextColor={colors.textSecondary}
          multiline
          numberOfLines={5}
        />

        <Pressable
          style={[styles.submitBtn, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
              Submit Review
            </Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl, gap: spacing.sm },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  reviewInput: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, color: colors.textPrimary, height: 120, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});