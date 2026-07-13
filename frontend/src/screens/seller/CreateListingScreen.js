import { useState } from 'react';
import {
  View, Text, TextInput, ScrollView, Pressable,
  StyleSheet, Alert, Image
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, typography, radius } from '../../theme/theme';

const CATEGORIES = ['Jackets', 'Hoodies', 'Tees', 'Shirts', 'Jeans', 'Shorts', 'Joggers', 'Overcoats'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const CONDITIONS = ['Like New', 'Excellent', 'Good', 'Fair'];

export default function CreateListingScreen({ navigation }) {
  const [title,       setTitle]       = useState('');
  const [description, setDescription] = useState('');
  const [category,    setCategory]    = useState(null);
  const [size,        setSize]        = useState('M');
  const [condition,   setCondition]   = useState('Good');
  const [price,       setPrice]       = useState('');
  const [photos,      setPhotos]      = useState([]);

  async function pickFromGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri].slice(0, 5));
    }
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow camera access.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });
    if (!result.canceled) {
      setPhotos((prev) => [...prev, result.assets[0].uri].slice(0, 5));
    }
  }

  function removePhoto(index) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function showPhotoOptions() {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        { text: 'Take Photo',            onPress: takePhoto },
        { text: 'Choose from Gallery',   onPress: pickFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }

  function handlePreview() {
    if (!title || !category || !price) {
      Alert.alert('Missing info', 'Please fill in title, category, and price.');
      return;
    }
    navigation.navigate('ListingPreview', {
      listing: {
        title,
        description,
        category,
        size,
        condition,
        price: parseInt(price),
        demand: 'high',
        image: photos[0] || null,
      },
    });
  }

  const estimatedEarnings = price ? Math.floor(parseInt(price) * 0.85) : 0;

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>

      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 20 }}>✕</Text>
        </Pressable>
        <Text style={typography.subheading}>Post New Item</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>

        {/* Photos */}
        <Text style={[typography.caption, { color: colors.textSecondary }]}>
          PHOTOS (Up to 5)
        </Text>
        <View style={styles.photoRow}>

          {/* Primary photo box */}
          <Pressable style={styles.photoBox} onPress={showPhotoOptions}>
            {photos[0] ? (
              <View style={{ width: 140, height: 160 }}>
                <Image
                  source={{ uri: photos[0] }}
                  style={styles.photoPreview}
                  resizeMode="cover"
                />
                <Pressable style={styles.removeBtn} onPress={() => removePhoto(0)}>
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>✕</Text>
                </Pressable>
              </View>
            ) : (
              <>
                <Text style={{ fontSize: 32 }}>📷</Text>
                <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs }]}>
                  Add primary photo{'\n'}Clear, front-facing view
                </Text>
              </>
            )}
          </Pressable>

          {/* Secondary photos */}
          <View style={styles.smallPhotos}>
            {[1, 2, 3, 4].map((index) => (
              <Pressable
                key={index}
                style={styles.photoBoxSmall}
                onPress={showPhotoOptions}
              >
                {photos[index] ? (
                  <View style={{ width: 60, height: 60 }}>
                    <Image
                      source={{ uri: photos[index] }}
                      style={styles.photoPreviewSmall}
                      resizeMode="cover"
                    />
                    <Pressable style={styles.removeBtnSmall} onPress={() => removePhoto(index)}>
                      <Text style={{ color: '#FFFFFF', fontSize: 10 }}>✕</Text>
                    </Pressable>
                  </View>
                ) : (
                  <Text style={{ fontSize: 20, color: colors.textSecondary }}>+</Text>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* Demand alert */}
        <View style={styles.demandAlert}>
          <Text style={{ fontSize: 16 }}>📈</Text>
          <View style={{ flex: 1, marginLeft: spacing.sm }}>
            <Text style={[typography.subheading, { fontSize: 13 }]}>High Demand Alert</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>
              Jackets are in high demand (+24%) this week. Items sell 5x faster now!
            </Text>
          </View>
        </View>

        {/* Title */}
        <Text style={[typography.caption, { marginTop: spacing.lg, color: colors.textSecondary }]}>ITEM TITLE *</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder="e.g., Vintage Archive Parka"
          placeholderTextColor={colors.textSecondary}
        />

        {/* Description */}
        <Text style={[typography.caption, { marginTop: spacing.md, color: colors.textSecondary }]}>DESCRIPTION</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Tell us about the condition, fit, and story..."
          placeholderTextColor={colors.textSecondary}
          multiline
        />

        {/* Category */}
        <Text style={[typography.caption, { marginTop: spacing.md, color: colors.textSecondary }]}>CATEGORY *</Text>
        <View style={styles.chipRow}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat}
              onPress={() => setCategory(cat)}
              style={[styles.chip, category === cat && styles.chipActive]}
            >
              <Text style={{ color: category === cat ? '#FFFFFF' : colors.textPrimary, fontSize: 13 }}>
                {cat}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Condition */}
        <Text style={[typography.caption, { marginTop: spacing.md, color: colors.textSecondary }]}>CONDITION</Text>
        <View style={styles.chipRow}>
          {CONDITIONS.map((c) => (
            <Pressable
              key={c}
              onPress={() => setCondition(c)}
              style={[styles.chip, condition === c && styles.chipActive]}
            >
              <Text style={{ color: condition === c ? '#FFFFFF' : colors.textPrimary, fontSize: 13 }}>
                {c}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Size */}
        <Text style={[typography.caption, { marginTop: spacing.md, color: colors.textSecondary }]}>SIZE</Text>
        <View style={styles.chipRow}>
          {SIZES.map((s) => (
            <Pressable
              key={s}
              onPress={() => setSize(s)}
              style={[styles.sizeBtn, size === s && styles.sizeBtnActive]}
            >
              <Text style={{ color: size === s ? '#FFFFFF' : colors.textPrimary, fontWeight: '600' }}>
                {s}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Price */}
        <Text style={[typography.caption, { marginTop: spacing.md, color: colors.textSecondary }]}>PRICE (NPR) *</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="0"
          placeholderTextColor={colors.textSecondary}
          keyboardType="numeric"
        />
        {price ? (
          <Text style={[typography.caption, { color: colors.accentGreen, marginTop: spacing.xs }]}>
            You'll receive approximately NPR {estimatedEarnings} after fees (15%)
          </Text>
        ) : null}

        {/* Preview button */}
        <Pressable style={styles.previewBtn} onPress={handlePreview}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Preview Listing →</Text>
        </Pressable>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
  },
  photoRow:        { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  photoBox:        { width: 140, height: 160, backgroundColor: colors.surface, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderStyle: 'dashed', overflow: 'hidden' },
  photoPreview:    { width: 140, height: 160, borderRadius: radius.md },
  removeBtn:       { position: 'absolute', top: 4, right: 4, backgroundColor: colors.danger, borderRadius: 999, width: 22, height: 22, justifyContent: 'center', alignItems: 'center' },
  smallPhotos:     { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  photoBoxSmall:   { width: 60, height: 60, backgroundColor: colors.surface, borderRadius: radius.sm, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border, overflow: 'hidden' },
  photoPreviewSmall:{ width: 60, height: 60, borderRadius: radius.sm },
  removeBtnSmall:  { position: 'absolute', top: 2, right: 2, backgroundColor: colors.danger, borderRadius: 999, width: 16, height: 16, justifyContent: 'center', alignItems: 'center' },
  demandAlert:     { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FFF4', borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  input:           { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.xs, color: colors.textPrimary },
  chipRow:         { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.xs },
  chip:            { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  chipActive:      { backgroundColor: colors.primary, borderColor: colors.primary },
  sizeBtn:         { width: 48, height: 48, borderRadius: radius.sm, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  sizeBtnActive:   { backgroundColor: colors.primary, borderColor: colors.primary },
  previewBtn:      { backgroundColor: colors.accentGreen, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
});