import { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const LISTINGS = [
  { id: '1', title: 'Vintage Denim Jacket', price: 1200, image: require('../../../assets/item1.jpg') },
  { id: '2', title: 'White Dress Shirt', price: 900, image: require('../../../assets/item2.jpg') },
  { id: '3', title: 'Wool Overcoat', price: 3145, image: require('../../../assets/item3.jpg') },
];

const IMPACT_DATA = [
  { icon: '🌱', label: 'CO₂ Saved', value: '12.4 kg', desc: 'Equivalent to planting 3 trees' },
  { icon: '💧', label: 'Water Saved', value: '850 L', desc: 'Equivalent to 5 days of drinking water' },
  { icon: '♻', label: 'Items Recycled', value: '42', desc: 'Items given a second life' },
  { icon: '🌍', label: 'Sustainability Score', value: '87/100', desc: 'Top 6% of buyers on platform' },
];

export default function ProfileScreen({ navigation }) {
  const { user } = useAuth();
  const { items: wishlistItems } = useWishlist();
  const [activeTab, setActiveTab] = useState('Listings');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Settings')}>
          <Text style={{ fontSize: 22 }}>≡</Text>
        </Pressable>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
          Smart Thrift
        </Text>
        <Pressable onPress={() => navigation.navigate('Notifications')}>
          <Text style={{ fontSize: 22 }}>🛍</Text>
        </Pressable>
      </View>

      <View style={styles.profileSection}>
        <Pressable onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.avatarContainer}>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatar}>
                <Text style={{ fontSize: 36 }}>👤</Text>
              </View>
            )}
            <View style={styles.verifiedBadge}>
              <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>VERIFIED</Text>
            </View>
          </View>
        </Pressable>
        <Text style={[typography.heading, { marginTop: spacing.md }]}>
          {user?.name || 'Ramesh Thapa'}
        </Text>
        <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
          PREMIUM MEMBER · SINCE 2022
        </Text>
        <Pressable
          style={styles.editProfileBtn}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
            Edit Profile
          </Text>
        </Pressable>
      </View>

      <View style={styles.statsRow}>
        <Pressable style={styles.statBox} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={[typography.heading, { color: colors.primary, fontSize: 20 }]}>12.4k</Text>
          <Text style={[typography.caption, { textAlign: 'center' }]}>Carbon{'\n'}Saved</Text>
        </Pressable>
        <View style={styles.statDivider} />
        <Pressable style={styles.statBox} onPress={() => navigation.navigate('OrderHistory')}>
          <Text style={[typography.heading, { color: colors.primary, fontSize: 20 }]}>42</Text>
          <Text style={[typography.caption, { textAlign: 'center' }]}>Items{'\n'}Bought</Text>
        </Pressable>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={[typography.heading, { color: colors.primary, fontSize: 20 }]}>TOP 6%</Text>
          <Text style={[typography.caption, { textAlign: 'center' }]}>Buyer{'\n'}Rank</Text>
        </View>
      </View>

      <View style={styles.tabs}>
        {['Listings', 'Saved', 'Impact'].map((tab) => (
          <Pressable
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              typography.body,
              { fontWeight: '600', color: activeTab === tab ? colors.primary : colors.textSecondary }
            ]}>
              {tab}
            </Text>
          </Pressable>
        ))}
      </View>

      {activeTab === 'Listings' && (
        <View style={styles.grid}>
          {LISTINGS.map((listing) => (
            <Pressable
              key={listing.id}
              style={styles.gridItem}
              onPress={() => navigation.navigate('ProductDetail', { item: { ...listing, imageUrl: listing.image, demand: 'high', condition: 'Good', size: 'M', category: 'jackets' } })}
            >
              <View style={styles.gridImageWrap}>
                <Image source={listing.image} style={styles.gridImage} resizeMode="cover" />
              </View>
              <Text style={[typography.caption, { marginTop: spacing.xs }]} numberOfLines={1}>
                {listing.title}
              </Text>
              <Text style={[typography.body, { color: colors.accentGreen, fontWeight: '700' }]}>
                {'NPR ' + listing.price}
              </Text>
            </Pressable>
          ))}
        </View>
      )}

      {activeTab === 'Saved' && (
        <View style={{ padding: spacing.md }}>
          {wishlistItems.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={{ fontSize: 48 }}>♡</Text>
              <Text style={[typography.subheading, { marginTop: spacing.md }]}>No saved items yet</Text>
              <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
                Tap the heart on any item to save it here
              </Text>
              <Pressable
                style={styles.browseBtn}
                onPress={() => navigation.navigate('Home')}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Browse Items</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.grid}>
              {wishlistItems.map((item) => {
                const imgSource = typeof item.imageUrl === 'number' ? item.imageUrl : { uri: item.imageUrl };
                return (
                  <Pressable
                    key={item.id}
                    style={styles.gridItem}
                    onPress={() => navigation.navigate('ProductDetail', { item })}
                  >
                    <View style={styles.gridImageWrap}>
                      <Image source={imgSource} style={styles.gridImage} resizeMode="cover" />
                    </View>
                    <Text style={[typography.caption, { marginTop: spacing.xs }]} numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text style={[typography.body, { color: colors.accentGreen, fontWeight: '700' }]}>
                      {'NPR ' + item.price}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>
      )}

      {activeTab === 'Impact' && (
        <View style={{ padding: spacing.md }}>
          <View style={styles.impactHeader}>
            <Text style={{ fontSize: 40 }}>🌱</Text>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={[typography.heading, { color: colors.accentGreen }]}>
                Your Green Impact
              </Text>
              <Text style={[typography.body, { color: colors.textSecondary }]}>
                Every thrift purchase helps the planet
              </Text>
            </View>
          </View>

          {IMPACT_DATA.map((item) => (
            <View key={item.label} style={styles.impactCard}>
              <Text style={{ fontSize: 32 }}>{item.icon}</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={typography.subheading}>{item.label}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.desc}</Text>
              </View>
              <Text style={[typography.heading, { color: colors.accentGreen, fontSize: 18 }]}>
                {item.value}
              </Text>
            </View>
          ))}

          <View style={styles.certificateCard}>
            <Text style={{ fontSize: 32 }}>🏆</Text>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={[typography.subheading, { color: colors.primary }]}>
                Eco Champion Badge
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                You are in the top 6% of sustainable shoppers!
              </Text>
            </View>
          </View>
        </View>
      )}

      <View style={{ padding: spacing.lg }}>
        {[
          { icon: '📦', label: 'Order History', screen: 'OrderHistory' },
          ...(user?.role !== 'seller'
            ? [{ icon: '📍', label: 'My Addresses', screen: 'Address' }]
            : []),
          { icon: '⚙', label: 'Settings', screen: 'Settings' },
          { icon: '❓', label: 'Help & Support', screen: 'Help' },
        ].map((item) => (
          <Pressable
            key={item.label}
            style={styles.menuBtn}
            onPress={() => navigation.navigate(item.screen)}
          >
            <Text style={{ fontSize: 20 }}>{item.icon}</Text>
            <Text style={[typography.subheading, { marginLeft: spacing.md, flex: 1 }]}>
              {item.label}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 20 }}>{'>'}</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  profileSection: { alignItems: 'center', padding: spacing.lg },
  avatarContainer: { position: 'relative' },
  avatarImage: { width: 90, height: 90, borderRadius: 999, borderWidth: 3, borderColor: colors.primary },
  avatar: { width: 90, height: 90, borderRadius: 999, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.primary },
  verifiedBadge: { position: 'absolute', bottom: 0, right: -10, backgroundColor: colors.primaryTeal, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill },
  editProfileBtn: { marginTop: spacing.xs, borderWidth: 1, borderColor: colors.primaryTeal, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', padding: spacing.lg, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border },
  statBox: { alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: colors.border },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.border },
  tab: { flex: 1, padding: spacing.md, alignItems: 'center' },
  activeTab: { borderBottomWidth: 2, borderBottomColor: colors.primary },
  grid: { flexDirection: 'row', flexWrap: 'wrap', padding: spacing.md, gap: spacing.md },
  gridItem: { width: '47%' },
  gridImageWrap: { width: '100%', aspectRatio: 1, borderRadius: radius.md, overflow: 'hidden' },
  gridImage: { width: '100%', height: '100%' },
  emptyState: { alignItems: 'center', padding: spacing.xl },
  browseBtn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.md, marginTop: spacing.md },
  impactHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FFF4', borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  impactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  certificateCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary + '11', borderRadius: radius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.primary, marginTop: spacing.md },
  menuBtn: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, backgroundColor: colors.surface, borderRadius: radius.md, marginBottom: spacing.sm },
});