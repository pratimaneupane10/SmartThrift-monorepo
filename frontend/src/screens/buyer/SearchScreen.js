import { useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { mockItems } from '../../api/mockData';
import BackHeader from '../../components/composite/BackHeader';

const RECENT = ['90s Leather Blazer', 'Silk Scarf', 'Raw Indigo'];
const CATEGORIES = [
  { name: 'Outerwear', color: colors.primaryTeal, icon: '🧥' },
  { name: 'Timepieces', color: colors.lightBlue, icon: '⌚' },
  { name: 'Rare Finds', color: '#E8F4F8', icon: '🔍' },
  { name: 'Archival Shoes', color: colors.danger, icon: '👟' },
];

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  function handleSearch(text) {
    setQuery(text);
    if (text.length > 1) {
      const filtered = mockItems.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase()) ||
        item.condition.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Text style={[typography.subheading, { color: colors.primary, fontWeight: '800' }]}>
          SMART THRIFT
        </Text>
        <Text style={{ fontSize: 20 }}>🛍</Text>
      </View>

      <View style={{ padding: spacing.md }}>
        <View style={styles.searchBar}>
          <Text style={{ marginRight: spacing.sm, color: colors.textSecondary }}>🔍</Text>
          <TextInput
            placeholder="Search for unique finds..."
            placeholderTextColor={colors.textSecondary}
            style={{ flex: 1, fontSize: 14 }}
            value={query}
            onChangeText={handleSearch}
            onSubmitEditing={() => navigation.navigate('SearchResults', { query })}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <Pressable onPress={() => { setQuery(''); setResults([]); setSearched(false); }}>
              <Text style={{ color: colors.textSecondary }}>✕</Text>
            </Pressable>
          )}
        </View>

        {searched && results.length > 0 && (
          <View style={styles.liveResults}>
            {results.map((item) => {
              const imgSource = typeof item.imageUrl === 'number'
                ? item.imageUrl
                : { uri: item.imageUrl };
              return (
                <Pressable
                  key={item.id}
                  style={styles.resultRow}
                  onPress={() => navigation.navigate('ProductDetail', { item })}
                >
                  <Image source={imgSource} style={styles.resultImage} />
                  <View style={{ flex: 1, marginLeft: spacing.md }}>
                    <Text style={typography.subheading}>{item.title}</Text>
                    <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                      NPR {item.price}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        )}

        {searched && results.length === 0 && (
          <View style={{ padding: spacing.lg, alignItems: 'center' }}>
            <Text style={{ fontSize: 32 }}>🔍</Text>
            <Text style={[typography.subheading, { marginTop: spacing.md }]}>No results found</Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>
              Try a different search term
            </Text>
          </View>
        )}

        {!searched && (
          <>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg }}>
              <Text style={[typography.subheading, { color: colors.primaryTeal }]}>Recent Searches</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>CLEAR ALL</Text>
            </View>
            <View style={styles.chipRow}>
              {RECENT.map((r) => (
                <Pressable
                  key={r}
                  style={styles.recentChip}
                  onPress={() => handleSearch(r)}
                >
                  <Text style={typography.caption}>{r} ×</Text>
                </Pressable>
              ))}
            </View>

            <Text style={[typography.subheading, { color: colors.primaryTeal, marginTop: spacing.lg, marginBottom: spacing.sm }]}>
              Trending Categories
            </Text>
            <View style={styles.grid}>
              {CATEGORIES.map((cat) => (
                <Pressable
                  key={cat.name}
                  style={[styles.tile, { backgroundColor: cat.color }]}
                  onPress={() => handleSearch(cat.name)}
                >
                  <Text style={{ fontSize: 28 }}>{cat.icon}</Text>
                  <Text style={{ color: cat.name === 'Rare Finds' ? colors.textPrimary : '#FFFFFF', fontWeight: '600', marginTop: spacing.xs }}>
                    {cat.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  liveResults: { backgroundColor: colors.background, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, marginTop: spacing.xs },
  resultRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  resultImage: { width: 50, height: 50, borderRadius: radius.sm },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.sm },
  recentChip: { paddingVertical: spacing.xs, paddingHorizontal: spacing.sm, backgroundColor: colors.surface, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.border },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  tile: { width: '47%', aspectRatio: 1.2, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center' },
});