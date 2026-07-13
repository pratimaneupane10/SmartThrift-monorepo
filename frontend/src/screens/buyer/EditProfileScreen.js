import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Pressable, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || 'Ramesh Thapa');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('9812345678');
  const [bio, setBio] = useState('Sustainable fashion lover from Kathmandu.');
  const [avatar, setAvatar] = useState(user?.avatar || null);

  async function pickImage() {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        { text: 'Take Photo', onPress: takePhoto },
        { text: 'Choose from Gallery', onPress: pickFromGallery },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow camera access.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }

  async function pickFromGallery() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission needed', 'Please allow gallery access.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  }

  function handleSave() {
    if (!name) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }
    updateUser({ name, email, avatar });
    Alert.alert('Profile Updated!', 'Your profile has been saved successfully.', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Edit Profile</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={[typography.body, { color: colors.primaryTeal, fontWeight: '700' }]}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.avatarSection}>
          <Pressable onPress={pickImage} style={styles.avatarWrapper}>
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={{ fontSize: 40 }}>👤</Text>
              </View>
            )}
            <View style={styles.cameraOverlay}>
              <Text style={{ fontSize: 16 }}>📷</Text>
            </View>
          </Pressable>
          <TouchableOpacity onPress={pickImage} style={{ marginTop: spacing.sm }}>
            <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
              {avatar ? 'Change Photo' : 'Add Profile Photo'}
            </Text>
          </TouchableOpacity>
        </View>

        {[
          { label: 'FULL NAME', value: name, setter: setName, placeholder: 'Your name' },
          { label: 'EMAIL', value: email, setter: setEmail, placeholder: 'your@email.com', keyboard: 'email-address' },
          { label: 'PHONE', value: phone, setter: setPhone, placeholder: '98XXXXXXXX', keyboard: 'phone-pad' },
          { label: 'BIO', value: bio, setter: setBio, placeholder: 'Tell others about yourself', multiline: true },
        ].map((field) => (
          <View key={field.label} style={{ marginBottom: spacing.md }}>
            <Text style={styles.label}>{field.label}</Text>
            <TextInput
              style={[styles.input, field.multiline && { height: 80, textAlignVertical: 'top' }]}
              value={field.value}
              onChangeText={field.setter}
              placeholder={field.placeholder}
              placeholderTextColor={colors.textSecondary}
              keyboardType={field.keyboard || 'default'}
              multiline={field.multiline}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  avatarSection: { alignItems: 'center', marginBottom: spacing.xl },
  avatarWrapper: { position: 'relative' },
  avatarImage: { width: 100, height: 100, borderRadius: 999, borderWidth: 3, borderColor: colors.primary },
  avatarPlaceholder: { width: 100, height: 100, borderRadius: 999, backgroundColor: colors.surface, justifyContent: 'center', alignItems: 'center', borderWidth: 3, borderColor: colors.primary },
  cameraOverlay: { position: 'absolute', bottom: 0, right: 0, backgroundColor: colors.primary, borderRadius: 999, width: 32, height: 32, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  input: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, color: colors.textPrimary },
});