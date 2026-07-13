import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native';
import { colors, spacing, radius, typography } from '../../theme/theme';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  function handleSendOTP() {
    if (!email || !email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email');
      return;
    }
    setSent(true);
    Alert.alert('OTP Sent!', `A verification code has been sent to ${email}`);
  }

  function handleResetPassword() {
    if (!otp || otp.length < 4) {
      Alert.alert('Error', 'Please enter the OTP');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    Alert.alert(
      'Password Reset!',
      'Your password has been reset successfully.',
      [{ text: 'Login Now', onPress: () => navigation.navigate('Login') }]
    );
  }

  return (
    <View style={styles.page}>
      <View style={styles.hero}>
        <View style={styles.logoCircle}>
          <Text style={{ fontSize: 32 }}>🔐</Text>
        </View>
        <Text style={[typography.heading, { color: '#FFFFFF', marginTop: spacing.md }]}>
          Reset Password
        </Text>
        <Text style={[typography.body, { color: '#FFFFFFAA', marginTop: spacing.xs }]}>
          We will send you a verification code
        </Text>
      </View>

      <View style={styles.card}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg }}
        >
          <Text style={{ fontSize: 28, color: colors.primaryTeal, fontWeight: '300' }}>{'<'}</Text>
          <Text style={{ fontSize: 16, color: colors.primaryTeal, fontWeight: '600' }}>Back</Text>
        </Pressable>

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
            editable={!sent}
          />
        </View>

        {!sent ? (
          <TouchableOpacity style={styles.btn} onPress={handleSendOTP}>
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
              Send OTP
            </Text>
          </TouchableOpacity>
        ) : (
          <>
            <Text style={[styles.label, { marginTop: spacing.lg }]}>ENTER OTP</Text>
            <View style={styles.inputRow}>
              <Text style={{ marginRight: spacing.sm }}>🔢</Text>
              <TextInput
                placeholder="Enter 6-digit OTP"
                placeholderTextColor={colors.textSecondary}
                style={styles.inputField}
                keyboardType="number-pad"
                value={otp}
                onChangeText={setOtp}
                maxLength={6}
              />
            </View>

            <Text style={[styles.label, { marginTop: spacing.md }]}>NEW PASSWORD</Text>
            <View style={styles.inputRow}>
              <Text style={{ marginRight: spacing.sm }}>🔒</Text>
              <TextInput
                placeholder="Min 6 characters"
                placeholderTextColor={colors.textSecondary}
                style={styles.inputField}
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
              />
            </View>

            <TouchableOpacity style={styles.btn} onPress={handleResetPassword}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
                Reset Password
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignItems: 'center', marginTop: spacing.md }}
              onPress={handleSendOTP}
            >
              <Text style={[typography.caption, { color: colors.primaryTeal }]}>
                Resend OTP
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: colors.primary },
  hero: { padding: spacing.lg, paddingTop: 60, alignItems: 'center' },
  logoCircle: { width: 70, height: 70, borderRadius: 999, backgroundColor: colors.mintIcon, justifyContent: 'center', alignItems: 'center' },
  card: { flex: 1, backgroundColor: colors.background, borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, padding: spacing.lg },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.sm, padding: spacing.md },
  inputField: { flex: 1, color: colors.textPrimary, fontSize: 14 },
  btn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.lg },
});