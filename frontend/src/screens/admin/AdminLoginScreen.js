import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  function handleAdminLogin() {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter credentials');
      return;
    }
    if (email === 'admin@smartthrift.com' && password === 'admin123') {
      login(email, password, 'admin', 'email');
    } else {
      Alert.alert(
        'Invalid Credentials',
        'Use:\nEmail: admin@smartthrift.com\nPassword: admin123'
      );
    }
  }

  function handleForgotPassword() {
    Alert.alert(
      'Reset Admin Password',
      'Contact your system administrator to reset the admin password.\n\nEmail: support@smartthrift.com',
      [{ text: 'OK' }]
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={{ fontSize: 32 }}>⚙</Text>
        </View>
        <Text style={[typography.heading, { color: '#FFFFFF', marginTop: spacing.md }]}>
          Admin Portal
        </Text>
        <Text style={[typography.body, { color: '#FFFFFFAA', marginTop: spacing.xs }]}>
          Smart Thrift Management System
        </Text>
      </View>

      <View style={styles.card}>
        <Pressable
          onPress={() => navigation.navigate('Welcome')}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}
        >
          <Text style={{ fontSize: 28, color: colors.primaryTeal, fontWeight: '300' }}>{'<'}</Text>
          <Text style={{ fontSize: 16, color: colors.primaryTeal, fontWeight: '600' }}> Back</Text>
        </Pressable>

        <View style={styles.hintBox}>
          <Text style={[typography.caption, { color: colors.textSecondary, textAlign: 'center' }]}>
            Demo: admin@smartthrift.com / admin123
          </Text>
        </View>

        <Text style={[styles.label, { marginTop: spacing.md }]}>ADMIN EMAIL</Text>
        <View style={styles.inputRow}>
          <Text style={{ marginRight: spacing.sm }}>✉</Text>
          <TextInput
            placeholder="admin@smartthrift.com"
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
          <Pressable onPress={handleForgotPassword}>
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

        <TouchableOpacity style={styles.loginBtn} onPress={handleAdminLogin}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Access Dashboard →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: '#1A1A2E' },
  hero: { padding: spacing.lg, paddingTop: 60, alignItems: 'center' },
  logoCircle: { width: 70, height: 70, borderRadius: 999, backgroundColor: colors.amber, justifyContent: 'center', alignItems: 'center' },
  card: { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg },
  hintBox: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md },
  inputField: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  loginBtn: { backgroundColor: '#1A1A2E', borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});