import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, radius, colors } from '../../theme/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.page}>
      <View style={styles.logoContainer}>
        <View style={styles.outerCircle}>
          <View style={styles.innerCircle}>
            <Text style={styles.leafEmoji}>🍃</Text>
            <Text style={styles.logoLine1}>SMART</Text>
            <Text style={styles.logoLine2}>THRIFT</Text>
            <Text style={styles.bagEmoji}>🛍 🛍 🛍</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.buyerBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buyerBtnText}>🛍 Shop as Buyer</Text>
        </TouchableOpacity>

        <View style={{ height: spacing.sm }} />

        <TouchableOpacity
          style={styles.sellerBtn}
          onPress={() => navigation.navigate('SellerLogin')}
        >
          <Text style={styles.sellerBtnText}>🏪 Login as Seller</Text>
        </TouchableOpacity>

        <View style={{ height: spacing.sm }} />

        <TouchableOpacity
          style={styles.adminBtn}
          onPress={() => navigation.navigate('AdminLogin')}
        >
          <Text style={styles.adminBtnText}>⚙ Admin Portal</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#7D97A5',
    justifyContent: 'space-between',
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: spacing.lg,
  },
  logoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  outerCircle: { width: 220, height: 220, borderRadius: 999, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' },
  innerCircle: { width: 180, height: 180, borderRadius: 999, backgroundColor: '#C8A882', justifyContent: 'center', alignItems: 'center', borderWidth: 1.5, borderColor: '#A87E55' },
  leafEmoji: { fontSize: 28, position: 'absolute', top: 20, left: 24 },
  logoLine1: { fontSize: 28, fontWeight: '800', color: '#FFFFFF', letterSpacing: 3 },
  logoLine2: { fontSize: 26, fontWeight: '800', color: '#1A1A2E', letterSpacing: 3, marginTop: -4 },
  bagEmoji: { fontSize: 18, position: 'absolute', bottom: 24, right: 12 },
  bottom: { paddingBottom: spacing.lg },
  buyerBtn: { backgroundColor: colors.primary, borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center' },
  buyerBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  sellerBtn: { backgroundColor: colors.primaryTeal, borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center' },
  sellerBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
  adminBtn: { backgroundColor: '#FFFFFF33', borderRadius: radius.pill, paddingVertical: spacing.md, alignItems: 'center', borderWidth: 1, borderColor: '#FFFFFF' },
  adminBtnText: { color: '#FFFFFF', fontWeight: '700', fontSize: 16 },
});