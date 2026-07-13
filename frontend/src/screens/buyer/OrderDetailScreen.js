import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

export default function OrderDetailScreen({ route, navigation }) {
  const { order } = route.params || {
    order: {
      id: '#12346',
      date: 'October 18, 2023',
      status: 'IN TRANSIT',
      items: [
        { id: '1', title: 'Vintage Denim Jacket', price: 1200, qty: 1, image: require('../../../assets/item1.jpg') },
      ],
      subtotal: 1200,
      shipping: 150,
      platformFee: 45,
      total: 1395,
      address: 'Baneshwor, Kathmandu',
      payment: 'eSewa',
    }
  };

  const statusColors = {
    'IN TRANSIT': colors.amber,
    'DELIVERED': colors.accentGreen,
    'RETURNED': colors.danger,
    'PROCESSING': colors.primaryTeal,
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Order Details</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.statusCard}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={typography.subheading}>Order {order.id}</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColors[order.status] + '22' }]}>
              <Text style={{ color: statusColors[order.status], fontWeight: '700', fontSize: 12 }}>
                {order.status}
              </Text>
            </View>
          </View>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Placed on {order.date}
          </Text>

          <Pressable
            style={styles.trackBtn}
            onPress={() => navigation.navigate('TrackOrder')}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Track Package</Text>
          </Pressable>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Items Ordered
        </Text>
        {order.items.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading} numberOfLines={2}>{item.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {'Qty: ' + item.qty}
              </Text>
              <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                {'NPR ' + item.price}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.summaryCard}>
          <Text style={[typography.subheading, { marginBottom: spacing.md }]}>
            Order Summary
          </Text>
          {[
            { label: 'Subtotal', value: 'NPR ' + order.subtotal },
            { label: 'Shipping', value: 'NPR ' + order.shipping },
            { label: 'Platform Fee', value: 'NPR ' + order.platformFee },
          ].map((row) => (
            <View key={row.label} style={styles.summaryRow}>
              <Text style={typography.body}>{row.label}</Text>
              <Text style={typography.body}>{row.value}</Text>
            </View>
          ))}
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[typography.subheading, { fontWeight: '800' }]}>Total</Text>
            <Text style={[typography.heading, { color: colors.primary, fontSize: 18 }]}>
              {'NPR ' + order.total}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>
            Delivery Address
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {order.address}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>
            Payment Method
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            {order.payment}
          </Text>
        </View>

        {order.status === 'DELIVERED' && (
          <Pressable
            style={styles.reviewBtn}
            onPress={() => navigation.navigate('ProductReviews', { item: order.items[0] })}
          >
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>
              Write a Review
            </Text>
          </Pressable>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  statusCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  statusBadge: { paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.pill },
  trackBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  itemCard: { flexDirection: 'row', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  itemImage: { width: 70, height: 70, borderRadius: radius.sm },
  summaryCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.md },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, marginTop: spacing.sm },
  infoCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  reviewBtn: { backgroundColor: colors.accentGreen, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});