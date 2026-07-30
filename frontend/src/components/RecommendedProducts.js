import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { colors, spacing, typography, radius } from '../theme/theme';
import { getProducts } from '../api/productApi';

export default function RecommendedProducts({ productId, onPressItem }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [productId]);

  async function fetchRecommendedProducts() {
    try {
      setLoading(true);
      const data = await getProducts({ limit: 12 });
      const allProducts = data.products || [];
      // Filter out the current product and get up to 6 recommendations
      const recommended = allProducts
        .filter((p) => p._id !== productId && p.id !== productId)
        .slice(0, 6);
      setProducts(recommended);
    } catch (err) {
      console.error('Failed to fetch recommended products:', err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionDivider} />
      
      <View style={styles.sectionHeader}>
        <Text style={[typography.subheading, { marginBottom: spacing.md }]}>
          You Might Also Like
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: spacing.sm, paddingHorizontal: 0 }}
      >
        {products.map((product) => {
          const imgSource = product.imageUrl
            ? { uri: product.imageUrl }
            : require('../../assets/item1.jpg');

          return (
            <Pressable
              key={product._id}
              style={styles.card}
              onPress={() => onPressItem(product)}
            >
              <Image
                source={imgSource}
                style={styles.image}
                resizeMode="cover"
              />
              <Text style={[typography.caption, { marginTop: spacing.xs }]} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={{ color: colors.accentGreen, fontWeight: '700', fontSize: 13, marginTop: spacing.xs }}>
                NPR {product.price}
              </Text>
              <View style={styles.ratingBadge}>
                <Text style={{ fontSize: 10, color: colors.amber }}>★</Text>
                <Text style={[typography.caption, { marginLeft: 2, color: colors.textSecondary }]}>
                  {product.averageRating || '4.5'}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl * 2,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    paddingHorizontal: 0,
  },
  card: {
    width: 140,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: radius.sm,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.xs,
  },
});
