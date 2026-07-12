import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { mockItems } from '../../api/mockData';
import BackHeader from '../../components/composite/BackHeader';

export default function SellerProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Seller Profile"
  onBack={() => navigation.goBack()}
  rightIcon="🛍"
/>

      <ScrollView>
        <View style={styles.profileHeader}>
          <View style={styles.avatar} />
          <View style={{ marginLeft: spacing.lg, flex: 1 }}>
            <View style={styles.verifiedBadge}>
              <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>VERIFIED SELLER</Text>
            </View>
            <Text style={[typography.heading, { marginTop: spacing.xs }]}>Eleanor V. Brixton</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              Premium Seller · Since 2021
            </Text>
            <View style={styles.ratingRow}>
              <Text style={{ color: colors.amber }}>★★★★★</Text>
              <Text style={[typography.caption, { marginLeft: spacing.xs }]}>4.9 (127 reviews)</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={[typography.heading, { color: colors.primary }]}>127</Text>
            <Text style={typography.caption}>Sales</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={[typography.heading, { color: colors.primary }]}>4.9</Text>
            <Text style={typography.caption}>Rating</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={[typography.heading, { color: colors.primary }]}>98%</Text>
            <Text style={typography.caption}>Response</Text>
          </View>
        </View>

        <View style={{ padding: spacing.lg }}>
          <Text style={typography.subheading}>Active Listings</Text>
          <View style={styles.grid}>
            {mockItems.map((product) => {
              const imgSource = typeof product.imageUrl === 'number'
                ? product.imageUrl
                : { uri: product.imageUrl };
              return (
                <Pressable
                  key={product.id}
                  style={styles.gridItem}
                  onPress={() => navigation.navigate('ProductDetail', { item: product })}
                >
                  <Image source={imgSource} style={styles.gridImage} />
                  {product.demand === 'high' && (
                    <View style={styles.demandBadge}>
                      <Text style={{ color: '#FFFFFF', fontSize: 9, fontWeight: '700' }}>HIGH</Text>
                    </View>
                  )}
                  <Text style={[typography.caption, { marginTop: spacing.xs }]} numberOfLines={1}>
                    {product.title}
                  </Text>
                  <Text style={{ color: colors.accentGreen, fontWeight: '700', fontSize: 13 }}>
                    NPR {product.price}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          style={styles.messageBtn}
          onPress={() => navigation.navigate('Chat', { contact: { name: 'Eleanor V. Brixton' } })}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>💬 Message Seller</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  profileHeader: { flexDirection: 'row', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  avatar: { width: 80, height: 80, borderRadius: 999, backgroundColor: colors.mintIcon },
  verifiedBadge: { backgroundColor: colors.primaryTeal, alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.xs },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', padding: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  statBox: { alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: colors.border },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  gridItem: { width: '47%' },
  gridImage: { width: '100%', aspectRatio: 1, borderRadius: radius.md },
  demandBadge: { position: 'absolute', top: spacing.xs, left: spacing.xs, backgroundColor: colors.accentGreen, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill },
  messageBtn: { backgroundColor: colors.primary, margin: spacing.lg, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
});