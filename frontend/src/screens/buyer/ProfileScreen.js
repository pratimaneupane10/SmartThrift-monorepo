import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import BackHeader from '../../components/composite/BackHeader';

const LISTINGS = [
  { id: '1', title: 'Vintage Denim Jacket', price: 1200, image: require('../../../assets/item1.jpg') },
  { id: '2', title: 'White Dress Shirt',    price: 900,  image: require('../../../assets/item2.jpg') },
  { id: '3', title: 'Wool Overcoat',        price: 3145, image: require('../../../assets/item3.jpg') },
];

function getInitials(name = '') {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const displayName = user?.name || 'Ramesh Thapa';
  const avatarUri   = user?.avatarUrl || null;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Text style={{ fontSize: 20 }}>≡</Text>
        </Pressable>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
          Smart Thrift
        </Text>
        <Pressable onPress={() => navigation.navigate('Help')}>
          <Text style={{ fontSize: 20 }}>🔔</Text>
        </Pressable>
      </View>

      {/* ── Profile section ── */}
      <View style={styles.profileSection}>
        <View style={styles.avatarWrapper}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarFallback}>
              <Text style={styles.avatarInitials}>{getInitials(displayName)}</Text>
            </View>
          )}
          {/* Verified badge — sits at bottom-right, fully visible */}
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✓ VERIFIED</Text>
          </View>
        </View>

        <Text style={[typography.heading, { marginTop: spacing.md + 4 }]}>
          {displayName}
        </Text>
        <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700', marginTop: 2 }]}>
          PREMIUM MEMBER · SINCE 2022
        </Text>
      </View>

      {/* ── Stats ── */}
      <View style={styles.statsRow}>
        {[
          { value: '12.4k', label: 'Carbon\nSaved' },
          { value: '42',    label: 'Items\nBought' },
          { value: 'TOP 6%',label: 'Buyer\nRank' },
        ].map((stat, i, arr) => (
          <View key={stat.label} style={{ flexDirection: 'row', flex: 1 }}>
            <View style={styles.statBox}>
              <Text style={[typography.heading, { color: colors.primary, fontSize: 20 }]}>
                {stat.value}
              </Text>
              <Text style={[typography.caption, { textAlign: 'center', marginTop: 2 }]}>
                {stat.label}
              </Text>
            </View>
            {i < arr.length - 1 && <View style={styles.statDivider} />}
          </View>
        ))}
      </View>

      {/* ── Tabs ── */}
      <View style={styles.tabs}>
        {['Listings', 'Saved', 'Impact'].map((tab, i) => (
          <Pressable key={tab} style={[styles.tab, i === 0 && styles.activeTab]}>
            <Text style={[typography.body, {
              fontWeight: '600',
              color: i === 0 ? colors.primary : colors.textSecondary,
            }]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ── Listings grid ── */}
      <View style={styles.grid}>
        {LISTINGS.map((listing) => (
          <Pressable key={listing.id} style={styles.gridItem}>
            <View style={styles.gridImageWrap}>
              <Image
                source={listing.image}
                style={styles.gridImage}
                resizeMode="cover"
              />
            </View>
            <Text style={[typography.caption, { marginTop: spacing.xs }]} numberOfLines={1}>
              {listing.title}
            </Text>
            <Text style={[typography.body, { color: colors.accentGreen, fontWeight: '700' }]}>
              NPR {listing.price}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* ── Settings / Help buttons ── */}
      <View style={{ padding: spacing.lg }}>
        {[
          { icon: '⚙', label: 'Settings',     screen: 'Settings' },
          { icon: '❓', label: 'Help & Support', screen: 'Help' },
        ].map((item) => (
          <Pressable
            key={item.label}
            style={styles.settingsBtn}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={{ fontSize: 20 }}>{item.icon}</Text>
            <Text style={[typography.subheading, { marginLeft: spacing.md }]}>{item.label}</Text>
            <Text style={{ color: colors.textSecondary, marginLeft: 'auto' }}>›</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const AVATAR_SIZE = 90;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  /* Profile */
  profileSection: { alignItems: 'center', paddingTop: spacing.xl, paddingBottom: spacing.lg, paddingHorizontal: spacing.lg },

  /* Avatar wrapper — extra bottom padding so badge doesn't get clipped */
  avatarWrapper: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    marginBottom: 10,         // space for badge that overflows bottom
  },
  avatarImage: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarFallback: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    backgroundColor: colors.mintIcon || '#C8E6C9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarInitials: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 1,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -10,              // sits just below the circle
    alignSelf: 'center',
    left: '50%',
    transform: [{ translateX: -32 }], // centres the badge under the avatar
    backgroundColor: colors.primaryTeal,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  verifiedText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },

  /* Stats */
  statsRow: {
    flexDirection: 'row',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: colors.border, marginVertical: 4 },

  /* Tabs */
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, padding: spacing.md, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: colors.primary },

  /* Grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.sm,
  },
  gridItem: {
    width: '47%',
    flexShrink: 0,
  },
  gridImageWrap: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
    backgroundColor: colors.surface,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },

  /* Settings */
  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginBottom: spacing.sm,
  },
});