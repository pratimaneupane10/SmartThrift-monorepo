import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const NOTIFICATIONS = [
  { id: '1', type: 'price_alert', icon: '📉', title: 'Price Drop Alert', message: 'Vintage Denim Jacket dropped to NPR 1,200', time: '2 min ago', unread: true },
  { id: '2', type: 'message', icon: '💬', title: 'New Message', message: 'Alex Curator: Is this still available?', time: '1h ago', unread: true },
  { id: '3', type: 'order', icon: '📦', title: 'Order Update', message: 'Your order #12346 has been shipped!', time: '3h ago', unread: false },
  { id: '4', type: 'demand', icon: '📈', title: 'Demand Alert', message: 'Wool Overcoat is trending in your area', time: 'Yesterday', unread: false },
  { id: '5', type: 'badge', icon: '🏆', title: 'Badge Earned!', message: 'You earned the Verified Buyer badge', time: '2 days ago', unread: false },
];

export default function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Notifications"
  onBack={() => navigation.goBack()}
  rightText="Mark all read"
  onRightPress={() => {}}
/>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {NOTIFICATIONS.map((notif) => (
          <Pressable key={notif.id} style={[styles.notifCard, notif.unread && styles.unreadCard]}>
            <View style={styles.iconCircle}>
              <Text style={{ fontSize: 24 }}>{notif.icon}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={[typography.subheading, { fontSize: 14 }]}>{notif.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
                {notif.message}
              </Text>
              <Text style={[typography.caption, { color: colors.primaryTeal, marginTop: 2 }]}>
                {notif.time}
              </Text>
            </View>
            {notif.unread && <View style={styles.unreadDot} />}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  notifCard: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderRadius: radius.md, marginBottom: spacing.sm, backgroundColor: colors.surface },
  unreadCard: { backgroundColor: '#F0FFF4', borderLeftWidth: 3, borderLeftColor: colors.accentGreen },
  iconCircle: { width: 48, height: 48, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  unreadDot: { width: 10, height: 10, borderRadius: 999, backgroundColor: colors.accentGreen },
});