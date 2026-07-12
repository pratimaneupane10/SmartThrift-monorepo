import { View, Text, FlatList } from 'react-native';
import ItemCard from './ItemCard';
import { spacing, typography } from '../../theme/theme';

export default function RecommendationCarousel({ title, items, onItemPress }) {
  return (
    <View style={{ marginVertical: spacing.md }}>
      <Text style={[typography.heading, { fontSize: 18, marginLeft: spacing.md, marginBottom: spacing.sm }]}>
        {title}
      </Text>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: spacing.md }}
        renderItem={({ item }) => <ItemCard item={item} onPress={onItemPress} />}
      />
    </View>
  );
}