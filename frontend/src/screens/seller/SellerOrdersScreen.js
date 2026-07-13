import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const ORDERS = [
  {
    id: '#ST-001',
    buyer: 'Ramesh Thapa',
    date: 'Jun 24, 2026',
    status: 'PROCESSING',
    items: [{ id: '1', title: 'Vintage Denim Jacket', price: 1200, image: require('../../../assets/item1.jpg') }],
    total: 1395,
    address: 'Baneshwor, Kathmandu',
    payment: 'eSewa',
  },
  {
    id: '#ST-002',
    buyer: 'Sita Sharma',
    date: 'Jun 22, 2026',
    status: 'SHIPPED',
    items: [{ id: '2', title: 'Wool Overcoat', price: 3145, image: require('../../../assets/item3.jpg') }],
    total: 3340,
    address: 'Lalitpur, Nepal',
    payment: 'Cash on Delivery',
  },
  {
    id: '#ST-003',
    buyer: 'Hari Prasad',
    date: 'Jun 20, 2026',
    status: 'DELIVERED',
    items: [{ id: '3', title: 'Black Hoodie', price: 1145, image: require('../../../assets/item4.jpg') }],
    total: 1340,
    address: 'Bhaktapur, Nepal',
    payment: 'Cash on Delivery',
  },
  {
    id: '#ST-004',
    buyer: 'Maya Gurung',
    date: 'Jun 18, 2026',
    status: 'DELIVERED',
    items: [{ id: '4', title: 'White Dress Shirt', price: 2268, image: require('../../../assets/item2.jpg') }],
    total: 2463,
    address: 'Pokhara, Nepal',
    payment: 'eSewa',
  },
  {
    id: '#ST-005',
    buyer: 'Bikash KC',
    date: 'Jun 15, 2026',
    status: 'CANCELLED',
    items: [{ id: '5', title: 'Plain White Tee', price: 900, image: require('../../../assets/item5.jpg') }],
    total: 1095,
    address: 'Chitwan, Nepal',
    payment: 'Cash on Delivery',
  },
];

const STATUS_COLORS = {
  PROCESSING: colors.amber,
  SHIPPED: colors.primaryTeal,
  DELIVERED: colors.accentGreen,
  CANCELLED: colors.danger,
};

export default function SellerOrdersScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [orders, setOrders] = useState(ORDERS);

  const filtered = filter === 'All'
    ? orders
    : orders.filter((o) => o.status === filter);

  function updateStatus(id, newStatus) {
    setOrders((prev) =>
      prev.map((o) => o.id === id ? { ...o, status: newStatus } : o)
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>My Orders</Text>
        <Text style={[typography.caption, { color: colors.primaryTeal }]}>
          {orders.length} total
        </Text>
      </View>

      <View style={styles.statsRow}>
        {[
          { label: 'Processing', count: orders.filter(o => o.status === 'PROCESSING').length, color: colors.amber },
          { label: 'Shipped', count: orders.filter(o => o.status === 'SHIPPED').length, color: colors.primaryTeal },
          { label: 'Delivered', count: orders.filter(o => o.status === 'DELIVERED').length, color: colors.accentGreen },
          { label: 'Cancelled', count: orders.filter(o => o.status === 'CANCELLED').length, color: colors.danger },
        ].map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Text style={[typography.heading, { color: stat.color, fontSize: 20 }]}>{stat.count}</Text>
            <Text style={[typography.caption, { textAlign: 'center' }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 50, paddingHorizontal: spacing.md }}
      >
        {['All', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((f) => (
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
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={typography.subheading}>{order.id}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {order.date} · {order.buyer}
                </Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLORS[order.status] + '22' }]}>
                <Text style={{ color: STATUS_COLORS[order.status], fontSize: 11, fontWeight: '700' }}>
                  {order.status}
                </Text>
              </View>
            </View>

            {order.items.map((item) => (
              <View key={item.id} style={styles.itemRow}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={typography.subheading} numberOfLines={1}>{item.title}</Text>
                  <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                    {'NPR ' + item.price}
                  </Text>
                </View>
              </View>
            ))}

            <View style={styles.orderFooter}>
              <View>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {'Total: NPR ' + order.total}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {order.payment}
                </Text>
              </View>

              {order.status === 'PROCESSING' && (
                <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                  <Pressable
                    style={styles.shipBtn}
                    onPress={() => updateStatus(order.id, 'SHIPPED')}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>
                      Mark Shipped
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.cancelBtn}
                    onPress={() => updateStatus(order.id, 'CANCELLED')}
                  >
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>
                      Cancel
                    </Text>
                  </Pressable>
                </View>
              )}

              {order.status === 'SHIPPED' && (
                <Pressable
                  style={styles.shipBtn}
                  onPress={() => updateStatus(order.id, 'DELIVERED')}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>
                    Mark Delivered
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
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
  statsRow: { flexDirection: 'row', padding: spacing.md, gap: spacing.sm },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.sm, alignItems: 'center' },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill, backgroundColor: colors.surface, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.primary },
  orderCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  itemRow: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  itemImage: { width: 60, height: 60, borderRadius: radius.sm },
  orderFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.sm },
  shipBtn: { backgroundColor: colors.primaryTeal, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
  cancelBtn: { backgroundColor: colors.danger, borderRadius: radius.sm, paddingHorizontal: spacing.sm, paddingVertical: spacing.xs },
});