import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const LISTINGS = [
  { id: '1', title: 'Vintage Denim Jacket', seller: 'Maya Store', price: '1,200', status: 'Pending', image: require('../../../assets/icon.png') },
  { id: '2', title: 'Wool Overcoat', seller: 'Aarav Shop', price: '3,145', status: 'Approved', image: require('../../../assets/icon.png') },
  { id: '3', title: 'Leather Jacket', seller: 'Priya Store', price: '6,585', status: 'Rejected', image: require('../../../assets/icon.png') },
];

const STATUS_COLORS = {
  Pending: colors.amber,
  Approved: colors.accentGreen,
  Rejected: colors.danger,
};

export default function AdminListingsScreen({ navigation }) {
  const [filter, setFilter] = useState('All');
  const [listings, setListings] = useState(LISTINGS);

  const updateStatus = (id, status) => {
    setListings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  const filtered = listings.filter(
    (item) => filter === 'All' || item.status === filter
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        title="Moderate Listings"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ maxHeight: 50, padding: spacing.sm }}
      >
        {['All', 'Pending', 'Approved', 'Rejected'].map((f) => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[
              styles.filterChip,
              filter === f && styles.filterChipActive,
            ]}
          >
            <Text
              style={{
                color: filter === f ? '#FFFFFF' : colors.textPrimary,
                fontSize: 12,
              }}
            >
              {f}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {filtered.map((listing) => (
          <View key={listing.id} style={styles.card}>
            <Image source={listing.image} style={styles.image} />

            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading} numberOfLines={1}>
                {listing.title}
              </Text>

              <Text
                style={[
                  typography.caption,
                  { color: colors.textSecondary },
                ]}
              >
                By {listing.seller}
              </Text>

              <Text
                style={{
                  color: colors.accentGreen,
                  fontWeight: '700',
                }}
              >
                NPR {listing.price}
              </Text>

              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      STATUS_COLORS[listing.status] + '22',
                  },
                ]}
              >
                <Text
                  style={{
                    color: STATUS_COLORS[listing.status],
                    fontSize: 10,
                    fontWeight: '700',
                  }}
                >
                  {listing.status}
                </Text>
              </View>
            </View>

            {listing.status === 'Pending' && (
              <View style={{ gap: spacing.xs }}>
                <Pressable
                  style={styles.approveBtn}
                  onPress={() => updateStatus(listing.id, 'Approved')}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: '700',
                    }}
                  >
                    ✓ Approve
                  </Text>
                </Pressable>

                <Pressable
                  style={styles.rejectBtn}
                  onPress={() => updateStatus(listing.id, 'Rejected')}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 11,
                      fontWeight: '700',
                    }}
                  >
                    ✕ Reject
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    marginRight: spacing.xs,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: radius.sm,
    backgroundColor: colors.background,
  },
  statusBadge: {
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  approveBtn: {
    backgroundColor: colors.accentGreen,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  rejectBtn: {
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
});