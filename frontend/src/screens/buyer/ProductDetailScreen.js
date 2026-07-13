import { View, Text, Image, ScrollView, Pressable, StyleSheet, TouchableOpacity, Share } from 'react-native';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { colors, spacing, typography, radius } from '../../theme/theme';

export default function ProductDetailScreen({ route, navigation }) {
  const { item } = route.params;
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart } = useCart();
  const wishlisted = isWishlisted(item.id);

  const imgSource = typeof item.imageUrl === 'number'
    ? item.imageUrl
    : { uri: item.imageUrl };

  async function handleShare() {
    await Share.share({
      message: `Check out ${item.title} on Smart Thrift for NPR ${item.price}!`,
    });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', gap: spacing.md }}>
          <TouchableOpacity onPress={handleShare}>
            <Text style={{ fontSize: 20 }}>{'⬆'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={{ fontSize: 20 }}>{'🛍'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <Image source={imgSource} style={styles.image} />

        <View style={{ padding: spacing.lg }}>
          <View style={styles.badgeRow}>
            <View style={styles.verifiedBadge}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
                VERIFIED SELLER
              </Text>
            </View>
            {item.demand === 'high' && (
              <View style={styles.demandBadge}>
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
                  HIGH DEMAND
                </Text>
              </View>
            )}
          </View>

          <Text style={[typography.heading, { marginTop: spacing.sm, fontSize: 22 }]}>
            {item.title}
          </Text>

          <Text style={{ color: colors.accentGreen, fontSize: 26, fontWeight: '800', marginTop: spacing.xs }}>
            {'NPR ' + item.price}
          </Text>

          {item.demand === 'high' && (
            <View style={styles.alertBox}>
              <Text style={{ fontSize: 14 }}>{'🔴'}</Text>
              <View style={{ flex: 1, marginLeft: spacing.sm }}>
                <Text style={[typography.caption, { color: colors.danger, fontWeight: '700' }]}>
                  High Demand
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  Selling fast — only 2 left in stock.
                </Text>
              </View>
            </View>
          )}

          <Pressable
            style={styles.sellerRow}
            onPress={() => navigation.navigate('SellerProfile')}
          >
            <View style={styles.sellerAvatar} />
            <View style={{ flex: 1, marginLeft: spacing.sm }}>
              <Text style={typography.subheading}>Alex Curator</Text>
              <Text style={[typography.caption, { color: colors.primaryTeal }]}>
                {'★ 4.8 · View Store'}
              </Text>
            </View>
            <Text style={[typography.caption, { color: colors.primaryTeal }]}>
              {'View Store >'}
            </Text>
          </Pressable>

          <Text style={[typography.subheading, { marginTop: spacing.lg }]}>Description</Text>
          <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 22 }]}>
            {'Premium quality thrifted item in ' + item.condition + ' condition. Carefully verified for authenticity and quality.'}
          </Text>
          <Text style={[typography.caption, { color: colors.primaryTeal, marginTop: spacing.xs }]}>
            Read More...
          </Text>

          <View style={styles.detailsGrid}>
            <View style={styles.detailBox}>
              <Text style={typography.caption}>CONDITION</Text>
              <Text style={[typography.body, { fontWeight: '700' }]}>{item.condition}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={typography.caption}>SIZE</Text>
              <Text style={[typography.body, { fontWeight: '700' }]}>{item.size || 'M'}</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={typography.caption}>SHIPPING</Text>
              <Text style={[typography.body, { fontWeight: '700' }]}>Express</Text>
            </View>
            <View style={styles.detailBox}>
              <Text style={typography.caption}>CATEGORY</Text>
              <Text style={[typography.body, { fontWeight: '700' }]}>{item.category || 'Fashion'}</Text>
            </View>
          </View>

          <View style={styles.reviewSummary}>
            <Text style={{ fontSize: 20, color: colors.amber }}>{'★★★★★'}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: spacing.sm }]}>
              4.8 (127 reviews)
            </Text>
            <Pressable
              style={styles.viewReviewsBtn}
              onPress={() => navigation.navigate('ProductReviews', { item })}
            >
              <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
                View All
              </Text>
            </Pressable>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => {
                addToCart(item);
                navigation.navigate('Cart');
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 15 }}>
                Add to Cart
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.wishlistBtn, wishlisted && { backgroundColor: colors.primary }]}
              onPress={() => toggleWishlist(item)}
            >
              <Text style={{ fontSize: 22, color: wishlisted ? '#FFFFFF' : colors.textPrimary }}>
                {wishlisted ? '♥' : '♡'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.contactBtn}
            onPress={() => navigation.navigate('Chat', { contact: { name: 'Alex Curator' } })}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 15 }}>
              Contact Seller
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center' },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600', marginLeft: 2 },
  image: { width: '100%', height: 380 },
  badgeRow: { flexDirection: 'row', gap: spacing.sm },
  verifiedBadge: { backgroundColor: colors.primaryTeal, paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  demandBadge: { backgroundColor: colors.danger, paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  alertBox: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#FFF5F5', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  sellerRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.lg, padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md },
  sellerAvatar: { width: 44, height: 44, borderRadius: 999, backgroundColor: colors.mintIcon },
  detailsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.lg },
  detailBox: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  reviewSummary: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  viewReviewsBtn: { marginLeft: 'auto', borderWidth: 1, borderColor: colors.primaryTeal, borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  actionRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.lg },
  addToCartBtn: { flex: 1, backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  wishlistBtn: { width: 52, height: 52, borderRadius: radius.md, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  contactBtn: { backgroundColor: colors.primaryTeal, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.sm },
});