import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable, ScrollView } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  function handleGoogleLogin() {
    Alert.alert(
      'Google Login',
      'In production this opens Google OAuth. For demo, logging in as Google user.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Continue',
          onPress: () => login('googleuser@gmail.com', 'google', 'buyer', 'google'),
        },
      ]
    );
  }

  function handleLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }
    login(email, password, 'buyer', 'email');
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero} />
      <ScrollView
        style={styles.card}
        contentContainerStyle={{ paddingBottom: spacing.xl * 2 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          onPress={() => navigation.navigate('Welcome')}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md }}
        >
          <Text style={{ fontSize: 28, color: colors.primaryTeal, fontWeight: '300' }}>{'<'}</Text>
          <Text style={{ fontSize: 16, color: colors.primaryTeal, fontWeight: '600' }}> Back</Text>
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

        <Text style={styles.label}>EMAIL ADDRESS</Text>
        <View style={styles.inputRow}>
          <Text style={{ marginRight: spacing.sm }}>✉</Text>
          <TextInput
            placeholder="name@example.com"
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

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>Login →</Text>
        </TouchableOpacity>

        <Text style={[typography.caption, { textAlign: 'center', marginVertical: spacing.md, color: colors.textSecondary }]}>
          OR CONTINUE WITH
        </Text>

        <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
          <Text style={{ fontSize: 18, marginRight: spacing.sm }}>G</Text>
          <Text style={{ fontWeight: '600', color: colors.textPrimary }}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: spacing.lg, marginBottom: spacing.md }}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            Don't have an account?{' '}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
  page: { flex: 1, backgroundColor: '#E8F5E9' },
  hero: { height: 120 },
  card: { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg },
  avatarCircle: { width: 60, height: 60, borderRadius: 999, backgroundColor: colors.mintIcon, justifyContent: 'center', alignItems: 'center', alignSelf: 'center' },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md },
  inputField: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  loginBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, padding: spacing.md },
});