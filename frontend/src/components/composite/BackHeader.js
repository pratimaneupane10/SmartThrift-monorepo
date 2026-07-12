import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme/theme';

export default function BackHeader({
  title,
  onBack,
  rightText,
  rightIcon,
  onRightPress,
  backgroundColor,
}) {
  return (
    <View style={[styles.header, backgroundColor && { backgroundColor }]}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          style={styles.backBtn}
          accessibilityRole="button"
          accessibilityLabel="Go back"
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}

      {title ? (
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {(rightText || rightIcon) ? (
        <Pressable onPress={onRightPress} style={styles.rightBtn}>
          {rightIcon && <Text style={{ fontSize: 20 }}>{rightIcon}</Text>}
          {rightText && (
            <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
              {rightText}
            </Text>
          )}
        </Pressable>
      ) : (
        <View style={styles.rightBtn} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 70,
  },
  backArrow: {
    fontSize: 36,
    color: colors.primary,
    fontWeight: '300',
    lineHeight: 36,
    marginRight: 2,
  },
  backText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  rightBtn: {
    minWidth: 70,
    alignItems: 'flex-end',
  },
});