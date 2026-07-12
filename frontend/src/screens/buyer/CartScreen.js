import { View, Text, FlatList, Pressable, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useCart } from '../../context/CartContext';
import BackHeader from '../../components/composite/BackHeader';

export default function CartScreen({ navigation }) {
  const { items, updateQty, removeFromCart, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <Text style={{ fontSize: 48 }}>🛍</Text>
        <Text style={[typography.heading, { marginTop: spacing.md }]}>Your cart is empty</Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          Add items from the marketplace
        </Text>
        <Pressable style={styles.shopBtn} onPress={() => navigation.goBack()}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Continue Shopping</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Your Selection"
  onBack={() => navigation.goBack()}
  rightText="Clear"
  onRightPress={clearCart}
/>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.verifiedBadge}>
              <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>✓ VERIFIED SELLER</Text>
            </View>
            <View style={styles.cardInner}>
              source={typeof item.imageUrl === 'number' ? item.imageUrl : { uri: item.imageUrl }}
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={typography.subheading} numberOfLines={2}>{item.title}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  Size: {item.size || 'M'}
                </Text>
                {item.demand === 'high' && (
                  <View style={styles.demandBadge}>
                    <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>HIGH DEMAND</Text>
                  </View>
                )}
                <Text style={{ color: colors.accentGreen, fontWeight: '800', fontSize: 18, marginTop: spacing.xs }}>
                  NPR {item.price * item.qty}
                </Text>
                <View style={styles.qtyRow}>
                  <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, item.qty - 1)}>
                    <Text style={{ fontWeight: '700' }}>-</Text>
                  </Pressable>
                  <Text style={{ marginHorizontal: spacing.md, fontWeight: '700' }}>{item.qty}</Text>
                  <Pressable style={styles.qtyBtn} onPress={() => updateQty(item.id, item.qty + 1)}>
                    <Text style={{ fontWeight: '700' }}>+</Text>
                  </Pressable>
                </View>
              </View>
              <Pressable onPress={() => removeFromCart(item.id)} style={{ padding: spacing.xs }}>
                <Text style={{ fontSize: 18, color: colors.textSecondary }}>🗑</Text>
              </Pressable>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={styles.summary}>
            <Text style={typography.subheading}>Order Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={typography.body}>Subtotal</Text>
              <Text style={typography.body}>NPR {totalPrice}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={typography.body}>Estimated Shipping</Text>
              <Text style={typography.body}>NPR 150</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={typography.body}>Platform Fee</Text>
              <Text style={typography.body}>NPR 45</Text>
            </View>
            <View style={[styles.summaryRow, { marginTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md }]}>
              <Text style={[typography.heading, { fontSize: 16 }]}>TOTAL AMOUNT</Text>
              <Text style={[typography.heading, { color: colors.primary }]}>
                NPR {totalPrice + 195}
              </Text>
            </View>
            <Pressable style={styles.checkoutBtn} onPress={() => navigation.navigate('Checkout')}>
  <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Proceed to Checkout →</Text>
</Pressable>
            <View style={styles.protectionRow}>
              <Text style={{ fontSize: 16 }}>🛡</Text>
              <Text style={[typography.caption, { color: colors.textSecondary, flex: 1, marginLeft: spacing.xs }]}>
                CURATOR PROTECTION — Every purchase is verified for authenticity and quality.
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
  card: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  verifiedBadge: { backgroundColor: colors.primaryTeal, alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill, marginBottom: spacing.xs },
  cardInner: { flexDirection: 'row' },
  image: { width: 100, height: 120, borderRadius: radius.md },
  demandBadge: { backgroundColor: colors.accentGreen, alignSelf: 'flex-start', paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill, marginTop: spacing.xs },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.sm },
  qtyBtn: { width: 28, height: 28, borderRadius: 999, backgroundColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  summary: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  checkoutBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  protectionRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
  shopBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, paddingHorizontal: spacing.xl, marginTop: spacing.lg },
});