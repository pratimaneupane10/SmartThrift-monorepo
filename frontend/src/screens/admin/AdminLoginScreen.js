import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';

export default function AdminLoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  function handleAdminLogin() {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter credentials');
    return;
  }
  if (email === 'admin@smartthrift.com' && password === 'admin123') {
    login(email, password, 'admin');
  } else {
    Alert.alert('Error', 'Invalid admin credentials\n\nUse:\nadmin@smartthrift.com\nadmin123');
  }
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
        <Text style={styles.label}>ADMIN EMAIL</Text>
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

        <Text style={[styles.label, { marginTop: spacing.md }]}>PASSWORD</Text>
        <View style={styles.inputRow}>
          <Text style={{ marginRight: spacing.sm }}>🔒</Text>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor={colors.textSecondary}
            style={styles.inputField}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <View style={styles.hintBox}>
          <Text style={[typography.caption, { color: colors.textSecondary }]}>
            Demo credentials:{'\n'}
            Email: admin@smartthrift.com{'\n'}
            Password: admin123
          </Text>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={handleAdminLogin}>
          <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
            Access Dashboard →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignItems: 'center', marginTop: spacing.lg }}
          onPress={() => navigation.goBack()}
        >
          <Text style={[typography.caption, { color: colors.primaryTeal }]}>← Back to Home</Text>
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
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md },
  inputField: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  hintBox: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.md },
  loginBtn: { backgroundColor: '#1A1A2E', borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});