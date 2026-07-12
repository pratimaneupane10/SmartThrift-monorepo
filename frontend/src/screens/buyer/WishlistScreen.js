import { View, Text, FlatList, Image, Pressable, StyleSheet } from 'react-native';
import { useWishlist } from '../../context/WishlistContext';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

export default function WishlistScreen({ navigation }) {
  const { items, toggleWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <BackHeader title="My Wishlist" onBack={() => navigation.goBack()} />
        <View style={styles.empty}>
          <Text style={{ fontSize: 64 }}>♡</Text>
          <Text style={[typography.heading, { marginTop: spacing.md }]}>
            Nothing saved yet
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs, textAlign: 'center' }]}>
            Tap the heart on any item to save it here
          </Text>
          <Pressable
            style={styles.shopBtn}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Start Shopping</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        title={`My Wishlist (${items.length})`}
        onBack={() => navigation.goBack()}
      />
      <FlatList
        data={items}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        columnWrapperStyle={{ gap: spacing.sm }}
        renderItem={({ item }) => {
          const imgSource = typeof item.imageUrl === 'number'
            ? item.imageUrl
            : { uri: item.imageUrl };
          return (
            <Pressable
              style={styles.card}
              onPress={() => navigation.navigate('ProductDetail', { item })}
            >
              <Image source={imgSource} style={styles.image} />
              <Pressable
                style={styles.heartBtn}
                onPress={() => toggleWishlist(item)}
              >
                <Text style={{ color: colors.danger, fontSize: 18 }}>♥</Text>
              </Pressable>
              {item.demand === 'high' && (
                <View style={styles.badge}>
                  <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>
                    HIGH DEMAND
                  </Text>
                </View>
              )}
              <Text
                style={[typography.subheading, { marginTop: spacing.xs, fontSize: 13 }]}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text style={{ color: colors.accentGreen, fontWeight: '700', fontSize: 13 }}>
                NPR {item.price}
              </Text>
              <Text style={typography.caption}>{item.condition}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  shopBtn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, marginTop: spacing.lg },
  card: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.sm, position: 'relative' },
  image: { width: '100%', aspectRatio: 0.85, borderRadius: radius.sm },
  heartBtn: { position: 'absolute', top: spacing.sm, right: spacing.sm, backgroundColor: '#FFFFFF', borderRadius: 999, width: 28, height: 28, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  badge: { position: 'absolute', top: spacing.xs, left: spacing.xs, backgroundColor: colors.accentGreen, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill },
});