import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

export default function ReviewScreen({ navigation }) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  function handleSubmit() {
    if (rating === 0) {
      Alert.alert('Please select a rating');
      return;
    }
    Alert.alert('Review Submitted!', 'Thank you for your feedback.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      title="Write a Review"
  onBack={() => navigation.goBack()}
        

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

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Submit Review
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  starsRow: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.xl, gap: spacing.sm },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  reviewInput: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, color: colors.textPrimary, height: 120, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});