import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useCart } from '../../context/CartContext';
import BackHeader from '../../components/composite/BackHeader';

const PAYMENT_METHODS = [
  { id: '1', name: 'eSewa', icon: '💚', color: '#60BB46' },
  { id: '2', name: 'Khalti', icon: '💜', color: '#5C2D91' },
  { id: '3', name: 'Credit Card', icon: '💳', color: colors.primary },
  { id: '4', name: 'Cash on Delivery', icon: '💵', color: colors.amber },
];

export default function CheckoutScreen({ navigation }) {
  const { items, totalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState('1');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');

  function handlePlaceOrder() {
    if (!name || !address || !phone) {
      Alert.alert('Missing Info', 'Please fill in all delivery details');
      return;
    }
    Alert.alert(
      'Order Placed!',
      `Your order has been placed successfully!\n\nTotal: NPR ${totalPrice + 195}\nPayment: ${PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.name}`,
      [
        {
          text: 'Track Order',
          onPress: () => {
            clearCart();
            navigation.reset({ index: 0, routes: [{ name: 'MainTabs' }] });
          }
        }
      ]
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Checkout"
  onBack={() => navigation.goBack()}
/>
      
      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>
          Delivery Details
        </Text>

        <Text style={styles.label}>FULL NAME</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Ramesh Thapa"
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

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Payment Method
        </Text>

        {PAYMENT_METHODS.map((method) => (
          <Pressable
            key={method.id}
            style={[styles.paymentCard, selectedPayment === method.id && styles.paymentCardActive]}
            onPress={() => setSelectedPayment(method.id)}
          >
            <Text style={{ fontSize: 24 }}>{method.icon}</Text>
            <Text style={[typography.subheading, { marginLeft: spacing.md, flex: 1 }]}>
              {method.name}
            </Text>
            <View style={[styles.radioBtn, selectedPayment === method.id && styles.radioBtnActive]}>
              {selectedPayment === method.id && (
                <View style={styles.radioBtnInner} />
              )}
            </View>
          </Pressable>
        ))}

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
            Place Order → NPR {totalPrice + 195}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  input: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, color: colors.textPrimary },
  paymentCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  paymentCardActive: { borderColor: colors.primary, backgroundColor: '#F0FFF4' },
  radioBtn: { width: 20, height: 20, borderRadius: 999, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  radioBtnActive: { borderColor: colors.primary },
  radioBtnInner: { width: 10, height: 10, borderRadius: 999, backgroundColor: colors.primary },
  summary: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.lg },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  totalRow: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.md, marginTop: spacing.md },
  orderBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  secureRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.md, marginBottom: spacing.xl },
});