import { View, Text, FlatList, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useCart } from '../../context/CartContext';

export default function CartScreen({ navigation }) {
  const { items, updateQty, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
            <Text style={styles.backArrow}>{'<'}</Text>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
          <Text style={typography.subheading}>Your Cart</Text>
          <View style={{ width: 70 }} />
        </View>
        <View style={styles.emptyState}>
          <Text style={{ fontSize: 64 }}>🛍</Text>
          <Text style={[typography.heading, { marginTop: spacing.md }]}>Your cart is empty</Text>
          <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
            Add items from the marketplace
          </Text>
          <Pressable style={styles.shopBtn} onPress={() => navigation.goBack()}>
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Continue Shopping</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>{'Cart (' + items.length + ')'}</Text>
        <Pressable onPress={clearCart}>
          <Text style={[typography.caption, { color: colors.danger }]}>Clear All</Text>
        </Pressable>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => {
          const imgSource = typeof item.imageUrl === 'number' ? item.imageUrl : { uri: item.imageUrl };
          return (
            <View style={styles.card}>
              <View style={styles.verifiedBadge}>
                <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>
                  VERIFIED SELLER
                </Text>
              </View>
              <View style={styles.cardInner}>
                <Image source={imgSource} style={styles.image} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={typography.subheading} numberOfLines={2}>{item.title}</Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {'Size: ' + (item.size || 'M')}
                  </Text>
                  {item.demand === 'high' && (
                    <View style={styles.demandBadge}>
                      <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>
                        HIGH DEMAND
                      </Text>
                    </View>
                  )}
                  <Text style={{ color: colors.accentGreen, fontWeight: '800', fontSize: 16, marginTop: spacing.xs }}>
                    {'NPR ' + (item.price * item.qty)}
                  </Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {'NPR ' + item.price + ' each'}
                  </Text>

                  <View style={styles.qtyRow}>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => updateQty(item.id, item.qty - 1)}
                    >
                      <Text style={{ fontWeight: '700', fontSize: 18 }}>-</Text>
                    </Pressable>
                    <View style={styles.qtyDisplay}>
                      <Text style={[typography.subheading, { color: colors.primary }]}>
                        {item.qty}
                      </Text>
                    </View>
                    <Pressable
                      style={styles.qtyBtn}
                      onPress={() => updateQty(item.id, item.qty + 1)}
                    >
                      <Text style={{ fontWeight: '700', fontSize: 18 }}>+</Text>
                    </Pressable>
                    <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: spacing.sm }]}>
                      {item.qty > 1 ? item.qty + ' items' : '1 item'}
                    </Text>
                  </View>
                </View>
                <Pressable
                  onPress={() => removeFromCart(item.id)}
                  style={{ padding: spacing.xs }}
                >
                  <Text style={{ fontSize: 20, color: colors.danger }}>🗑</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
        ListFooterComponent={() => (
          <View style={styles.summary}>
            <Text style={[typography.subheading, { marginBottom: spacing.md }]}>
              Order Summary
            </Text>
            {items.map((item) => (
              <View key={item.id} style={styles.summaryRow}>
                <Text style={[typography.body, { flex: 1 }]} numberOfLines={1}>
                  {item.title + ' x' + item.qty}
                </Text>
                <Text style={typography.body}>
                  {'NPR ' + (item.price * item.qty)}
                </Text>
              </View>
            ))}
            <View style={[styles.summaryRow, { marginTop: spacing.xs }]}>
              <Text style={typography.body}>Shipping</Text>
              <Text style={typography.body}>NPR 150</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={typography.body}>Platform Fee</Text>
              <Text style={typography.body}>NPR 45</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={[typography.heading, { fontSize: 16 }]}>TOTAL</Text>
              <Text style={[typography.heading, { color: colors.primary }]}>
                {'NPR ' + (totalPrice + 195)}
              </Text>
            </View>
            <Pressable
              style={styles.checkoutBtn}
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
                Proceed to Checkout →
              </Text>
            </Pressable>
            <View style={styles.protectionRow}>
              <Text style={{ fontSize: 16 }}>🛡</Text>
              <Text style={[typography.caption, { color: colors.textSecondary, flex: 1, marginLeft: spacing.xs }]}>
                CURATOR PROTECTION — Every purchase is verified.
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.lg },
  shopBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, paddingHorizontal: spacing.xl, marginTop: spacing.lg },
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  verifiedBadge: { backgroundColor: colors.primaryTeal, alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill, marginBottom: spacing.xs },
  cardInner: { flexDirection: 'row' },
  image: { width: 100, height: 120, borderRadius: radius.md },
  demandBadge: { backgroundColor: colors.accentGreen, alignSelf: 'flex-start', paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill, marginTop: spacing.xs },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  qtyBtn: { width: 32, height: 32, borderRadius: 999, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  qtyDisplay: { width: 40, alignItems: 'center' },
  summary: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, marginTop: spacing.md },
  checkoutBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  protectionRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
});