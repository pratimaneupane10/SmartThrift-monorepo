import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const LISTINGS = [
  {
    id: '1',
    title: ' Black Nike Shorts',
    price: 1200,
    status: 'ACTIVE',
    views: 423,
    image: require('../../../assets/item5.jpg'),
  },
  {
    id: '2',
    title: 'White Dress Shirt',
    price: 2268,
    status: 'ACTIVE',
    views: 234,
    image: require('../../../assets/item2.jpg'),
  },
  {
    id: '3',
    title: 'Marron Pullover Hoodie',
    price: 2265,
    status: 'SOLD',
    views: 89,
    image: require('../../../assets/item4.jpg'),
  },
];

export default function SellerDashboardScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

    <BackHeader
  title="My Shop"
  onBack={() => navigation.goBack()}
  rightIcon="⚙"
/>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>

        {/* Stats row */}
        <View style={styles.statsRow}>
          {[
            { icon: '📋', value: '12',  delta: '+5 this week', label: 'ACTIVE LISTINGS', deltaColor: colors.accentGreen },
            { icon: '👁',  value: '48',  delta: '+12% avg',     label: 'TOTAL SALES',    deltaColor: colors.accentGreen },
            { icon: '📈', value: '2.4k', delta: '-3%',          label: 'STORE VIEWS',    deltaColor: colors.danger },
          ].map((s) => (
            <View key={s.label} style={styles.statCard}>
              <Text style={{ fontSize: 20 }}>{s.icon}</Text>
              <Text style={[typography.heading, { color: colors.primary, marginTop: spacing.xs }]}>{s.value}</Text>
              <Text style={[typography.caption, { color: s.deltaColor }]}>{s.delta}</Text>
              <Text style={[typography.caption, { textAlign: 'center' }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* SmartPrint */}
        <View style={styles.smartPrint}>
          <Text style={[typography.subheading, { color: colors.primaryTeal }]}>SmartPrint</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm }}>
            <View>
              <Text style={typography.caption}>Recommended Price</Text>
              <View style={styles.demandBadge}>
                <Text style={{ color: '#FFFFFF', fontSize: 10 }}>HIGH DEMAND</Text>
              </View>
              <Text style={[typography.heading, { color: colors.primary }]}>NPR 8,500 - 12,000</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={typography.caption}>Your Avg Sales</Text>
              <Text style={[typography.subheading, { color: colors.primary }]}>NPR 10,500</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>NPR 9,000</Text>
            </View>
          </View>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.sm }]}>
            Items on trend for Vintage Cashmere. Premium items selling 53% faster now.
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>YOUR ASKING PRICE</Text>
          <Text style={[typography.subheading, { color: colors.primary }]}>NPR 10,500</Text>
          <Pressable style={styles.postBtn} onPress={() => navigation.navigate('CreateListing')}>
            <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Post Listing →</Text>
          </Pressable>
        </View>

        {/* Inventory header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg }}>
          <Text style={typography.subheading}>Apparel Inventory</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <Pressable style={styles.filterBtn}>
              <Text style={typography.caption}>Filters</Text>
            </Pressable>
            <Pressable style={styles.newListingBtn} onPress={() => navigation.navigate('CreateListing')}>
              <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>+ New Listing</Text>
            </Pressable>
          </View>
        </View>

        {/* Listing cards */}
        {LISTINGS.map((item) => (
          <View key={item.id} style={styles.listingCard}>
            {/* Image properly wrapped for overflow clip */}
            <View style={styles.listingImageWrap}>
              <Image
                source={item.image}
                style={styles.listingImage}
                resizeMode="cover"
              />
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading} numberOfLines={1}>{item.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Clothing · listed 1 day ago
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xs }}>
                <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>NPR {item.price}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: item.status === 'SOLD' ? colors.danger + '22' : colors.accentGreen + '22' },
                ]}>
                  <Text style={{
                    color: item.status === 'SOLD' ? colors.danger : colors.accentGreen,
                    fontSize: 10,
                    fontWeight: '700',
                  }}>
                    {item.status === 'SOLD' ? 'Transaction Completed' : `ACTIVE · ${item.views} views`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ gap: spacing.sm, marginLeft: spacing.sm }}>
              <Pressable><Text style={{ fontSize: 16 }}>✏</Text></Pressable>
              <Pressable><Text style={{ fontSize: 16 }}>⋯</Text></Pressable>
            </View>
          </View>
        ))}

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
  statsRow: { flexDirection: 'row', gap: spacing.sm },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  smartPrint: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  demandBadge: {
    backgroundColor: colors.danger,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginVertical: spacing.xs,
  },
  postBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  filterBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  newListingBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  listingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  listingImageWrap: {
    width: 70,
    height: 70,
    borderRadius: radius.sm,
    overflow: 'hidden',
    backgroundColor: colors.border,
  },
  listingImage: {
    width: '100%',
    height: '100%',
  },
  statusBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
});