import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const MESSAGES = [
  { id: '1', name: 'Sushant Poudel',  time: 'JUST NOW',  message: 'Is this still available?',                unread: 1, offer: false, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
  { id: '2', name: 'Sandhya Giri',    time: '2H AGO',    message: 'I can offer NPR 15...',                   unread: 0, offer: true,  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100' },
  { id: '3', name: 'Prajwol Karki',   time: 'YESTERDAY', message: 'The quality of the stitching is superb...', unread: 0, offer: false, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  { id: '4', name: 'Eleena Sharma',   time: 'OCT 12',    message: 'Could you send more photos of the...',    unread: 0, offer: false, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
  { id: '5', name: 'Jenish Raj Magar',time: 'OCT 10',    message: "Great, let me know when you've shi...",   unread: 0, offer: false, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
];

function AvatarImage({ uri, size = 48 }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, overflow: 'hidden', backgroundColor: colors.mintIcon }}>
      <Image
        source={{ uri }}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
      />
    </View>
  );
}

export default function InboxScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack && navigation.goBack()}>
          <Text style={{ fontSize: 20 }}>←</Text>
        </Pressable>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
          SMART THRIFT
        </Text>
        <View style={styles.avatarRow}>
          {MESSAGES.slice(0, 2).map((msg) => (
            <View key={msg.id} style={styles.miniAvatarWrap}>
              <Image
                source={{ uri: msg.image }}
                style={styles.miniAvatar}
                resizeMode="cover"
              />
            </View>
          ))}
          <View style={[styles.miniAvatarWrap, styles.countBadge]}>
            <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>+4</Text>
          </View>
        </View>
      </View>

      {/* ── Title + Search ── */}
      <View style={{ padding: spacing.lg, paddingBottom: 0 }}>
        <Text style={[typography.caption, { color: colors.textSecondary }]}>MESSAGES</Text>
        <Text style={[typography.heading, { fontSize: 28 }]}>Your Inbox</Text>
        <View style={styles.searchBar}>
          <Text style={{ color: colors.textSecondary, marginRight: spacing.sm }}>🔍</Text>
          <Text style={[typography.body, { color: colors.textSecondary }]}>Search conversations...</Text>
        </View>
      </View>

      {/* ── Message list ── */}
      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {MESSAGES.map((msg) => (
          <Pressable
            key={msg.id}
            style={styles.messageRow}
            onPress={() => navigation.navigate('Chat', { contact: { name: msg.name, image: msg.image } })}
          >
            {/* Avatar — properly wrapped in an Image */}
            <AvatarImage uri={msg.image} size={48} />

            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={typography.subheading}>{msg.name}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{msg.time}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
                {msg.offer && (
                  <View style={styles.offerBadge}>
                    <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>OFFER RECEIVED</Text>
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
                <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>{msg.unread}</Text>
              </View>
            )}
          </Pressable>
        ))}

        {/* ── Safety tip ── */}
        <View style={styles.safetyTip}>
          <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>SAFETY TIP</Text>
          <Text style={[typography.subheading, { marginTop: spacing.xs }]}>Always trade within the platform.</Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Use our secure payment system to ensure buyer and seller protection.
          </Text>
        </View>
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

  /* Stacked mini avatars in header */
  avatarRow: { flexDirection: 'row' },
  miniAvatarWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.background,
    marginLeft: -8,
    backgroundColor: colors.mintIcon,
  },
  miniAvatar: { width: '100%', height: '100%' },
  countBadge: {
    backgroundColor: colors.primaryTeal,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },

  /* Message row */
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  offerBadge: {
    backgroundColor: colors.danger,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: radius.pill,
    marginRight: spacing.xs,
  },
  unreadBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },

  safetyTip: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
});