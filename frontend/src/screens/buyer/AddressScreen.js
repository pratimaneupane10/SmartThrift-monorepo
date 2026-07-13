import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const SAVED_ADDRESSES = [
  { id: '1', label: 'Home', name: 'Ramesh Thapa', address: 'Baneshwor, Kathmandu', phone: '9812345678', default: true },
  { id: '2', label: 'Office', name: 'Ramesh Thapa', address: 'Durbarmarg, Kathmandu', phone: '9812345678', default: false },
];

export default function AddressScreen({ navigation }) {
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  const [showForm, setShowForm] = useState(false);
  const [label, setLabel] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  function setDefault(id) {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, default: a.id === id }))
    );
  }

  function deleteAddress(id) {
    Alert.alert('Delete Address', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => setAddresses((prev) => prev.filter((a) => a.id !== id)) },
    ]);
  }

  function addAddress() {
    if (!label || !name || !address || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    const newAddr = { id: Date.now().toString(), label, name, address, phone, default: false };
    setAddresses((prev) => [...prev, newAddr]);
    setShowForm(false);
    setLabel(''); setName(''); setAddress(''); setPhone('');
    Alert.alert('✅ Address Added!');
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>My Addresses</Text>
        <Pressable onPress={() => setShowForm(!showForm)}>
          <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
            + Add New
          </Text>
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {showForm && (
          <View style={styles.formCard}>
            <Text style={[typography.subheading, { marginBottom: spacing.md }]}>
              New Address
            </Text>
            {[
              { label: 'LABEL (Home/Office)', value: label, setter: setLabel, placeholder: 'Home' },
              { label: 'FULL NAME', value: name, setter: setName, placeholder: 'Ramesh Thapa' },
              { label: 'ADDRESS', value: address, setter: setAddress, placeholder: 'Street, City, District' },
              { label: 'PHONE', value: phone, setter: setPhone, placeholder: '98XXXXXXXX', keyboardType: 'phone-pad' },
            ].map((field) => (
              <View key={field.label} style={{ marginBottom: spacing.md }}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput
                  style={styles.input}
                  value={field.value}
                  onChangeText={field.setter}
                  placeholder={field.placeholder}
                  placeholderTextColor={colors.textSecondary}
                  keyboardType={field.keyboardType || 'default'}
                />
              </View>
            ))}
            <Pressable style={styles.saveBtn} onPress={addAddress}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700' }}>Save Address</Text>
            </Pressable>
          </View>
        )}

        {addresses.map((addr) => (
          <View key={addr.id} style={[styles.addressCard, addr.default && styles.defaultCard]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={styles.labelBadge}>
                <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>
                  {addr.label}
                </Text>
              </View>
              {addr.default && (
                <View style={styles.defaultBadge}>
                  <Text style={{ color: colors.accentGreen, fontSize: 11, fontWeight: '700' }}>
                    ✓ Default
                  </Text>
                </View>
              )}
            </View>
            <Text style={[typography.subheading, { marginTop: spacing.sm }]}>{addr.name}</Text>
            <Text style={[typography.body, { color: colors.textSecondary }]}>{addr.address}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary }]}>📱 {addr.phone}</Text>
            <View style={styles.actionRow}>
              {!addr.default && (
                <Pressable
                  style={styles.defaultBtn}
                  onPress={() => setDefault(addr.id)}
                >
                  <Text style={[typography.caption, { color: colors.primaryTeal }]}>
                    Set as Default
                  </Text>
                </Pressable>
              )}
              <Pressable
                style={styles.deleteBtn}
                onPress={() => deleteAddress(addr.id)}
              >
                <Text style={[typography.caption, { color: colors.danger }]}>Delete</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 36 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  formCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  input: { backgroundColor: colors.background, borderRadius: radius.sm, padding: spacing.md, color: colors.textPrimary },
  saveBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  addressCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, borderWidth: 1, borderColor: colors.border },
  defaultCard: { borderColor: colors.accentGreen },
  labelBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill },
  defaultBadge: { backgroundColor: colors.accentGreen + '22', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill },
  actionRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.md },
  defaultBtn: { borderWidth: 1, borderColor: colors.primaryTeal, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  deleteBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
});