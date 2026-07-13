import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import BackHeader from '../../components/composite/BackHeader';

const PAYMENT_METHODS = [
  {
    id: '1',
    name: 'eSewa',
    icon: '💚',
    color: '#60BB46',
    desc: 'Pay via eSewa digital wallet',
  },
  {
    id: '2',
    name: 'Cash on Delivery',
    icon: '💵',
    color: colors.amber,
    desc: 'Pay when your order arrives',
  },
];

export default function CheckoutScreen({ navigation }) {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [selectedPayment, setSelectedPayment] = useState('1');
  const [address, setAddress]   = useState('');
  const [phone, setPhone]       = useState('');
  const [name, setName]         = useState(user?.name || '');
  const [esewaId, setEsewaId]   = useState('');

  function handlePlaceOrder() {
    if (!name || !address || !phone) {
      Alert.alert('Missing Info', 'Please fill in all delivery details');
      return;
    }
    if (selectedPayment === '1' && !esewaId) {
      Alert.alert('Missing Info', 'Please enter your eSewa ID');
      return;
    }
    const paymentName = PAYMENT_METHODS.find(p => p.id === selectedPayment)?.name;
    Alert.alert(
      '🎉 Order Placed!',
      `Your order has been placed successfully!\n\nTotal: NPR ${totalPrice + 195}\nPayment: ${paymentName}`,
      [
        {
          text: 'Track Order',
          onPress: () => {
            clearCart();
            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
          },
        },
      ]
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader title="Checkout" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>

        {/* Delivery Details */}
        <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>
          Delivery Details
        </Text>

        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Enter your full name"
          placeholderTextColor={colors.textSecondary}
        />

        <Text style={[styles.label, { marginTop: spacing.md }]}>DELIVERY ADDRESS</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={address}
          onChangeText={setAddress}
          placeholder="Street, City, District"
          placeholderTextColor={colors.textSecondary}
          multiline
        />

        <Text style={[styles.label, { marginTop: spacing.md }]}>PHONE NUMBER</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="98XXXXXXXX"
          placeholderTextColor={colors.textSecondary}
          keyboardType="phone-pad"
        />

        {/* Payment Method */}
        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Payment Method
        </Text>

        {PAYMENT_METHODS.map((method) => {
          const active = selectedPayment === method.id;
          return (
            <Pressable
              key={method.id}
              style={[styles.paymentCard, active && styles.paymentCardActive]}
              onPress={() => setSelectedPayment(method.id)}
            >
              <View style={[styles.paymentIconWrap, { backgroundColor: method.color + '22' }]}>
                <Text style={{ fontSize: 24 }}>{method.icon}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={[typography.subheading, active && { color: colors.primary }]}>
                  {method.name}
                </Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>
                  {method.desc}
                </Text>
              </View>
              <View style={[styles.radioBtn, active && styles.radioBtnActive]}>
                {active && <View style={styles.radioBtnInner} />}
              </View>
            </Pressable>
          );
        })}

        {/* eSewa ID field — only shown when eSewa selected */}
        {selectedPayment === '1' && (
          <View style={styles.esewaBox}>
            <Text style={{ fontSize: 20 }}>💚</Text>
            <View style={{ flex: 1, marginLeft: spacing.md }}>
              <Text style={[styles.label, { marginBottom: spacing.xs }]}>ESEWA ID / PHONE</Text>
              <TextInput
                style={styles.input}
                value={esewaId}
                onChangeText={setEsewaId}
                placeholder="98XXXXXXXX or eSewa ID"
                placeholderTextColor={colors.textSecondary}
                keyboardType="phone-pad"
              />
            </View>
          </View>
        )}

        {/* Cash on Delivery notice */}
        {selectedPayment === '2' && (
          <View style={styles.codBox}>
            <Text style={{ fontSize: 16 }}>ℹ️</Text>
            <Text style={[typography.caption, { color: colors.textSecondary, flex: 1, marginLeft: spacing.sm }]}>
              Pay in cash when your order is delivered. Please keep exact change ready.
            </Text>
          </View>
        )}

        {/* Order Summary */}
        <View style={styles.summary}>
          <Text style={typography.subheading}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={typography.body}>Subtotal</Text>
            <Text style={typography.body}>NPR {totalPrice}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={typography.body}>Shipping</Text>
            <Text style={typography.body}>NPR 150</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={typography.body}>Platform Fee</Text>
            <Text style={typography.body}>NPR 45</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[typography.subheading, { fontWeight: '800' }]}>TOTAL</Text>
            <Text style={[typography.heading, { color: colors.primary }]}>
              NPR {totalPrice + 195}
            </Text>
          </View>
        </View>

        <Pressable style={styles.orderBtn} onPress={handlePlaceOrder}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Place Order · NPR {totalPrice + 195}
          </Text>
        </Pressable>

        <View style={styles.secureRow}>
          <Text style={{ fontSize: 16 }}>🔒</Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
            Secure payment powered by Smart Thrift
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  label:            { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  input:            { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, color: colors.textPrimary },
  paymentCard:      { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  paymentCardActive:{ borderColor: colors.primary, backgroundColor: '#F0FFF4' },
  paymentIconWrap:  { width: 48, height: 48, borderRadius: radius.md, justifyContent: 'center', alignItems: 'center' },
  radioBtn:         { width: 22, height: 22, borderRadius: 999, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  radioBtnActive:   { borderColor: colors.primary },
  radioBtnInner:    { width: 11, height: 11, borderRadius: 999, backgroundColor: colors.primary },
  esewaBox:         { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#F0FFF4', borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: '#60BB46' + '44' },
  codBox:           { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  summary:          { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.lg },
  summaryRow:       { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  totalRow:         { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, marginTop: spacing.md },
  orderBtn:         { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  secureRow:        { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.md, marginBottom: spacing.xl },
});