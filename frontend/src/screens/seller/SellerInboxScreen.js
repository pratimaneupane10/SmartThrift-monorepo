import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const BUYER_MESSAGES = [
  { id: '1', name: 'Ramesh Thapa', time: 'JUST NOW', message: 'Is the jacket still available?', unread: 2, image: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428622_640.jpg' },
  { id: '2', name: 'Sita Sharma', time: '1H AGO', message: 'Can you do NPR 1000 for the shirt?', unread: 1, offer: true, image: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428622_640.jpg' },
  { id: '3', name: 'Hari Prasad', time: 'YESTERDAY', message: 'Does it come in size L?', unread: 0, image: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428622_640.jpg' },
  { id: '4', name: 'Maya Gurung', time: 'OCT 12', message: 'Received the package, thank you!', unread: 0, image: 'https://cdn.pixabay.com/photo/2014/08/26/21/49/jeans-428622_640.jpg' },
];

export default function SellerInboxScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={[typography.subheading, { color: colors.primaryTeal, fontWeight: '800' }]}>
          SMART THRIFT
        </Text>
        <Text style={{ fontSize: 20 }}>🔔</Text>
      </View>

      <View style={{ padding: spacing.lg, paddingBottom: 0 }}>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>MESSAGES</Text>
        <Text style={[typography.heading, { fontSize: 28 }]}>Buyer Inquiries</Text>
        <View style={styles.searchBar}>
          <Text style={{ color: colors.textSecondary, marginRight: spacing.sm }}>🔍</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>
            Search conversations...
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {BUYER_MESSAGES.map((msg) => (
          <Pressable
            key={msg.id}
            style={styles.messageRow}
            onPress={() => navigation.navigate('Chat', { contact: { name: msg.name } })}
          >
            <View style={styles.avatar}>
              <Text style={{ fontSize: 20 }}>👤</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={typography.subheading}>{msg.name}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{msg.time}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                {msg.offer && (
                  <View style={styles.offerBadge}>
                    <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>
                      OFFER RECEIVED
                    </Text>
                  </View>
                )}
                <Text
                  style={[typography.caption, { color: colors.textSecondary, flex: 1 }]}
                  numberOfLines={1}
                >
                  {msg.message}
                </Text>
              </View>
            </View>
            {msg.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
                  {msg.unread}
                </Text>
              </View>
            )}
          </Pressable>
        ))}

        <View style={styles.safetyTip}>
          <Text style={[typography.caption, { color: colors.mintIcon, fontWeight: '700' }]}>
            SAFETY TIP
          </Text>
          <Text style={[typography.subheading, { color: '#FFFFFF', marginTop: spacing.xs }]}>
            Always trade within the platform.
          </Text>
          <Text style={[typography.caption, { color: '#FFFFFFAA', marginTop: spacing.xs }]}>
            Use our secure payment system to ensure buyer and seller protection.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  messageRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 48, height: 48, borderRadius: 999, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center' },
  offerBadge: { backgroundColor: colors.danger, paddingHorizontal: spacing.xs, paddingVertical: 1, borderRadius: radius.pill, marginRight: spacing.xs },
  unreadBadge: { width: 22, height: 22, borderRadius: 999, backgroundColor: colors.primaryTeal, justifyContent: 'center', alignItems: 'center' },
  safetyTip: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
});