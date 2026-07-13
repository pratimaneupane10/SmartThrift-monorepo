import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const INITIAL_LISTINGS = [
  { id: '1', title: 'Premium Cashmere Sweater', price: 185, status: 'ACTIVE', views: 423, image: require('../../../assets/item2.jpg'), sold: false },
  { id: '2', title: 'Limited Edition Sneakers', price: 240, status: 'ACTIVE', views: 234, image: require('../../../assets/item6.jpg'), sold: false },
  { id: '3', title: 'Graphic Print Hoodie', price: 2265, status: 'SOLD', views: 89, image: require('../../../assets/item4.jpg'), sold: true },
];

export default function SellerDashboardScreen({ navigation }) {
  const [listings, setListings] = useState(INITIAL_LISTINGS);

  function toggleSold(id) {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id
          ? { ...l, sold: !l.sold, status: l.sold ? 'ACTIVE' : 'SOLD' }
          : l
      )
    );
  }

  function deleteListing(id) {
    Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setListings((prev) => prev.filter((l) => l.id !== id)) },
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
          SMART THRIFT
        </Text>
        <Pressable onPress={() => navigation.navigate('SellerSettings')}>
          <Text style={{ fontSize: 20 }}>🛍</Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 20 }}>📋</Text>
            <Text style={[typography.heading, { color: colors.primary, marginTop: spacing.xs }]}>
              {listings.filter((l) => !l.sold).length}
            </Text>
            <Text style={[typography.caption, { color: colors.accentGreen }]}>Active</Text>
            <Text style={typography.caption}>LISTINGS</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 20 }}>✅</Text>
            <Text style={[typography.heading, { color: colors.primary, marginTop: spacing.xs }]}>
              {listings.filter((l) => l.sold).length}
            </Text>
            <Text style={[typography.caption, { color: colors.accentGreen }]}>Completed</Text>
            <Text style={typography.caption}>SOLD</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={{ fontSize: 20 }}>👁</Text>
            <Text style={[typography.heading, { color: colors.primary, marginTop: spacing.xs }]}>
              2.4k
            </Text>
            <Text style={[typography.caption, { color: colors.danger }]}>-3%</Text>
            <Text style={typography.caption}>VIEWS</Text>
          </View>
        </View>

        <View style={styles.smartPrint}>
          <Text style={[typography.subheading, { color: colors.primaryTeal }]}>
            📊 SmartPrint AI Pricing
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Recommended Price based on market demand
          </Text>
          <Text style={[typography.heading, { color: colors.primary, marginTop: spacing.sm }]}>
            NPR 8,500 - 12,000
          </Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
            <Pressable
              style={[styles.actionBtn, { flex: 1, backgroundColor: colors.primary }]}
              onPress={() => navigation.navigate('CreateListing')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>+ New Listing</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, { flex: 1, backgroundColor: colors.primaryTeal }]}
              onPress={() => navigation.navigate('SellerOrders')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>My Orders</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm }}>
            <Pressable
              style={[styles.actionBtn, { flex: 1, backgroundColor: colors.accentGreen }]}
              onPress={() => navigation.navigate('SellerAnalytics')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Analytics</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, { flex: 1, backgroundColor: colors.amber }]}
              onPress={() => navigation.navigate('SellerEarnings')}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Earnings</Text>
            </Pressable>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.sm }}>
          <Text style={typography.subheading}>My Listings</Text>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {listings.length} total
          </Text>
        </View>

        {listings.map((item) => (
          <View key={item.id} style={[styles.listingCard, item.sold && styles.soldCard]}>
            <Image source={item.image} style={styles.listingImage} />
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading} numberOfLines={1}>{item.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                {item.views + ' views'}
              </Text>
              <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                {'NPR ' + item.price}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs, gap: spacing.xs }}>
                <View style={[styles.statusBadge, { backgroundColor: item.sold ? colors.danger + '22' : colors.accentGreen + '22' }]}>
                  <Text style={{ color: item.sold ? colors.danger : colors.accentGreen, fontSize: 10, fontWeight: '700' }}>
                    {item.sold ? '● SOLD' : '● ACTIVE'}
                  </Text>
                </View>
                <Pressable
                  style={[styles.toggleSoldBtn, { backgroundColor: item.sold ? colors.accentGreen : colors.danger }]}
                  onPress={() => toggleSold(item.id)}
                >
                  <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>
                    {item.sold ? 'Mark Available' : 'Mark Sold'}
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={{ gap: spacing.sm }}>
              <Pressable onPress={() => Alert.alert('Edit', 'Edit listing coming soon!')}>
                <Text style={{ fontSize: 18 }}>✏</Text>
              </Pressable>
              <Pressable onPress={() => deleteListing(item.id)}>
                <Text style={{ fontSize: 18 }}>🗑</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  statCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  smartPrint: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  actionBtn: { borderRadius: radius.md, padding: spacing.sm, alignItems: 'center' },
  listingCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  soldCard: { opacity: 0.7, borderWidth: 1, borderColor: colors.danger + '44' },
  listingImage: { width: 70, height: 70, borderRadius: radius.sm },
  statusBadge: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill },
  toggleSoldBtn: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill },
});