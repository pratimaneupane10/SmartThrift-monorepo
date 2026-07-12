import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const STEPS = [
  { id: '1', label: 'Order Placed', desc: 'Your order has been confirmed', done: true, time: '10:30 AM' },
  { id: '2', label: 'Processing', desc: 'Seller is preparing your item', done: true, time: '11:00 AM' },
  { id: '3', label: 'Shipped', desc: 'Package is on the way', done: true, time: '2:00 PM' },
  { id: '4', label: 'Out for Delivery', desc: 'Driver is nearby', done: false, time: 'Expected 5:00 PM' },
  { id: '5', label: 'Delivered', desc: 'Package delivered successfully', done: false, time: 'Pending' },
];

export default function TrackOrderScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Track Order"
  onBack={() => navigation.goBack()}
  rightText="#12346"
/>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.mapPlaceholder}>
          <Text style={{ fontSize: 48 }}>🗺</Text>
          <Text style={[typography.subheading, { marginTop: spacing.md }]}>
            Live Tracking
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Your package is 2.4 km away
          </Text>
        </View>

        <View style={styles.estimateBox}>
          <Text style={typography.caption}>ESTIMATED DELIVERY</Text>
          <Text style={[typography.heading, { color: colors.primary }]}>Today, 5:00 PM</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            October 24, 2024
          </Text>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.md }]}>
          Order Progress
        </Text>

        {STEPS.map((step, index) => (
          <View key={step.id} style={styles.stepRow}>
            <View style={styles.stepLeft}>
              <View style={[styles.stepDot, step.done && styles.stepDotDone]}>
                {step.done && <Text style={{ color: '#FFFFFF', fontSize: 10 }}>✓</Text>}
              </View>
              {index < STEPS.length - 1 && (
                <View style={[styles.stepLine, step.done && styles.stepLineDone]} />
              )}
            </View>
            <View style={styles.stepContent}>
              <Text style={[typography.subheading, { color: step.done ? colors.primary : colors.textSecondary }]}>
                {step.label}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {step.desc}
              </Text>
              <Text style={[typography.caption, { color: step.done ? colors.primaryTeal : colors.textSecondary }]}>
                {step.time}
              </Text>
            </View>
          </View>
        ))}

        <View style={styles.driverCard}>
          <View style={styles.driverAvatar}>
            <Text style={{ fontSize: 24 }}>🚗</Text>
          </View>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={typography.subheading}>Delivery Driver</Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              Kumar Tamang · ★ 4.8
            </Text>
          </View>
          <Pressable style={styles.callBtn}>
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>📞 Call</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  mapPlaceholder: { height: 180, backgroundColor: colors.surface, borderRadius: radius.lg, justifyContent: 'center', alignItems: 'center' },
  estimateBox: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.md, alignItems: 'center' },
  stepRow: { flexDirection: 'row', marginBottom: spacing.sm },
  stepLeft: { alignItems: 'center', width: 40 },
  stepDot: { width: 28, height: 28, borderRadius: 999, backgroundColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  stepDotDone: { backgroundColor: colors.primary },
  stepLine: { width: 2, flex: 1, backgroundColor: colors.border, marginVertical: 2 },
  stepLineDone: { backgroundColor: colors.primary },
  stepContent: { flex: 1, paddingLeft: spacing.md, paddingBottom: spacing.md },
  driverCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
  driverAvatar: { width: 50, height: 50, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  callBtn: { backgroundColor: colors.accentGreen, borderRadius: radius.md, padding: spacing.md },
});