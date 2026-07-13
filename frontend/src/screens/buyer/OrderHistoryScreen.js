import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const BUYER_ORDERS = [
  {
    id: '#12346',
    date: 'October 18, 2023',
    status: 'IN TRANSIT',
    estDelivery: 'Oct 24, 2023',
    seller: 'Maya Store',
    items: [
      { id: '1', title: 'Vintage Denim Jacket', price: 1200, qty: 1, image: require('../../../assets/item1.jpg') },
      { id: '2', title: 'Wool Overcoat', price: 3145, qty: 1, image: require('../../../assets/item3.jpg') },
    ],
    subtotal: 4345,
    total: 4540,
  },
  {
    id: '#12345',
    date: 'September 12, 2023',
    status: 'DELIVERED',
    seller: 'Aarav Shop',
    items: [
      { id: '3', title: 'Ankle Boots', price: 2500, qty: 2, image: require('../../../assets/item6.jpg') },
    ],
    subtotal: 5000,
    total: 5195,
  },
  {
    id: '#12344',
    date: 'September 20, 2023',
    status: 'RETURNED',
    seller: 'Priya Store',
    items: [
      { id: '4', title: 'Plain White Tee', price: 900, qty: 3, image: require('../../../assets/item5.jpg') },
    ],
    subtotal: 2700,
    total: 2895,
  },
];

const STATUS_COLORS = {
  'IN TRANSIT': colors.amber,
  'DELIVERED': colors.accentGreen,
  'RETURNED': colors.danger,
  'PROCESSING': colors.primaryTeal,
  'CANCELLED': colors.danger,
};

export default function OrderHistoryScreen({ navigation }) {
  const [filter, setFilter] = useState('All');

  const filtered = filter === 'All'
    ? BUYER_ORDERS
    : BUYER_ORDERS.filter((o) => o.status === filter);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Order History</Text>
        <Text style={[typography.caption, { color: colors.primaryTeal }]}>
          {BUYER_ORDERS.length} orders
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 50, paddingHorizontal: spacing.md }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {['All', 'IN TRANSIT', 'DELIVERED', 'RETURNED'].map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
          >
            <Text style={{ color: filter === f ? '#FFFFFF' : colors.textPrimary, fontSize: 12 }}>
              {f}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {filtered.map((order) => (
          <Pressable
            key={order.id}
            style={styles.orderCard}
            onPress={() => navigation.navigate('OrderDetail', { order })}
          >
            <View style={styles.orderHeader}>
              <View>
                <Text style={typography.subheading}>{order.id}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {order.date} · {order.seller}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[order.status] + '22' }]}>
                <Text style={{ color: STATUS_COLORS[order.status], fontSize: 11, fontWeight: '700' }}>
                  {order.status}
                </Text>
              </View>
            </View>

            {order.status === 'IN TRANSIT' && order.estDelivery && (
              <Text style={[typography.caption, { color: colors.amber, marginBottom: spacing.sm }]}>
                {'Est. Delivery: ' + order.estDelivery}
              </Text>
            )}

            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={typography.subheading} numberOfLines={1}>{item.title}</Text>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {'Qty: ' + item.qty + ' × NPR ' + item.price}
                  </Text>
                  <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                    {'NPR ' + (item.price * item.qty)}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.orderFooter}>
              <Text style={[typography.subheading, { color: colors.primary }]}>
                {'Total: NPR ' + order.total}
              </Text>
              <View style={{ flexDirection: 'row', gap: spacing.sm }}>
                {order.status === 'IN TRANSIT' && (
                  <Pressable
                    style={styles.trackBtn}
                    onPress={() => navigation.navigate('TrackOrder')}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>
                      Track Package
                    </Text>
                  </Pressable>
                )}
                {order.status === 'DELIVERED' && (
                  <Pressable
                    style={styles.reviewBtn}
                    onPress={() => navigation.navigate('ProductReviews', { item: order.items[0] })}
                  >
                    <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '700' }}>
                      Write Review
                    </Text>
                  </Pressable>
                )}
                {order.status === 'RETURNED' && (
                  <Pressable style={styles.refundBtn}>
                    <Text style={{ color: colors.danger, fontSize: 12, fontWeight: '700' }}>
                      View Refund
                    </Text>
                  </Pressable>
                )}
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill, backgroundColor: colors.surface, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.primary },
  orderCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  itemImage: { width: 60, height: 60, borderRadius: radius.sm },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.sm },
  trackBtn: { backgroundColor: colors.primary, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  reviewBtn: { borderWidth: 1, borderColor: colors.primary, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  refundBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
});