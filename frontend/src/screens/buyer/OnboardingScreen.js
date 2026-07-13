import { useState, useRef } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography, radius } from '../../theme/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    icon: '🛍',
    title: 'Discover Unique Thrift',
    subtitle: 'Find pre-loved clothing from verified sellers across Nepal. Authentic, affordable, sustainable.',
    color: colors.primary,
  },
  {
    id: '2',
    icon: '🤖',
    title: 'AI-Powered Recommendations',
    subtitle: 'Our smart algorithm learns your style preferences and recommends items you will love.',
    color: colors.primaryTeal,
  },
  {
    id: '3',
    icon: '💚',
    title: 'Shop Sustainably',
    subtitle: 'Every thrift purchase reduces fashion waste. Track your carbon savings and environmental impact.',
    color: colors.accentGreen,
  },
  {
    id: '4',
    icon: '💳',
    title: 'Safe & Secure Payments',
    subtitle: 'Pay with eSewa or Cash on Delivery. Every transaction is protected by Smart Thrift.',
    color: colors.amber,
  },
];

export default function OnboardingScreen({ navigation }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);

  // FIX: read the device's safe-area insets so we can pad the bottom button
  // area by the correct amount on every device (gesture-nav devices, 3-button
  // nav devices, notches, etc). Previously the button used a fixed
  // `spacing.lg` padding which isn't enough on many Android devices, causing
  // the "Next" button to render underneath/overlapping the system nav bar.
  const insets = useSafeAreaInsets();

  function handleNext() {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.replace('Welcome');
    }
  }

  function handleSkip() {
    navigation.replace('Welcome');
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: spacing.lg, paddingTop: spacing.lg + insets.top }}>
        <Pressable onPress={handleSkip}>
          <Text style={[typography.body, { color: colors.textSecondary }]}>Skip</Text>
        </Pressable>
      </View>

      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onMomentumScrollEnd={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={[styles.iconCircle, { backgroundColor: item.color + '22' }]}>
              <Text style={{ fontSize: 80 }}>{item.icon}</Text>
            </View>
            <Text style={[typography.heading, { textAlign: 'center', fontSize: 28, marginTop: spacing.xl }]}>
              {item.title}
            </Text>
            <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md, lineHeight: 24, paddingHorizontal: spacing.lg }]}>
              {item.subtitle}
            </Text>
          </View>
        )}
      />

      <View style={styles.dotsRow}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? colors.primary : colors.border },
              i === currentIndex && { width: 24 },
            ]}
          />
        ))}
      </View>

      {/* FIX: bottom padding now includes insets.bottom (safe area) on top
          of the usual spacing.lg, so the button always sits fully above the
          system navigation bar / home indicator, on any device. */}
      <View style={{ paddingHorizontal: spacing.lg, paddingTop: spacing.lg, paddingBottom: spacing.lg + insets.bottom }}>
        <Pressable
          style={[styles.nextBtn, { backgroundColor: SLIDES[currentIndex].color }]}
          onPress={handleNext}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            {currentIndex === SLIDES.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: { alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg },
  iconCircle: { width: 180, height: 180, borderRadius: 999, justifyContent: 'center', alignItems: 'center' },
  dotsRow: { flexDirection: 'row', justifyContent: 'center', gap: spacing.xs, marginBottom: spacing.lg },
  dot: { width: 8, height: 8, borderRadius: radius.pill, backgroundColor: colors.border },
  nextBtn: { borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
});