import { Pressable, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../theme/theme';

export default function Button({ label, onPress, variant = 'primary' }) {
  const isLightText = variant !== 'secondary';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.base,
        styles[variant] || styles.primary,
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={isLightText ? styles.textLight : styles.textDark}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderRadius: radius.md, alignItems: 'center' },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: colors.border },
  dark: { backgroundColor: '#000000' },
  teal: { backgroundColor: colors.primaryTeal },
  textLight: { color: '#FFFFFF', fontWeight: '600', fontSize: 15 },
  textDark: { color: colors.textPrimary, fontWeight: '600', fontSize: 15 },
});