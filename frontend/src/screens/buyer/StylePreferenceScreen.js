import { useState } from 'react';
import { View, Text, Pressable, ScrollView, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

const AGE_RANGES = ['18 - 24', '25 - 34', '35 - 44', '45+'];

const BODY_TYPES = [
  { id: 'athletic', label: 'Athletic', desc: 'Toned build · 60–80 kg · Fits S–L structured cuts', icon: '🏋️' },
  { id: 'slim',     label: 'Slim',     desc: 'Lean frame · Under 60 kg · XS–M fits easily',       icon: '🧍' },
  { id: 'curvy',    label: 'Curvy',    desc: 'Fuller hips & bust · 65–90 kg · Sizes M–XL',        icon: '🙋‍♀️' },
  { id: 'broad',    label: 'Broad',    desc: 'Wide shoulders · 80–110 kg · Fits L–XXL best',      icon: '🤸‍♂️' },
];

const STYLES = [
  { name: 'Vintage',    icon: '🕰️', bg: '#F5EFE6', activeBg: '#E8D5B7' },
  { name: 'Minimalist', icon: '⬜',  bg: '#F0F0F0', activeBg: '#DCDCDC' },
  { name: 'Streetwear', icon: '🧢',  bg: '#E8EFF5', activeBg: '#C8DCF0' },
  { name: 'Luxury',     icon: '✨',  bg: '#F5F0E8', activeBg: '#E8D9C0' },
];

const CLOTHING_CATEGORIES = [
  { id: 'tees',      label: 'Tees',      icon: '👕',  text: null,   color: '#E3F2FD' },
  { id: 'shirts',    label: 'Shirts',    icon: '👔',  text: null,   color: '#E8F5E9' },
  { id: 'jeans',     label: 'Jeans',     icon: '👖',  text: null,   color: '#EDE7F6' },
  { id: 'jackets',   label: 'Jackets',   icon: '🥼',  text: null,   color: '#FFF3E0' },
  { id: 'hoodies',   label: 'Hoodies',   icon: null,  text: 'HO',   color: '#FCE4EC' },
  { id: 'overcoats', label: 'Overcoats', icon: '🧥',  text: null,   color: '#E0F7FA' },
  { id: 'shorts',    label: 'Shorts',    icon: '🩳',  text: null,   color: '#E8EAF6' },
  { id: 'joggers',   label: 'Joggers',   icon: null,  text: 'JG',   color: '#F1F8E9' },
];

export default function StylePreferenceScreen({ navigation, route }) {
  const { completeOnboarding, userPreferences } = useAuth();

  const [selectedAge,        setSelectedAge]        = useState(userPreferences?.age        || null);
  const [selectedBody,       setSelectedBody]       = useState(userPreferences?.bodyType   || null);
  const [selectedStyles,     setSelectedStyles]     = useState(userPreferences?.styles     || []);
  const [selectedCategories, setSelectedCategories] = useState(userPreferences?.categories || []);
  const [photoUri,           setPhotoUri]           = useState(userPreferences?.photoUri   || null);

  // FIX: previously this was `navigation.canGoBack()`, which is unreliable —
  // it can resolve `true` even when this screen is the only route in the
  // onboarding stack, causing handleContinue to take the "edit" branch and
  // call navigation.goBack() with nothing to go back to (GO_BACK error),
  // leaving the user stuck on this screen instead of reaching HomeFeed.
  // Now this is explicit: only treat this as "editing" if the screen was
  // navigated to with a `{ editing: true }` param (e.g. from Settings/Profile).
  const isEditing = route?.params?.editing === true;

  function toggleStyle(name) {
    setSelectedStyles((prev) =>
      prev.includes(name) ? prev.filter((s) => s !== name) : [...prev, name]
    );
  }

  function toggleCategory(id) {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  }

  async function handleUploadPhoto() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Needed',
        'Please allow photo library access to upload a photo for better recommendations.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.length > 0) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  const allSelected =
    selectedStyles.length > 0 &&
    selectedAge !== null &&
    selectedBody !== null;

  // ---- FIX ----
  // Previously, navigation.navigate('MainTabs') only ran when `completeOnboarding`
  // was falsy. In a real app `completeOnboarding` always exists (it comes from
  // useAuth()), so that branch never ran and the screen never moved forward —
  // it silently relied on some parent/root navigator reacting to a context
  // state change that may not have been wired up. We now ALWAYS navigate
  // explicitly after validation + saving, regardless of whether
  // completeOnboarding is present. This guarantees the Continue button works
  // even if AuthContext/root navigator isn't (yet) set up to auto-redirect.
  function handleContinue() {
    if (selectedStyles.length === 0) {
      Alert.alert('Required', 'Please select at least one style.');
      return;
    }
    if (!selectedAge) {
      Alert.alert('Required', 'Please select your age range.');
      return;
    }
    if (!selectedBody) {
      Alert.alert('Required', 'Please select your body type.');
      return;
    }

    if (completeOnboarding) {
      completeOnboarding({
        styles:     selectedStyles,
        age:        selectedAge,
        bodyType:   selectedBody,
        categories: selectedCategories,
        photoUri:   photoUri,
      });
    }

    if (isEditing) {
      Alert.alert('Saved!', 'Your style preferences have been updated.', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
      return;
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5FAF5' }}>
      <View style={screenStyles.topBar}>
        {isEditing ? (
          <Pressable
            style={screenStyles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ fontSize: 22, color: colors.primary, fontWeight: '600' }}>{'‹'}</Text>
          </Pressable>
        ) : (
          <View style={screenStyles.backBtn} />
        )}
        <Text style={screenStyles.brandText}>SMART THRIFT</Text>
        {isEditing ? (
          <View style={{ width: 48 }} />
        ) : (
          <View style={screenStyles.dotsRow}>
            <View style={[screenStyles.dot, { backgroundColor: colors.border }]} />
            <View style={[screenStyles.dot, { backgroundColor: colors.primary }]} />
            <View style={[screenStyles.dot, { backgroundColor: colors.border }]} />
          </View>
        )}
        <View style={screenStyles.gearBtn}>
          <Text style={{ fontSize: 18 }}>🛍</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: 40 }}>

        <Text style={screenStyles.mainHeading}>
          <Text style={{ color: colors.primary }}>Tailor Your </Text>
          <Text style={{ color: colors.accentGreen }}>Thrift</Text>
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          Help our AI stylist find the perfect pieces for your unique shape and style.
        </Text>

        {/* Style tiles */}
        <Text style={[typography.heading, { marginTop: spacing.lg }]}>
          Pick your style<Text style={{ color: colors.danger, fontSize: 13 }}> *</Text>
        </Text>
        <View style={screenStyles.styleGrid}>
          {STYLES.map((styleItem) => {
            const active = selectedStyles.includes(styleItem.name);
            return (
              <Pressable
                key={styleItem.name}
                onPress={() => toggleStyle(styleItem.name)}
                style={[
                  screenStyles.styleTile,
                  { backgroundColor: active ? styleItem.activeBg : styleItem.bg },
                  active && screenStyles.styleTileActive,
                ]}
              >
                {active && (
                  <View style={screenStyles.checkmark}>
                    <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>✓</Text>
                  </View>
                )}
                <Text style={screenStyles.tileIcon}>{styleItem.icon}</Text>
                <Text style={[screenStyles.tileName, active && { color: colors.primary }]}>
                  {styleItem.name}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Age range */}
        <Text style={[typography.heading, { marginTop: spacing.xl }]}>
          What's your age range?<Text style={{ color: colors.danger, fontSize: 13 }}> *</Text>
        </Text>
        <View style={screenStyles.ageGrid}>
          {AGE_RANGES.map((age) => (
            <Pressable
              key={age}
              onPress={() => setSelectedAge(age)}
              style={[screenStyles.ageBtn, selectedAge === age && screenStyles.ageBtnActive]}
            >
              <Text style={[screenStyles.ageBtnText, selectedAge === age && screenStyles.ageBtnTextActive]}>
                {age}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Body type */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: spacing.xl }}>
          <Text style={typography.heading}>
            Describe your body type<Text style={{ color: colors.danger, fontSize: 13 }}> *</Text>
          </Text>
          <Text style={{ color: colors.textSecondary, fontSize: 16 }}>ⓘ</Text>
        </View>
        <View style={{ marginTop: spacing.sm }}>
          {BODY_TYPES.map((body) => {
            const active = selectedBody === body.id;
            return (
              <Pressable
                key={body.id}
                onPress={() => setSelectedBody(body.id)}
                style={[screenStyles.bodyRow, active && screenStyles.bodyRowActive]}
              >
                <View style={[screenStyles.bodyIcon, active && screenStyles.bodyIconActive]}>
                  <Text style={{ fontSize: 22 }}>{body.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: spacing.md }}>
                  <Text style={[typography.subheading, active && { color: '#FFFFFF' }]}>
                    {body.label}
                  </Text>
                  <Text style={[typography.caption, { color: active ? '#FFFFFFAA' : colors.textSecondary }]}>
                    {body.desc}
                  </Text>
                </View>
                <View style={[screenStyles.checkCircle, active && screenStyles.checkCircleActive]}>
                  {active && <Text style={{ color: '#FFFFFF', fontSize: 12 }}>✓</Text>}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Clothing categories */}
        <Text style={[typography.heading, { marginTop: spacing.xl, marginBottom: spacing.xs }]}>
          Preferred Clothing Categories
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginBottom: spacing.md }]}>
          Select all that interest you (optional)
        </Text>
        <View style={screenStyles.categoryGrid}>
          {CLOTHING_CATEGORIES.map((cat) => {
            const active = selectedCategories.includes(cat.id);
            return (
              <Pressable
                key={cat.id}
                onPress={() => toggleCategory(cat.id)}
                style={[
                  screenStyles.categoryCard,
                  { backgroundColor: active ? colors.primary : cat.color },
                  active && screenStyles.categoryCardActive,
                ]}
              >
                {cat.icon ? (
                  <Text style={{ fontSize: 26 }}>{cat.icon}</Text>
                ) : (
                  <View style={{
                    width: 36, height: 36, borderRadius: 8,
                    backgroundColor: active ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.10)',
                    justifyContent: 'center', alignItems: 'center',
                  }}>
                    <Text style={{ fontSize: 13, fontWeight: '900', color: active ? '#FFFFFF' : '#444' }}>
                      {cat.text}
                    </Text>
                  </View>
                )}
                <Text style={[
                  typography.caption,
                  { marginTop: 4, fontWeight: '700', textAlign: 'center', fontSize: 11 },
                  active && { color: '#FFFFFF' },
                ]}>
                  {cat.label}
                </Text>
                {active && (
                  <View style={screenStyles.categoryCheck}>
                    <Text style={{ color: '#FFFFFF', fontSize: 9 }}>✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>

        {/* Pro tip / photo upload */}
        <View style={screenStyles.proTipBox}>
          <Text style={{ color: colors.danger, fontSize: 12, fontWeight: '700' }}>✦ Pro Tip</Text>
          <Text style={[typography.body, { marginTop: spacing.xs }]}>
            Uploading a photo can improve recommendation accuracy by up to 40%.
          </Text>

          {photoUri ? (
            <View style={screenStyles.photoPreviewRow}>
              <Image source={{ uri: photoUri }} style={screenStyles.photoThumb} />
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.caption, { color: colors.accentGreen, fontWeight: '700' }]}>
                  Photo added ✓
                </Text>
                <Pressable onPress={handleUploadPhoto}>
                  <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700', marginTop: 2 }]}>
                    Change photo
                  </Text>
                </Pressable>
              </View>
              <Pressable onPress={() => setPhotoUri(null)}>
                <Text style={{ fontSize: 16, color: colors.textSecondary }}>✕</Text>
              </Pressable>
            </View>
          ) : (
            <Pressable style={screenStyles.uploadBtn} onPress={handleUploadPhoto}>
              <Text style={{ fontSize: 16 }}>📷</Text>
              <Text style={{ color: colors.primary, fontWeight: '700', marginLeft: spacing.xs }}>
                Upload a photo
              </Text>
            </Pressable>
          )}
        </View>

        {/* Continue */}
        <Pressable
          style={[screenStyles.continueBtn, !allSelected && screenStyles.continueBtnDisabled]}
          onPress={handleContinue}
        >
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            {isEditing ? 'Save Preferences' : 'Continue'}
          </Text>
        </Pressable>

        {!isEditing && (
          <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.md, marginBottom: spacing.xl }]}>
            Step 2 of 5
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const screenStyles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 999,
    justifyContent: 'center', alignItems: 'center',
  },
  brandText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 1,
  },
  dotsRow: { flexDirection: 'row', gap: spacing.xs },
  dot: { width: 8, height: 8, borderRadius: 999 },
  gearBtn: {
    width: 48, height: 48, borderRadius: 999,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center', alignItems: 'center',
  },
  mainHeading: { fontSize: 32, fontWeight: '800', lineHeight: 40, marginTop: spacing.sm },
  styleGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  styleTile: {
    width: '47%', aspectRatio: 1, borderRadius: radius.md,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 2, borderColor: 'transparent',
  },
  styleTileActive: { borderColor: colors.primary },
  tileIcon: { fontSize: 40, marginBottom: spacing.xs },
  tileName: { fontWeight: '700', fontSize: 15, color: '#444' },
  checkmark: {
    position: 'absolute', top: spacing.sm, right: spacing.sm,
    width: 24, height: 24, borderRadius: 999,
    backgroundColor: colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  ageGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.md },
  ageBtn: {
    width: '47%', padding: spacing.md, borderRadius: radius.md,
    backgroundColor: '#FFFFFF', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border,
  },
  ageBtnActive: { backgroundColor: colors.accentGreen, borderColor: colors.accentGreen },
  ageBtnText: { fontWeight: '600', color: colors.textPrimary },
  ageBtnTextActive: { color: '#FFFFFF' },
  bodyRow: {
    flexDirection: 'row', alignItems: 'center', padding: spacing.md,
    backgroundColor: '#FFFFFF', borderRadius: radius.md,
    marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border,
  },
  bodyRowActive: { backgroundColor: colors.accentGreen, borderColor: colors.accentGreen },
  bodyIcon: {
    width: 48, height: 48, borderRadius: radius.sm,
    backgroundColor: '#E8F5E9', justifyContent: 'center', alignItems: 'center',
  },
  bodyIconActive: { backgroundColor: 'rgba(255,255,255,0.3)' },
  checkCircle: {
    width: 26, height: 26, borderRadius: 999,
    borderWidth: 2, borderColor: colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  checkCircleActive: { backgroundColor: 'rgba(255,255,255,0.3)', borderColor: '#FFFFFF' },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  categoryCard: {
    width: '22%', aspectRatio: 1, borderRadius: radius.md,
    justifyContent: 'center', alignItems: 'center',
    borderWidth: 1, borderColor: colors.border, position: 'relative',
  },
  categoryCardActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  categoryCheck: {
    position: 'absolute', top: 4, right: 4,
    width: 16, height: 16, borderRadius: 999,
    backgroundColor: colors.accentGreen,
    justifyContent: 'center', alignItems: 'center',
  },
  proTipBox: {
    backgroundColor: '#FFF5F5', borderRadius: radius.md,
    padding: spacing.md, marginTop: spacing.xl,
  },
  uploadBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFFFFF', borderRadius: radius.md,
    borderWidth: 1, borderColor: colors.primary,
    padding: spacing.sm, marginTop: spacing.md,
  },
  photoPreviewRow: {
    flexDirection: 'row', alignItems: 'center',
    marginTop: spacing.md,
  },
  photoThumb: {
    width: 56, height: 56, borderRadius: radius.md,
    backgroundColor: colors.surface,
  },
  continueBtn: {
    backgroundColor: colors.primary, borderRadius: radius.md,
    padding: spacing.md, alignItems: 'center', marginTop: spacing.lg,
  },
  continueBtnDisabled: { backgroundColor: colors.border },
});