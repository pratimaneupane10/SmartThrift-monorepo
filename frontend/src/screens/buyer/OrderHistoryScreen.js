import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const ORDERS = [
  {
    id: '#12346',
    date: 'October 18, 2023',
    status: 'IN TRANSIT',
    estDelivery: 'Oct 24, 2023',
    items: [
      { id: '1', title: 'Vintage Denim Jacket', price: 1200, qty: 1, image: require('../../../assets/item1.jpg') },
      { id: '2', title: 'Wool Overcoat',         price: 3145, qty: 1, image: require('../../../assets/item3.jpg') },
    ],
  },
  {
    id: '#12345',
    date: 'September 12, 2023',
    status: 'DELIVERED',
    items: [
      { id: '3', title: 'Brown Leather Jacket', price: 6585, qty: 1, image: require('../../../assets/item6.jpg') },
    ],
  },
  {
    id: '#12344',
    date: 'September 20, 2023',
    status: 'RETURNED',
    items: [
      { id: '4', title: 'Black Hoodie', price: 1145, qty: 1, image: require('../../../assets/item4.jpg') },
    ],
  },
];

const STATUS_CONFIG = {
  'IN TRANSIT': { color: colors.amber,      label: 'In Transit' },
  'DELIVERED':  { color: colors.accentGreen, label: 'Delivered'  },
  'RETURNED':   { color: colors.danger,      label: 'Returned'   },
};

const PROGRESS_STEPS = ['ORDERED', 'PROCESSED', 'SHIPPED', 'DELIVERED'];
const PROGRESS_INDEX = { 'IN TRANSIT': 2, 'DELIVERED': 3, 'RETURNED': 1 };

export default function OrderHistoryScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* Header */}
      <BackHeader
  title="Order History"
  onBack={() => navigation.goBack()}
  rightIcon="🛍"
/>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700', letterSpacing: 1 }]}>
          PURCHASE JOURNEY
        </Text>
        <Text style={[typography.heading, { fontSize: 28, marginTop: spacing.xs }]}>Order History</Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs, marginBottom: spacing.lg }]}>
          Track your curated acquisitions and review past deliveries from our verified sellers.
        </Text>

        {ORDERS.map((order) => {
          const statusCfg    = STATUS_CONFIG[order.status];
          const progressStep = PROGRESS_INDEX[order.status] || 0;

          return (
            <View key={order.id} style={styles.orderCard}>

              {/* Status row */}
              <View style={styles.orderHeader}>
                <View style={[styles.statusBadge, { backgroundColor: statusCfg.color + '22' }]}>
                  <Text style={[typography.caption, { color: statusCfg.color, fontWeight: '700' }]}>
                    {statusCfg.label}
                  </Text>
                </View>
                {order.estDelivery && (
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    Est. {order.estDelivery}
                  </Text>
                )}
              </View>

              {/* Order meta */}
              <Text style={[typography.subheading, { marginTop: spacing.sm }]}>Order {order.id}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Placed on {order.date} · {order.items.length} item{order.items.length > 1 ? 's' : ''}
              </Text>

              {/* Track button */}
              {order.status === 'IN TRANSIT' && (
                <Pressable style={styles.trackBtn} onPress={() => navigation.navigate('TrackOrder')}>
  <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 13 }}>📦 Track Package</Text>
</Pressable>
              )}

              {/* Progress bar */}
              <View style={styles.progressWrap}>
                {PROGRESS_STEPS.map((step, i) => {
                  const active = i <= progressStep;
                  return (
                    <View key={step} style={styles.progressStep}>
                      {i > 0 && (
                        <View style={[styles.progressLine, active && { backgroundColor: statusCfg.color }]} />
                      )}
                      <View style={[styles.progressDot, active && { backgroundColor: statusCfg.color }]} />
                      <Text style={[styles.progressLabel, active && { color: statusCfg.color }]}>
                        {step}
                      </Text>
                    </View>
                  );
                })}
              </View>

              {/* Items */}
              {order.items.map((item) => (
                <View key={item.id} style={styles.itemRow}>
                  <View style={styles.itemImageWrap}>
                    <Image
                      source={item.image}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={typography.subheading} numberOfLines={1}>{item.title}</Text>
                    <Text style={[typography.caption, { color: colors.textSecondary }]}>Qty: {item.qty}</Text>
                    <Text style={[typography.body, { color: colors.accentGreen, fontWeight: '700' }]}>
                      NPR {item.price}.00
                    </Text>
                  </View>
                </View>
              ))}

              {/* Action buttons */}
              {order.status === 'DELIVERED' && (
                <Pressable style={styles.buyAgainBtn}>
                  <Text style={[typography.body, { fontWeight: '700' }]}>Buy Again</Text>
                </Pressable>
              )}
              {order.status === 'RETURNED' && (
                <Pressable style={styles.refundBtn}>
                  <Text style={[typography.body, { fontWeight: '700', color: colors.danger }]}>
                    View Refund Status
                  </Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>
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
  },
  orderCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  trackBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  progressWrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginVertical: spacing.md,
  },
  progressStep: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },
  progressLine: {
    position: 'absolute',
    top: 5,
    left: '-50%',
    right: '50%',
    height: 2,
    backgroundColor: colors.border,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.border,
    zIndex: 1,
  },
  progressLabel: {
    fontSize: 8,
    marginTop: 4,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '600',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  itemImageWrap: {
    width: 64,
    height: 64,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  buyAgainBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  refundBtn: {
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: radius.md,
    padding: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
});