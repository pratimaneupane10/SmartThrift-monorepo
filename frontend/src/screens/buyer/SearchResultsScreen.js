import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Image } from 'react-native';
import { mockItems } from '../../api/mockData';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const FILTERS = ['Trending', 'Newest', 'Price: Low-High'];
const CATEGORIES = ['Jackets', 'Pants', 'Footwear', 'Accessories'];
const SIZES = ['S', 'M', 'L', 'XL'];

export default function SearchResultsScreen({ route, navigation }) {
  const query = route.params?.query || 'Outerwear';
  const [activeFilter, setActiveFilter] = useState('Trending');
  const [activeCategory, setActiveCategory] = useState('Jackets');
  const [activeSize, setActiveSize] = useState('M');
  const [showFilter, setShowFilter] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title={query}
  onBack={() => navigation.goBack()}
  rightIcon="⚙"
  onRightPress={() => setShowFilter(!showFilter)}
/>
        

      {showFilter && (
        <View style={styles.filterPanel}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={typography.subheading}>Refine Collection</Text>
            <Pressable onPress={() => setShowFilter(false)}>
              <Text style={{ fontSize: 18 }}>✕</Text>
            </Pressable>
          </View>
          <Text style={[typography.caption, { marginTop: spacing.md }]}>SORT BY</Text>
          <View style={styles.chipRow}>
            {FILTERS.map((f) => (
              <Pressable key={f} onPress={() => setActiveFilter(f)} style={[styles.chip, activeFilter === f && styles.chipActive]}>
                <Text style={{ color: activeFilter === f ? '#FFFFFF' : colors.textPrimary, fontSize: 12 }}>{f}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[typography.caption, { marginTop: spacing.md }]}>CATEGORY</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((c) => (
              <Pressable key={c} onPress={() => setActiveCategory(c)} style={[styles.chip, activeCategory === c && styles.chipActive]}>
                <Text style={{ color: activeCategory === c ? '#FFFFFF' : colors.textPrimary, fontSize: 12 }}>{c}</Text>
              </Pressable>
            ))}
          </View>
          <Text style={[typography.caption, { marginTop: spacing.md }]}>SIZE</Text>
          <View style={styles.chipRow}>
            {SIZES.map((s) => (
              <Pressable key={s} onPress={() => setActiveSize(s)} style={[styles.sizeBtn, activeSize === s && styles.sizeBtnActive]}>
                <Text style={{ color: activeSize === s ? '#FFFFFF' : colors.textPrimary, fontWeight: '600' }}>{s}</Text>
              </Pressable>
            ))}
          </View>
          <Pressable style={styles.applyBtn} onPress={() => setShowFilter(false)}>
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Apply Filters →</Text>
          </Pressable>
        </View>
      )}

      <FlatList
        data={mockItems}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        columnWrapperStyle={{ gap: spacing.sm }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { item })}
          >
            source={typeof item.imageUrl === 'number' ? item.imageUrl : { uri: item.imageUrl }}
            {item.demand === 'high' && (
              <View style={styles.badge}>
                <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>HIGH DEMAND</Text>
              </View>
            )}
            <Text style={[typography.caption, { marginTop: spacing.xs, color: colors.textSecondary }]}>
              {item.condition?.toUpperCase()}
            </Text>
            <Text style={typography.subheading} numberOfLines={1}>{item.title}</Text>
            <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>NPR {item.price}</Text>
            <Text style={typography.caption}>{item.size || 'M'}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  filterPanel: { backgroundColor: colors.background, padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border, elevation: 4 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.xs },
  chip: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  sizeBtn: { width: 44, height: 44, borderRadius: radius.sm, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  sizeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  applyBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  card: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.sm },
  cardImage: { width: '100%', aspectRatio: 0.85, borderRadius: radius.sm },
  badge: { position: 'absolute', top: spacing.xs, left: spacing.xs, backgroundColor: colors.accentGreen, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill },
});