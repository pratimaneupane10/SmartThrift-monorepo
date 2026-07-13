import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import BackHeader from '../../components/composite/BackHeader';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function isValidName(name) {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
}

export default function SignUpScreen({ navigation }) {
  const [name,         setName]         = useState('');
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [nameError,  setNameError]  = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError,  setPassError]  = useState('');

  const { login } = useAuth();

  function validate() {
    let valid = true;
    setNameError(''); setEmailError(''); setPassError('');

    if (!name.trim()) {
      setNameError('Full name is required.'); valid = false;
    } else if (!isValidName(name)) {
      setNameError('Name must be at least 2 letters and contain only letters.'); valid = false;
    }

    if (!email.trim()) {
      setEmailError('Email is required.'); valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email e.g. name@example.com'); valid = false;
    }

    if (!password) {
      setPassError('Password is required.'); valid = false;
    } else if (password.length < 6) {
      setPassError('Password must be at least 6 characters.'); valid = false;
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setPassError('Password must contain at least one letter and one number.'); valid = false;
    }

    return valid;
  }

  function getPasswordStrength() {
    if (!password) return null;
    if (password.length < 6) return { label: 'Too short', color: colors.danger, width: '20%' };
    if (password.length < 8 || !/[0-9]/.test(password)) return { label: 'Weak', color: colors.amber, width: '45%' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return { label: 'Strong', color: colors.accentGreen, width: '100%' };
    return { label: 'Medium', color: colors.primaryTeal, width: '70%' };
  }
  const strength = getPasswordStrength();

  function handleSignUp() {
    if (!validate()) return;
    Alert.alert(
      '🎉 Account Created!',
      `Welcome to Smart Thrift, ${name.trim()}!`,
      [{ text: 'Get Started', onPress: () => login(email.trim(), password, 'buyer') }]
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero} />
      <ScrollView style={styles.card} keyboardShouldPersistTaps="handled">
        <View style={styles.avatarCircle}>
          <Text style={{ fontSize: 24 }}>👤</Text>
        </View>

        <Text style={[typography.heading, { textAlign: 'center', marginTop: spacing.md }]}>
          Create Account
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.lg }]}>
          Join the ethical marketplace
        </Text>

        {/* Full Name */}
        <Text style={styles.label}>FULL NAME *</Text>
        <View style={[styles.inputRow, nameError && styles.inputError]}>
          <Text style={styles.inputIcon}>👤</Text>
          <TextInput
            placeholder="Your full name"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            value={name}
            onChangeText={(t) => { setName(t); setNameError(''); }}
            autoCapitalize="words"
          />
          {isValidName(name) && <Text style={styles.validTick}>✓</Text>}
        </View>
        {nameError ? <Text style={styles.errorText}>{nameError}</Text> : null}

        {/* Email */}
        <Text style={[styles.label, { marginTop: spacing.md }]}>EMAIL ADDRESS *</Text>
        <View style={[styles.inputRow, emailError && styles.inputError]}>
          <Text style={styles.inputIcon}>✉</Text>
          <TextInput
            placeholder="name@example.com"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(t) => { setEmail(t); setEmailError(''); }}
          />
          {isValidEmail(email) && <Text style={styles.validTick}>✓</Text>}
        </View>
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {/* Password */}
        <Text style={[styles.label, { marginTop: spacing.md }]}>PASSWORD *</Text>
        <View style={[styles.inputRow, passError && styles.inputError]}>
          <Text style={styles.inputIcon}>🔒</Text>
          <TextInput
            placeholder="Min 6 chars, letters + numbers"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(t) => { setPassword(t); setPassError(''); }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ fontSize: 18 }}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
        {/* Strength bar */}
        {strength && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
            <View style={{ flex: 1, height: 3, borderRadius: 2, backgroundColor: colors.border }}>
              <View style={{ height: 3, borderRadius: 2, backgroundColor: strength.color, width: strength.width }} />
            </View>
            <Text style={{ color: strength.color, fontSize: 11, marginLeft: spacing.sm, fontWeight: '700' }}>
              {strength.label}
            </Text>
          </View>
        )}
        {passError ? <Text style={styles.errorText}>{passError}</Text> : null}

        <TouchableOpacity style={styles.signUpBtn} onPress={handleSignUp}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Create Account →</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg, marginBottom: spacing.xl }}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page:        { flex: 1, backgroundColor: '#E8F5E9' },
  hero:        { height: 100 },
  card:        { backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg },
  avatarCircle:{ width: 60, height: 60, borderRadius: 999, backgroundColor: colors.mintIcon, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  label:       { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow:    { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md, borderWidth: 1, borderColor: 'transparent' },
  inputError:  { borderColor: colors.danger },
  inputIcon:   { fontSize: 16, marginRight: spacing.sm },
  inputField:  { flex: 1, color: colors.textPrimary, fontSize: 14 },
  validTick:   { color: colors.accentGreen, fontSize: 14, fontWeight: '700' },
  errorText:   { color: colors.danger, fontSize: 11, marginTop: 4, marginLeft: 2 },
  signUpBtn:   { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});