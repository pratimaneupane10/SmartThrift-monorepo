import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput, Alert } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

export default function AdminNotificationsScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [target, setTarget] = useState('All');
  const [sent, setSent] = useState([
    { id: '1', title: 'Weekend Sale!', message: 'Get 20% off all items this weekend.', target: 'Buyers', time: '2h ago' },
    { id: '2', title: 'New Feature Available', message: 'SmartPrint AI pricing is now live for sellers.', target: 'Sellers', time: '1d ago' },
    { id: '3', title: 'Platform Maintenance', message: 'Scheduled maintenance on Sunday 2-4 AM.', target: 'All', time: '3d ago' },
  ]);

  function sendNotification() {
    if (!title || !message) {
      Alert.alert('Error', 'Please fill in title and message');
      return;
    }
    const newNotif = { id: Date.now().toString(), title, message, target, time: 'Just now' };
    setSent((prev) => [newNotif, ...prev]);
    setTitle(''); setMessage('');
    Alert.alert('Sent!', `Notification sent to ${target} users.`);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Send Notification</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.formCard}>
          <Text style={[typography.subheading, { marginBottom: spacing.md }]}>
            New Notification
          </Text>

          <Text style={styles.label}>TARGET USERS</Text>
          <View style={styles.chipRow}>
            {['All', 'Buyers', 'Sellers'].map((t) => (
              <Pressable
                key={t}
                onPress={() => setTarget(t)}
                style={[styles.chip, target === t && styles.chipActive]}
              >
                <Text style={{ color: target === t ? '#FFFFFF' : colors.textPrimary }}>{t}</Text>
              </Pressable>
            ))}
          </View>

          <Text style={[styles.label, { marginTop: spacing.md }]}>TITLE</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Notification title"
            placeholderTextColor={colors.textSecondary}
          />

          <Text style={[styles.label, { marginTop: spacing.md }]}>MESSAGE</Text>
          <TextInput
            style={[styles.input, { height: 100 }]}
            value={message}
            onChangeText={setMessage}
            placeholder="Write your message..."
            placeholderTextColor={colors.textSecondary}
            multiline
          />

          <Pressable style={styles.sendBtn} onPress={sendNotification}>
            <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 16 }}>
              Send Notification
            </Text>
          </Pressable>
        </View>

        <Text style={[typography.subheading, { marginTop: spacing.lg, marginBottom: spacing.sm }]}>
          Previously Sent
        </Text>
        {sent.map((notif) => (
          <View key={notif.id} style={styles.notifCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={typography.subheading}>{notif.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{notif.time}</Text>
            </View>
            <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
              {notif.message}
            </Text>
            <View style={styles.targetBadge}>
              <Text style={{ color: colors.primaryTeal, fontSize: 11, fontWeight: '700' }}>
                {notif.target}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  formCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  label: { fontSize: 11, fontWeight: '700', color: colors.textSecondary, letterSpacing: 1, marginBottom: spacing.xs },
  chipRow: { flexDirection: 'row', gap: spacing.sm },
  chip: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  input: { backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.md, color: colors.textPrimary },
  sendBtn: { backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.md },
  notifCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  targetBadge: { backgroundColor: colors.primaryTeal + '22', alignSelf: 'flex-start', paddingHorizontal: spacing.sm, paddingVertical: 2, borderRadius: radius.pill, marginTop: spacing.sm },
});