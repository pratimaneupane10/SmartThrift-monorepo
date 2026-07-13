import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView, Pressable } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function SellerLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  function handleSellerLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    login(email, password, 'seller', 'email');
  }

  function handleGoogleLogin() {
    Alert.alert(
      'Google Login',
      'Continue with Google as Seller?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Continue', onPress: () => login('seller.google@gmail.com', 'google', 'seller', 'google') },
      ]
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={{ fontSize: 32 }}>🏪</Text>
        </View>
        <Text style={[typography.heading, { color: '#FFFFFF', marginTop: spacing.md }]}>
          Seller Portal
        </Text>
        <Text style={[typography.body, { color: '#FFFFFFAA', marginTop: spacing.xs }]}>
          Manage your sustainable store
        </Text>
      </View>

      <ScrollView style={styles.card} keyboardShouldPersistTaps="handled">
        <Pressable
          onPress={() => navigation.navigate('Welcome')}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}
        >
          <Text style={{ fontSize: 28, color: colors.primaryTeal, fontWeight: '300' }}>{'<'}</Text>
          <Text style={{ fontSize: 16, color: colors.primaryTeal, fontWeight: '600' }}> Back</Text>
        </Pressable>

        <Text style={styles.label}>STORE EMAIL</Text>
        <View style={styles.inputRow}>
          <Text style={{ marginRight: spacing.sm }}>✉</Text>
          <TextInput
            placeholder="merchant@domain.com"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md }}>
          <Text style={styles.label}>PASSWORD</Text>
          <Pressable onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={{ color: colors.primaryTeal, fontSize: 12, fontWeight: '700' }}>
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <View style={styles.inputRow}>
          <Text style={{ marginRight: spacing.sm }}>🔒</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleSellerLogin}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Login to Dashboard →
          </Text>
        </TouchableOpacity>

        <Text style={[typography.caption, { textAlign: 'center', marginVertical: spacing.md, color: colors.textSecondary }]}>
          OR CONTINUE WITH
        </Text>

        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
          <Text style={{ fontSize: 18, marginRight: spacing.sm }}>G</Text>
          <Text style={{ fontWeight: '600', color: colors.textPrimary }}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.verifiedRow}>
          <Text style={{ fontSize: 16 }}>✓</Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
            Verified Seller Authentication
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg, marginBottom: spacing.xl }}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            New to SMARTTHRIFT?{' '}
          </Text>
          {/* FIX: pass role: 'seller' so SignUpScreen (reused for this route)
              knows to register the account as a seller, not a buyer. */}
          <TouchableOpacity onPress={() => navigation.navigate('SellerRegister', { role: 'seller' })}>
            <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.primaryTeal },
  hero: { padding: spacing.lg, paddingTop: 60, alignItems: 'center' },
  logoCircle: { width: 70, height: 70, borderRadius: 999, backgroundColor: colors.mintIcon, justifyContent: 'center', alignItems: 'center' },
  card: { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md },
  inputField: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  loginBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
});