import { useState, useEffect, useCallback } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, Image, Alert,
  ActivityIndicator, RefreshControl, Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import client from '../../api/client';

const { width: SCREEN_W } = Dimensions.get('window');

export default function SellerDashboardScreen({ navigation }) {
  const { user } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  /** Fetch products from the backend */
  const fetchProducts = useCallback(async () => {
    try {
      setError(null);
      const res = await client.get('/api/products');
      const all = res.data?.products || res.data || [];
      // Show all products (seller can see all listings on the platform)
      setListings(all);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load listings');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  function onRefresh() {
    setRefreshing(true);
    fetchProducts();
  }

  function deleteListing(id) {
    Alert.alert('Delete Listing', 'Are you sure you want to delete this listing?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          try {
            await client.delete(`/api/products/${id}`);
            setListings((prev) => prev.filter((l) => l._id !== id));
          } catch (err) {
            Alert.alert('Error', err.response?.data?.message || 'Could not delete listing');
          }
        },
      },
    ]);
  }

  // ── Stats ──
  const activeCount = listings.filter((l) => l.stock > 0).length;
  const soldCount = listings.filter((l) => l.stock === 0).length;
  const totalViews = listings.reduce((sum, l) => sum + (l.viewCount || 0), 0);
  const totalRevenue = listings.reduce((sum, l) => sum + (l.purchaseCount || 0) * (l.price || 0), 0);

  // ── Loading State ──
  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors.primaryTeal} />
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.md }]}>
          Loading your dashboard...
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F7F8FA' }}>
      {/* ── Gradient Hero Header ── */}
      <LinearGradient
        colors={['#0F2B22', '#167084', '#1A9E7A']}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={styles.heroHeader}
      >
        <View style={styles.heroTopRow}>
          <View>
            <Text style={styles.heroBrand}>SMART THRIFT</Text>
            <Text style={styles.heroSubtext}>Seller Dashboard</Text>
          </View>
          <Pressable
            onPress={() => navigation.navigate('SellerSettings')}
            style={styles.settingsBtn}
          >
            <Ionicons name="settings-outline" size={22} color="#FFFFFF" />
          </Pressable>
        </View>
        <Text style={styles.heroWelcome}>
          Welcome back, {user?.name || 'Seller'} 👋
        </Text>
        <Text style={styles.heroRevenue}>
          NPR {totalRevenue.toLocaleString()}
        </Text>
        <Text style={styles.heroRevenueLabel}>Estimated Revenue</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={{ padding: spacing.md, paddingBottom: 100 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primaryTeal} />}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Stat Cards ── */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderLeftColor: '#4CAF50' }]}>
            <View style={[styles.statIconCircle, { backgroundColor: '#E8F5E9' }]}>
              <Ionicons name="list-outline" size={20} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#FF9800' }]}>
            <View style={[styles.statIconCircle, { backgroundColor: '#FFF3E0' }]}>
              <Ionicons name="checkmark-done-outline" size={20} color="#FF9800" />
            </View>
            <Text style={styles.statValue}>{soldCount}</Text>
            <Text style={styles.statLabel}>Sold Out</Text>
          </View>
          <View style={[styles.statCard, { borderLeftColor: '#2196F3' }]}>
            <View style={[styles.statIconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Ionicons name="eye-outline" size={20} color="#2196F3" />
            </View>
            <Text style={styles.statValue}>
              {totalViews >= 1000 ? (totalViews / 1000).toFixed(1) + 'k' : totalViews}
            </Text>
            <Text style={styles.statLabel}>Views</Text>
          </View>
        </View>

        {/* ── Quick Actions ── */}
        <View style={styles.quickActionsCard}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsRow}>
            <Pressable
              style={[styles.quickActionBtn, { backgroundColor: '#0F2B22' }]}
              onPress={() => navigation.navigate('CreateListing')}
            >
              <Ionicons name="add-circle-outline" size={20} color="#FFF" />
              <Text style={styles.quickActionText}>New Listing</Text>
            </Pressable>
            <Pressable
              style={[styles.quickActionBtn, { backgroundColor: '#167084' }]}
              onPress={() => navigation.navigate('SellerOrders')}
            >
              <Ionicons name="cube-outline" size={20} color="#FFF" />
              <Text style={styles.quickActionText}>Orders</Text>
            </Pressable>
            <Pressable
              style={[styles.quickActionBtn, { backgroundColor: '#4CAF50' }]}
              onPress={() => navigation.navigate('SellerAnalytics')}
            >
              <Ionicons name="bar-chart-outline" size={20} color="#FFF" />
              <Text style={styles.quickActionText}>Analytics</Text>
            </Pressable>
            <Pressable
              style={[styles.quickActionBtn, { backgroundColor: '#D4A82B' }]}
              onPress={() => navigation.navigate('SellerEarnings')}
            >
              <Ionicons name="wallet-outline" size={20} color="#FFF" />
              <Text style={styles.quickActionText}>Earnings</Text>
            </Pressable>
          </View>
        </View>

        {/* ── AI Pricing Insight ── */}
        <View style={styles.aiCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
            <View style={styles.aiIconCircle}>
              <Ionicons name="sparkles" size={18} color="#167084" />
            </View>
            <View style={{ marginLeft: spacing.sm }}>
              <Text style={styles.aiTitle}>SmartPrint AI Pricing</Text>
              <Text style={styles.aiSubtext}>Market-based recommendation</Text>
            </View>
          </View>
          <Text style={styles.aiPrice}>NPR 8,500 — 12,000</Text>
          <Text style={styles.aiLabel}>Optimal price range for your next listing</Text>
        </View>

        {/* ── Listings Header ── */}
        <View style={styles.listingsHeader}>
          <Text style={styles.sectionTitle}>My Listings</Text>
          <View style={styles.listingsCountBadge}>
            <Text style={styles.listingsCountText}>{listings.length}</Text>
          </View>
        </View>

        {/* ── Error State ── */}
        {error && (
          <View style={styles.errorCard}>
            <Ionicons name="alert-circle-outline" size={24} color={colors.danger} />
            <Text style={[typography.body, { color: colors.danger, marginLeft: spacing.sm, flex: 1 }]}>
              {error}
            </Text>
            <Pressable onPress={fetchProducts}>
              <Text style={{ color: colors.primaryTeal, fontWeight: '700' }}>Retry</Text>
            </Pressable>
          </View>
        )}

        {/* ── Empty State ── */}
        {!error && listings.length === 0 && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="storefront-outline" size={48} color={colors.primaryTeal} />
            </View>
            <Text style={[typography.subheading, { marginTop: spacing.md, textAlign: 'center' }]}>
              No listings yet
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs }]}>
              Create your first listing and start selling sustainable fashion
            </Text>
            <Pressable
              style={styles.emptyBtn}
              onPress={() => navigation.navigate('CreateListing')}
            >
              <Ionicons name="add" size={20} color="#FFF" />
              <Text style={{ color: '#FFF', fontWeight: '700', marginLeft: spacing.xs }}>
                Create Listing
              </Text>
            </Pressable>
          </View>
        )}

        {/* ── Listing Cards ── */}
        {listings.map((item) => {
          const isSold = item.stock === 0;
          const imgSource = item.imageUrl ? { uri: item.imageUrl } : require('../../../assets/item1.jpg');

          return (
            <Pressable
              key={item._id}
              style={[styles.listingCard, isSold && styles.soldCard]}
              onPress={() => navigation.navigate('ProductDetail', { item: { ...item, id: item._id, title: item.name, imageUrl: item.imageUrl || '' } })}
            >
              <Image source={imgSource} style={styles.listingImage} />
              <View style={styles.listingInfo}>
                <Text style={styles.listingTitle} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.listingCategory}>{item.category}</Text>
                <Text style={styles.listingPrice}>NPR {item.price?.toLocaleString()}</Text>
                <View style={styles.listingMeta}>
                  <View style={[styles.statusBadge, { backgroundColor: isSold ? '#FFEBEE' : '#E8F5E9' }]}>
                    <View style={[styles.statusDot, { backgroundColor: isSold ? colors.danger : '#4CAF50' }]} />
                    <Text style={[styles.statusText, { color: isSold ? colors.danger : '#4CAF50' }]}>
                      {isSold ? 'Sold' : 'Active'}
                    </Text>
                  </View>
                  <View style={styles.viewsChip}>
                    <Ionicons name="eye-outline" size={12} color={colors.textSecondary} />
                    <Text style={styles.viewsText}>{item.viewCount || 0}</Text>
                  </View>
                </View>
              </View>
              <Pressable
                style={styles.deleteBtn}
                onPress={() => deleteListing(item._id)}
              >
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </Pressable>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Hero
  heroHeader: {
    paddingTop: 54,
    paddingBottom: spacing.lg,
    paddingHorizontal: spacing.lg,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  heroSubtext: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  settingsBtn: {
    width: 40, height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroWelcome: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginTop: spacing.md,
  },
  heroRevenue: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: spacing.xs,
  },
  heroRevenueLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 2,
  },

  // Stats
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: -20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
    borderLeftWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  statIconCircle: {
    width: 36, height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#6B6B6B',
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Quick Actions
  quickActionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    marginTop: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  quickActionBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    gap: 6,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 11,
  },

  // AI Card
  aiCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1,
    borderColor: '#167084' + '30',
    shadowColor: '#167084',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 2,
  },
  aiIconCircle: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#167084',
  },
  aiSubtext: {
    fontSize: 11,
    color: '#6B6B6B',
  },
  aiPrice: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F2B22',
    marginTop: spacing.xs,
  },
  aiLabel: {
    fontSize: 12,
    color: '#6B6B6B',
    marginTop: 2,
  },

  // Section
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  listingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  listingsCountBadge: {
    backgroundColor: '#167084',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  listingsCountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  // Error
  errorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBEE',
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },

  // Empty
  emptyState: {
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  emptyIconCircle: {
    width: 80, height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F2B22',
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: 12,
    marginTop: spacing.md,
  },

  // Listing Card
  listingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  soldCard: {
    opacity: 0.65,
  },
  listingImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: '#F4F5F5',
  },
  listingInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  listingTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  listingCategory: {
    fontSize: 11,
    color: '#6B6B6B',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  listingPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#4CAF50',
    marginTop: 4,
  },
  listingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    gap: spacing.sm,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    gap: 4,
  },
  statusDot: {
    width: 6, height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  viewsChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  viewsText: {
    fontSize: 11,
    color: '#6B6B6B',
  },
  deleteBtn: {
    width: 36, height: 36,
    borderRadius: 18,
    backgroundColor: '#FFEBEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
});