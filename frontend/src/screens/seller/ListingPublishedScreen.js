import { View, Text, ScrollView, Pressable, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

export default function ListingPublishedScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        title="The Exchange"
        onBack={() => navigation.navigate('MainTabs')}
        rightIcon="✕"
        onRightPress={() => navigation.navigate('MainTabs')}
      />

      <ScrollView
        contentContainerStyle={{
          padding: spacing.lg,
          alignItems: 'center',
        }}
      >
        <View style={styles.successCircle}>
          <Text style={{ color: '#FFFFFF', fontSize: 32 }}>✓</Text>
        </View>

        <Text
          style={[
            typography.heading,
            {
              marginTop: spacing.lg,
              textAlign: 'center',
            },
          ]}
        >
          Listing Published!
        </Text>

        <Text
          style={[
            typography.body,
            {
              color: colors.textSecondary,
              textAlign: 'center',
              marginTop: spacing.xs,
            },
          ]}
        >
          Your item is now live and visible to thousands of collectors.
        </Text>

        <View style={styles.previewCard}>
          <View style={styles.demandBadge}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 10,
                fontWeight: '700',
              }}
            >
              PREDICTED HIGH DEMAND
            </Text>
          </View>

          <Image
            source={{
              uri: 'https://cdn.pixabay.com/photo/2016/09/15/09/13/coat-1671751_640.jpg',
            }}
            style={styles.previewImage}
          />

          <Text
            style={[
              typography.subheading,
              {
                marginTop: spacing.md,
              },
            ]}
          >
            Heritage Moto Jacket
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                color: colors.accentGreen,
                fontWeight: '700',
              }}
            >
              NPR 4450.00
            </Text>

            <Text
              style={[
                typography.caption,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              Condition: Mint
            </Text>
          </View>
        </View>

        <View style={styles.insightRow}>
          <Text style={{ fontSize: 16 }}>📈</Text>

          <View
            style={{
              flex: 1,
              marginLeft: spacing.sm,
            }}
          >
            <Text style={typography.subheading}>
              Market Insight
            </Text>

            <Text
              style={[
                typography.caption,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              With 24% rising interest in luxury outerwear, we expect this
              listing to sell within 48 hours.
            </Text>
          </View>
        </View>

        <View style={styles.insightRow}>
          <Text style={{ fontSize: 16 }}>👁</Text>

          <View
            style={{
              flex: 1,
              marginLeft: spacing.sm,
            }}
          >
            <Text style={typography.subheading}>
              Views Predicted
            </Text>

            <Text
              style={[
                typography.caption,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              1.2K - 2.5K
            </Text>
          </View>
        </View>

        <View style={styles.badgeRow}>
          <Text style={{ fontSize: 16 }}>🏆</Text>

          <Text
            style={[
              typography.subheading,
              {
                marginLeft: spacing.sm,
              },
            ]}
          >
            Seller Badge "First Starter" Unlocked
          </Text>
        </View>

        <Pressable
          style={styles.viewBtn}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: '700',
            }}
          >
            View Listing 👁
          </Text>
        </Pressable>

        <Pressable
          style={styles.homeBtn}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <Text
            style={{
              color: colors.primary,
              fontWeight: '700',
            }}
          >
            Go to Home 🏠
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.accentGreen,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewCard: {
    width: '100%',
    backgroundColor: colors.surface || '#FFFFFF',
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  demandBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.accentGreen,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    marginBottom: spacing.sm,
  },
  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: radius.sm,
    marginTop: spacing.sm,
  },
  insightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: spacing.lg,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: spacing.lg,
  },
  viewBtn: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  homeBtn: {
    width: '100%',
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
});