import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import Badge from '../base/Badge';
import { colors, spacing, radius, typography } from '../../theme/theme';

export default function ItemCard({ item, onPress }) {
  const imgSource = typeof item.imageUrl === 'number'
    ? item.imageUrl
    : { uri: item.imageUrl };

  return (
    <Pressable onPress={() => onPress(item)} style={styles.card}>
      <Image source={imgSource} style={styles.image} />
      <View style={styles.badgeOverlay}>
        {item.demand === 'high' && <Badge label="HIGH DEMAND" variant="success" />}
        {item.demand === 'moderate' && <Badge label="MODERATE" variant="amber" />}
      </View>
      <Text style={[typography.subheading, { marginTop: spacing.xs }]} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={{ color: colors.accentGreen, fontWeight: '700', fontSize: 14 }}>
        NPR {item.price}
      </Text>
      <Text style={typography.caption}>{item.condition}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 160, marginRight: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.sm },
  image: { width: '100%', height: 180, borderRadius: radius.sm },
  badgeOverlay: { position: 'absolute', top: spacing.xs, left: spacing.xs },
});