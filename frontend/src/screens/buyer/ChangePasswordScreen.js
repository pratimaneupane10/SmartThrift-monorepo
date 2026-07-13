import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';

export default function ChangePasswordScreen({ navigation }) {
  const [current, setCurrent] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirm, setConfirm] = useState('');

  function handleChange() {
    if (!current || !newPass || !confirm) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (newPass !== confirm) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }
    if (newPass.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    Alert.alert('Success!', 'Your password has been changed.', [
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
        <Text style={typography.subheading}>Change Password</Text>
        <View style={{ width: 70 }} />
      </View>

      <View style={{ padding: spacing.lg }}>
        <View style={styles.iconBox}>
          <Text style={{ fontSize: 48 }}>🔒</Text>
          <Text style={[typography.subheading, { marginTop: spacing.md }]}>
            Update your password
          </Text>
          <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center' }]}>
            Choose a strong password with at least 6 characters
          </Text>
        </View>

        {[
          { label: 'CURRENT PASSWORD', value: current, setter: setCurrent },
          { label: 'NEW PASSWORD', value: newPass, setter: setNewPass },
          { label: 'CONFIRM NEW PASSWORD', value: confirm, setter: setConfirm },
        ].map((field) => (
          <View key={field.label} style={{ marginBottom: spacing.md }}>
            <Text style={styles.label}>{field.label}</Text>
            <View style={styles.inputRow}>
              <Text style={{ marginRight: spacing.sm }}>🔒</Text>
              <TextInput
                style={styles.inputField}
                value={field.value}
                onChangeText={field.setter}
                placeholder="••••••••"
                placeholderTextColor={colors.textSecondary}
                secureTextEntry
              />
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.btn} onPress={handleChange}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Change Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  iconBox: { alignItems: 'center', marginBottom: spacing.xl },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  inputField: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  btn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
});