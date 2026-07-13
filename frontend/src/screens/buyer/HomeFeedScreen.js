import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, Pressable, StyleSheet, TouchableOpacity } from 'react-native';
import { mockItems } from '../../api/mockData';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const STYLE_BANNERS = [
  { name: 'Vintage',    image: require('../../../assets/item1.jpg') },
  { name: 'Minimalist', image: require('../../../assets/item2.jpg') },
  { name: 'Streetwear', image: require('../../../assets/item4.jpg') },
  { name: 'Luxury',     image: require('../../../assets/item6.jpg') },
];

const CATEGORIES = [
  { id: 'all',       label: 'All',       icon: '✨' },
  { id: 'tees',      label: 'Tees',      icon: '👕' },
  { id: 'shirts',    label: 'Shirts',    icon: '👔' },
  { id: 'jeans',     label: 'Jeans',     icon: '👖' },
  { id: 'jackets',   label: 'Jackets',   icon: '🥼' },
  { id: 'hoodies',   label: 'Hoodies',   icon: null },
  { id: 'overcoats', label: 'Overcoats', icon: '🧥' },
  { id: 'shorts',    label: 'Shorts',    icon: '🩳' },
  { id: 'joggers',   label: 'Joggers',   icon: null },
];

export default function HomeFeedScreen({ navigation }) {
  const { userPreferences, setIsNewUser } = useAuth();
  const preferredCategories = userPreferences?.categories || [];

  const [activeCategory, setActiveCategory] = useState(
    preferredCategories.length === 1 ? preferredCategories[0] : 'all'
  );

  useEffect(() => {
    if (preferredCategories.length === 1) {
      setActiveCategory(preferredCategories[0]);
    }
  }, [userPreferences]);

  const filteredItems = (() => {
    if (activeCategory !== 'all') {
      return mockItems.filter((item) => item.category === activeCategory);
    }
    if (preferredCategories.length > 0) {
      return mockItems.filter((item) => preferredCategories.includes(item.category));
    }
    return mockItems;
  })();

  const sectionTitle = (() => {
    if (activeCategory !== 'all') {
      const cat = CATEGORIES.find(c => c.id === activeCategory);
      return `${cat?.icon || ''} ${cat?.label}`.trim();
    }
    if (preferredCategories.length > 0) return '✨ Based on Your Style';
    return '🔥 High Demand';
  })();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800', letterSpacing: 1 }]}>
          SMART THRIFT
        </Text>
        <View style={{ flexDirection: 'row', gap: spacing.md, alignItems: 'center' }}>
          {/* Edit style preferences button */}
          <TouchableOpacity
            onPress={() => navigation.navigate('StylePreference', { editing: true })}
            style={styles.editStyleBtn}
          >
            <Text style={{ fontSize: 14 }}>🎨</Text>
            <Text style={styles.editStyleText}>Style</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Explore')}>
            <Text style={{ fontSize: 20 }}>🔍</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <Text style={{ fontSize: 20 }}>🔔</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Text style={{ fontSize: 20 }}>🛍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Category chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryBar}
        contentContainerStyle={{ paddingHorizontal: spacing.md, gap: spacing.sm }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;
          const isPreferred = activeCategory === 'all' && preferredCategories.includes(cat.id);
          return (
            <Pressable
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={[
                styles.categoryChip,
                isActive && styles.categoryChipActive,
                isPreferred && styles.categoryChipPreferred,
              ]}
            >
              {cat.icon ? <Text style={{ fontSize: 15 }}>{cat.icon}</Text> : null}
              <Text style={[
                styles.categoryChipText,
                (isActive || isPreferred) && styles.categoryChipTextActive,
              ]}>
                {cat.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Preference notice */}
      {preferredCategories.length > 0 && activeCategory === 'all' && (
        <View style={styles.preferenceBanner}>
          <Text style={{ fontSize: 12, color: colors.primaryTeal }}>
            ✨ Showing items based on your style preferences ·{' '}
            <Text style={{ fontWeight: '700' }} onPress={() => setActiveCategory('all')}>
              View all
            </Text>
          </Text>
        </View>
      )}

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>

        {/* Style Guide Banner */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: spacing.md }}
          contentContainerStyle={{ gap: spacing.sm }}
        >
          {STYLE_BANNERS.map((styleItem) => (
            <View key={styleItem.name} style={styles.bannerTile}>
              <Image source={styleItem.image} style={styles.bannerImage} resizeMode="cover" />
              <View style={styles.bannerOverlay} />
              <View style={styles.bannerLabelWrap}>
                <Text style={styles.bannerLabel}>{styleItem.name}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Market Insight */}
        <Pressable
          style={styles.demandBanner}
          onPress={() => navigation.navigate('DemandInsights')}
        >
          <View style={{ flex: 1 }}>
            <Text style={[typography.caption, { color: colors.textSecondary, fontWeight: '700' }]}>
              MARKET INSIGHT
            </Text>
            <Text style={[typography.subheading, { marginTop: 2 }]}>Demand rising in jackets</Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
              Sellers are seeing a 24% increase in vintage outerwear interest this week.
            </Text>
          </View>
          <View style={{ alignItems: 'center', marginLeft: spacing.md }}>
            <Text style={{ color: colors.accentGreen, fontWeight: '800', fontSize: 16 }}>+24%</Text>
            <Text style={{ fontSize: 16 }}>📈</Text>
          </View>
        </Pressable>

        {/* Recommended */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg, marginBottom: spacing.sm }}>
          <Text style={typography.subheading}>Recommended for you</Text>
          <Text style={[typography.caption, { color: colors.primaryTeal }]}>View all</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: spacing.lg }}
          contentContainerStyle={{ gap: spacing.sm }}
        >
          {(preferredCategories.length > 0
            ? mockItems.filter(i => preferredCategories.includes(i.category))
            : mockItems
          ).slice(0, 4).map((item) => {
            const imgSource = typeof item.imageUrl === 'number' ? item.imageUrl : { uri: item.imageUrl };
            const isSold = item.sold === true || item.available === false;
            return (
              <Pressable
                key={item.id}
                onPress={() => !isSold && navigation.navigate('ProductDetail', { item })}
                style={styles.horizontalCard}
                disabled={isSold}
              >
                <View style={styles.horizontalImageWrap}>
                  <Image
                    source={imgSource}
                    style={[styles.horizontalImage, isSold && { opacity: 0.4 }]}
                    resizeMode="cover"
                  />
                  {isSold ? (
                    <View style={styles.soldBadge}>
                      <Text style={styles.soldBadgeText}>SOLD OUT</Text>
                    </View>
                  ) : (
                    <View style={styles.availableBadge}>
                      <Text style={styles.availableBadgeText}>Available</Text>
                    </View>
                  )}
                  {!isSold && item.demand === 'high' && (
                    <View style={styles.demandBadge}>
                      <Text style={styles.demandBadgeText}>High Demand</Text>
                    </View>
                  )}
                </View>
                <Text style={[typography.caption, { marginTop: spacing.xs, color: colors.textSecondary }]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={{ color: colors.accentGreen, fontWeight: '700', fontSize: 13 }}>
                  NPR {item.price}
                </Text>
                <Text style={typography.caption}>{item.size} · {item.condition}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Grid heading */}
        <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>{sectionTitle}</Text>

        {/* Grid */}
        {filteredItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={{ fontSize: 48 }}>👕</Text>
            <Text style={[typography.subheading, { marginTop: spacing.md }]}>
              No items in this category yet
            </Text>
            <Pressable onPress={() => setActiveCategory('all')}>
              <Text style={[typography.body, { color: colors.primaryTeal, marginTop: spacing.sm }]}>
                View all items
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.verticalGrid}>
            {filteredItems.map((item) => {
              const imgSource = typeof item.imageUrl === 'number' ? item.imageUrl : { uri: item.imageUrl };
              const isSold = item.sold === true || item.available === false;
              return (
                <Pressable
                  key={item.id}
                  onPress={() => !isSold && navigation.navigate('ProductDetail', { item })}
                  style={styles.gridCard}
                  disabled={isSold}
                >
                  <View style={styles.gridImageWrap}>
                    <Image
                      source={imgSource}
                      style={[styles.gridImage, isSold && { opacity: 0.4 }]}
                      resizeMode="cover"
                    />
                    {isSold ? (
                      <View style={styles.soldBadge}>
                        <Text style={styles.soldBadgeText}>SOLD OUT</Text>
                      </View>
                    ) : (
                      <View style={styles.availableBadge}>
                        <Text style={styles.availableBadgeText}>Available</Text>
                      </View>
                    )}
                    {!isSold && item.demand === 'high' && (
                      <View style={styles.demandBadge}>
                        <Text style={styles.demandBadgeText}>High Demand</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[typography.caption, { marginTop: spacing.xs, color: colors.textSecondary }]} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={{ color: colors.accentGreen, fontWeight: '700', fontSize: 13 }}>
                    NPR {item.price}
                  </Text>
                  <Text style={typography.caption}>{item.condition}</Text>
                </Pressable>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Cart')}>
        <Text style={{ color: '#FFFFFF', fontSize: 24 }}>🛍</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  editStyleBtn: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.surface, borderRadius: radius.pill,
    paddingHorizontal: spacing.sm, paddingVertical: 4,
    borderWidth: 1, borderColor: colors.border,
  },
  editStyleText: { fontSize: 11, fontWeight: '700', color: colors.primary },
  categoryBar: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: spacing.sm },
  categoryChip: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.xs,
    borderRadius: radius.pill, backgroundColor: colors.surface, gap: spacing.xs,
  },
  categoryChipActive:     { backgroundColor: colors.primary },
  categoryChipPreferred:  { backgroundColor: colors.primaryTeal + '33', borderWidth: 1, borderColor: colors.primaryTeal },
  categoryChipText:       { fontSize: 13, fontWeight: '600', color: colors.textPrimary },
  categoryChipTextActive: { color: '#FFFFFF' },
  preferenceBanner: {
    backgroundColor: colors.primaryTeal + '15',
    paddingHorizontal: spacing.md, paddingVertical: 6,
    borderBottomWidth: 1, borderBottomColor: colors.primaryTeal + '30',
  },
  bannerTile:      { width: 100, height: 120, borderRadius: radius.md, overflow: 'hidden' },
  bannerImage:     { width: '100%', height: '100%' },
  bannerOverlay:   { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.28)' },
  bannerLabelWrap: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 6 },
  bannerLabel:     { color: '#FFFFFF', fontWeight: '700', fontSize: 11 },
  demandBanner: {
    backgroundColor: colors.surface, borderRadius: radius.md,
    padding: spacing.md, flexDirection: 'row', alignItems: 'center',
  },
  horizontalCard:      { width: 156 },
  horizontalImageWrap: { width: 156, height: 176, borderRadius: radius.md, overflow: 'hidden' },
  horizontalImage:     { width: '100%', height: '100%' },
  demandBadge: {
    position: 'absolute', top: spacing.xs, left: spacing.xs,
    backgroundColor: colors.accentGreen,
    paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill,
  },
  demandBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
  soldBadge: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center', alignItems: 'center',
  },
  soldBadgeText: {
    color: '#FFFFFF', fontSize: 13, fontWeight: '800', letterSpacing: 1,
    borderWidth: 1.5, borderColor: '#FFFFFF',
    paddingHorizontal: spacing.sm, paddingVertical: 3, borderRadius: radius.sm,
  },
  availableBadge: {
    position: 'absolute', bottom: spacing.xs, right: spacing.xs,
    backgroundColor: colors.accentGreen,
    paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill,
  },
  availableBadgeText: { color: '#FFFFFF', fontSize: 9, fontWeight: '700' },
  verticalGrid:  { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  gridCard:      { width: '47%' },
  gridImageWrap: { width: '100%', aspectRatio: 0.85, borderRadius: radius.md, overflow: 'hidden' },
  gridImage:     { width: '100%', height: '100%' },
  emptyState:    { alignItems: 'center', paddingVertical: spacing.xl },
  fab: {
    position: 'absolute', bottom: spacing.lg, right: spacing.lg,
    width: 56, height: 56, borderRadius: 999,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center', elevation: 4,
  },
});