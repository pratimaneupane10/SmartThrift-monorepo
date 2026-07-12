import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme/theme';

export default function Header({ title, onBack, rightIcon, onRightPress }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable onPress={onBack} style={styles.backBtn}>
          <Text style={{ fontSize: 20 }}>←</Text>
        </Pressable>
      ) : (
        <View style={styles.backBtn} />
      )}
      <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
        {title}
      </Text>
      <Pressable onPress={onRightPress} style={styles.backBtn}>
        <Text style={{ fontSize: 20 }}>{rightIcon || ''}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backBtn: { width: 36, height: 36, justifyContent: 'center', alignItems: 'center' },
});