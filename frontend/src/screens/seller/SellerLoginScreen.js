import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function SellerLoginScreen({ navigation }) {
  const [email,      setEmail]      = useState('');
  const [password,   setPassword]   = useState('');
  const [shopName,   setShopName]   = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const [emailError,    setEmailError]    = useState('');
  const [passError,     setPassError]     = useState('');
  const [shopError,     setShopError]     = useState('');

  const { login } = useAuth();

  function validate() {
    let valid = true;
    setEmailError('');
    setPassError('');
    setShopError('');

    if (isRegister && !shopName.trim()) {
      setShopError('Shop name is required.');
      valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email e.g. shop@example.com');
      valid = false;
    }

    if (!password) {
      setPassError('Password is required.');
      valid = false;
    } else if (password.length < 6) {
      setPassError('Password must be at least 6 characters.');
      valid = false;
    }

    return valid;
  }

  function handleSellerLogin() {
    if (!validate()) return;
    login(email.trim(), password, 'seller');
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={{ fontSize: 32 }}>🏪</Text>
        </View>
        <Text style={[typography.heading, { color: '#FFFFFF', marginTop: spacing.md }]}>
          {isRegister ? 'Seller Registration' : 'Seller Portal'}
        </Text>
        <Text style={[typography.body, { color: '#FFFFFFAA', marginTop: spacing.xs }]}>
          {isRegister ? 'Join our ethical marketplace' : 'Manage your sustainable store'}
        </Text>
      </View>

      <ScrollView style={styles.card} contentContainerStyle={{ padding: spacing.lg }}>

        {/* Shop name — register only */}
        {isRegister && (
          <>
            <Text style={styles.label}>SHOP NAME</Text>
            <View style={[styles.inputRow, shopError ? styles.inputError : null, { marginBottom: 4 }]}>
              <Text style={{ marginRight: spacing.sm }}>🏪</Text>
              <TextInput
                placeholder="Your shop name"
                placeholderTextColor={colors.textSecondary}
                style={styles.inputField}
                value={shopName}
                onChangeText={(t) => { setShopName(t); setShopError(''); }}
              />
            </View>
            {shopError ? <Text style={styles.errorText}>{shopError}</Text> : null}
            <View style={{ height: spacing.md }} />
          </>
        )}

        {/* Email */}
        <Text style={styles.label}>STORE EMAIL</Text>
        <View style={[styles.inputRow, emailError ? styles.inputError : null]}>
          <Text style={{ marginRight: spacing.sm }}>✉</Text>
          <TextInput
            placeholder="merchant@domain.com"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setEmailError(''); }}
          />
          {isValidEmail(email) && (
            <Text style={{ color: colors.accentGreen, fontSize: 14 }}>✓</Text>
          )}
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password */}
        <Text style={[styles.label, { marginTop: spacing.md }]}>PASSWORD</Text>
        <View style={[styles.inputRow, passError ? styles.inputError : null]}>
          <Text style={{ marginRight: spacing.sm }}>🔒</Text>
          <TextInput
            placeholder="Min. 6 characters"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            secureTextEntry
            value={password}
            onChangeText={(t) => { setPassword(t); setPassError(''); }}
          />
          {!isRegister && (
            <Text style={{ color: colors.primaryTeal, fontSize: 12 }}>Forgot?</Text>
          )}
        </View>
        {passError ? <Text style={styles.errorText}>{passError}</Text> : null}

        <TouchableOpacity style={styles.loginBtn} onPress={handleSellerLogin}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            {isRegister ? 'Register as Seller →' : 'Login to Dashboard →'}
          </Text>
        </TouchableOpacity>

        <View style={styles.verifiedRow}>
          <Text style={{ fontSize: 16 }}>✓</Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginLeft: spacing.xs }]}>
            Verified Seller Authentication
          </Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg, marginBottom: spacing.xl }}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            {isRegister ? 'Already a seller? ' : 'New to SMARTTHRIFT? '}
          </Text>
          <TouchableOpacity onPress={() => {
            setIsRegister(!isRegister);
            setEmailError(''); setPassError(''); setShopError('');
          }}>
            <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
              {isRegister ? 'Login' : 'Register as a Seller'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page:        { flex: 1, backgroundColor: colors.primaryTeal },
  hero:        { padding: spacing.lg, paddingTop: 60, alignItems: 'center' },
  logoCircle:  { width: 70, height: 70, borderRadius: 999, backgroundColor: colors.mintIcon, justifyContent: 'center', alignItems: 'center' },
  card:        { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg },
  label:       { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow:    { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md },
  inputError:  { borderWidth: 1, borderColor: colors.danger },
  inputField:  { flex: 1, color: colors.textPrimary, fontSize: 14 },
  errorText:   { color: colors.danger, fontSize: 11, marginTop: 4, marginLeft: 2 },
  loginBtn:    { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  verifiedRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: spacing.md },
});