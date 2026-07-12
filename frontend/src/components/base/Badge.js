import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../theme/theme';

const VARIANT_COLORS = {
  success: colors.accentGreen,
  danger: colors.danger,
  amber: colors.amber,
  neutral: colors.surface,
};

export default function Badge({ label, variant = 'success' }) {
  const isNeutral = variant === 'neutral';
  return (
    <View style={[styles.badge, { backgroundColor: VARIANT_COLORS[variant] }]}>
      <Text style={{ color: isNeutral ? colors.textPrimary : '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { alignSelf: 'flex-start', paddingVertical: 2, paddingHorizontal: spacing.sm, borderRadius: radius.pill },
});