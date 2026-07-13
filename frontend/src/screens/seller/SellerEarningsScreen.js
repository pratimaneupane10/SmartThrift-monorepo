import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Alert, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const EARNINGS = [
  { id: '1', item: 'Vintage Denim Jacket', date: 'Jun 24, 2026', amount: 1020, status: 'Paid' },
  { id: '2', item: 'Wool Overcoat',        date: 'Jun 22, 2026', amount: 2673, status: 'Paid' },
  { id: '3', item: 'Black Hoodie',         date: 'Jun 20, 2026', amount: 972,  status: 'Processing' },
  { id: '4', item: 'White Dress Shirt',    date: 'Jun 18, 2026', amount: 1928, status: 'Paid' },
];

export default function SellerEarningsScreen({ navigation }) {
  const total   = EARNINGS.reduce((sum, e) => sum + e.amount, 0);
  const paid    = EARNINGS.filter((e) => e.status === 'Paid').reduce((sum, e) => sum + e.amount, 0);
  const pending = EARNINGS.filter((e) => e.status === 'Processing').reduce((sum, e) => sum + e.amount, 0);

  const [modalVisible, setModalVisible] = useState(false);
  const [bankName, setBankName]         = useState('');
  const [accountName, setAccountName]   = useState('');
  const [accountNumber, setAccountNumber] = useState('');

  function openWithdrawModal() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
  }

  function handleSubmitBankDetails() {
    if (!bankName.trim()) {
      Alert.alert('Required', 'Please enter your bank name.');
      return;
    }
    if (!accountName.trim()) {
      Alert.alert('Required', 'Please enter the account holder name.');
      return;
    }
    if (!accountNumber.trim() || accountNumber.trim().length < 6) {
      Alert.alert('Required', 'Please enter a valid account number.');
      return;
    }

    setModalVisible(false);

    Alert.alert(
      'Confirm Withdrawal',
      `Bank: ${bankName}\nAccount Name: ${accountName}\nAccount Number: ${accountNumber}\nAmount: NPR ${paid.toLocaleString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Withdraw Now',
          onPress: () => {
            Alert.alert(
              'Success!',
              `Withdrawal of NPR ${paid.toLocaleString()} initiated to ${bankName}.\nWill be credited in 2-3 business days.`
            );
            setBankName('');
            setAccountName('');
            setAccountNumber('');
          },
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader title="Earnings" onBack={() => navigation.goBack()} rightIcon="💰" />

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>

        {/* Total card */}
        <View style={styles.totalCard}>
          <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>TOTAL EARNINGS</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 36, fontWeight: '800', marginTop: spacing.xs }}>
            NPR {total.toLocaleString()}
          </Text>
          <View style={styles.earningsRow}>
            <View>
              <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>PAID</Text>
              <Text style={{ color: colors.mintIcon, fontWeight: '700', fontSize: 18 }}>
                NPR {paid.toLocaleString()}
              </Text>
            </View>
            <View>
              <Text style={[typography.caption, { color: '#FFFFFFAA' }]}>PROCESSING</Text>
              <Text style={{ color: colors.amber, fontWeight: '700', fontSize: 18 }}>
                NPR {pending.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Withdraw button — now opens bank details form */}
        <Pressable style={styles.withdrawBtn} onPress={openWithdrawModal}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Withdraw to Bank →
          </Text>
        </Pressable>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Transaction History
        </Text>

        {EARNINGS.map((earning) => (
          <View key={earning.id} style={styles.transCard}>
            <View style={styles.transIcon}>
              <Text style={{ fontSize: 20 }}>💰</Text>
            </View>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={typography.subheading} numberOfLines={1}>{earning.item}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{earning.date}</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: colors.accentGreen, fontWeight: '700' }}>
                + NPR {earning.amount}
              </Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: earning.status === 'Paid' ? colors.accentGreen + '22' : colors.amber + '22' },
              ]}>
                <Text style={{
                  color: earning.status === 'Paid' ? colors.accentGreen : colors.amber,
                  fontSize: 10, fontWeight: '700',
                }}>
                  {earning.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Bank details modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={typography.subheading}>Bank Details</Text>
              <Pressable onPress={closeModal}>
                <Text style={{ fontSize: 20, color: colors.textSecondary }}>✕</Text>
              </Pressable>
            </View>

            <Text style={[typography.caption, { color: colors.textSecondary, marginBottom: spacing.md }]}>
              Available to withdraw: NPR {paid.toLocaleString()}
            </Text>

            <Text style={styles.label}>Bank Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Nepal Investment Bank"
              placeholderTextColor={colors.textSecondary}
              value={bankName}
              onChangeText={setBankName}
            />

            <Text style={styles.label}>Account Holder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Full name on the account"
              placeholderTextColor={colors.textSecondary}
              value={accountName}
              onChangeText={setAccountName}
            />

            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter account number"
              placeholderTextColor={colors.textSecondary}
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="number-pad"
            />

            <Pressable style={styles.confirmBtn} onPress={handleSubmitBankDetails}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
                Continue
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  totalCard:    { backgroundColor: colors.primary, borderRadius: radius.lg, padding: spacing.lg },
  earningsRow:  { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.lg },
  withdrawBtn:  { backgroundColor: colors.primaryTeal, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  transCard:    { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  transIcon:    { width: 44, height: 44, borderRadius: 999, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' },
  statusBadge:  { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill, marginTop: 2 },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalCard: {
    backgroundColor: colors.background,
    borderTopLeftRadius: radius.lg,
    borderTopRightRadius: radius.lg,
    padding: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 15,
    color: colors.textPrimary,
    backgroundColor: colors.surface,
  },
  confirmBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
});