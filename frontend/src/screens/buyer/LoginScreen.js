import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import BackHeader from '../../components/composite/BackHeader';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function LoginScreen({ navigation }) {
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError,   setEmailError]   = useState('');
  const [passError,    setPassError]    = useState('');
  const { login, authLoading } = useAuth();

  function validate() {
    let valid = true;
    setEmailError('');
    setPassError('');

    if (!email.trim()) {
      setEmailError('Email is required.'); valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid email e.g. name@example.com'); valid = false;
    }

    if (!password) {
      setPassError('Password is required.'); valid = false;
    } else if (password.length < 6) {
      setPassError('Password must be at least 6 characters.'); valid = false;
    }

    return valid;
  }

  async function handleLogin() {
    if (!validate()) return;
    const result = await login(email.trim(), password);
    if (!result.success) {
      Alert.alert('Login failed', result.message || 'Invalid email or password.');
    }
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero} />
      <View style={styles.card}>
        <Pressable
          onPress={() => navigation.navigate('Welcome')}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}
        >
          <Text style={{ fontSize: 18, color: colors.primaryTeal }}>← Back</Text>
        </Pressable>

        <View style={styles.avatarCircle}>
          <Text style={{ fontSize: 24 }}>👤</Text>
        </View>

        <Text style={[typography.heading, { textAlign: 'center', marginTop: spacing.md }]}>
          Welcome Back
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, textAlign: 'center', marginTop: spacing.xs, marginBottom: spacing.lg }]}>
          Sign in to your ethical marketplace account
        </Text>

        {/* Email */}
        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={[styles.inputRow, emailError && styles.inputError]}>
          <Text style={{ marginRight: spacing.sm }}>✉</Text>
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.md }}>
          <Text style={styles.label}>PASSWORD</Text>
          <Text style={{ color: colors.primaryTeal, fontSize: 12 }}>Forgot Password?</Text>
        </View>
        <View style={[styles.inputRow, passError && styles.inputError]}>
          <Text style={{ marginRight: spacing.sm }}>🔒</Text>
          <TextInput
            placeholder="Min. 6 characters"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(t) => { setPassword(t); setPassError(''); }}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={{ fontSize: 16 }}>{showPassword ? '🙈' : '👁'}</Text>
          </TouchableOpacity>
        </View>
        {passError ? <Text style={styles.errorText}>{passError}</Text> : null}

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin} disabled={authLoading}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            {authLoading ? 'Logging in…' : 'Login →'}
          </Text>
        </TouchableOpacity>

        <Text style={[typography.caption, { textAlign: 'center', marginVertical: spacing.md, color: colors.textSecondary }]}>
          OR CONTINUE WITH
        </Text>

        <TouchableOpacity style={styles.googleBtn} onPress={handleLogin}>
          <Text style={{ fontWeight: '600', color: colors.textPrimary }}>G  Google</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg }}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[typography.caption, { color: colors.primaryTeal, fontWeight: '700' }]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page:         { flex: 1, backgroundColor: '#E8F5E9' },
  hero:         { flex: 1 },
  card:         { backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg, paddingBottom: spacing.xl },
  avatarCircle: { width: 60, height: 60, borderRadius: 999, backgroundColor: colors.mintIcon, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  label:        { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow:     { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md },
  inputError:   { borderWidth: 1, borderColor: colors.danger },
  inputField:   { flex: 1, color: colors.textPrimary, fontSize: 14 },
  validTick:    { color: colors.accentGreen, fontSize: 14, fontWeight: '700' },
  errorText:    { color: colors.danger, fontSize: 11, marginTop: 4, marginLeft: 2 },
  loginBtn:     { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  googleBtn:    { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
});