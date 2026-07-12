import { View, Text, ScrollView, Pressable, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';
import { colors, spacing, typography, radius } from '../../theme/theme';
import { useAuth } from '../../context/AuthContext';
import BackHeader from '../../components/composite/BackHeader';

export default function SettingsScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [biddingAlerts, setBiddingAlerts] = useState(true);
  const [newMessages, setNewMessages] = useState(true);
  const [dropAlerts, setDropAlerts] = useState(false);

  function handleLogout() {
  logout();
}
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Settings"
  onBack={() => navigation.goBack()}
/>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.section}>
          {[
            { label: 'Pokewond', sub: 'Last updated 3 months ago', icon: '🔒' },
            { label: 'Two-Factor Authentication', sub: 'Contact us', icon: '🔐' },
            { label: 'Profile Visibility', sub: 'Your profile is currently disclosed', icon: '👤' },
            { label: 'Data Usage', sub: 'Manage your data history', icon: '📊' },
          ].map((item) => (
            <Pressable key={item.label} style={styles.settingRow}>
              <Text style={{ fontSize: 20, marginRight: spacing.md }}>{item.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={typography.subheading}>{item.label}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary }]}>{item.sub}</Text>
              </View>
              <Text style={{ color: colors.textSecondary }}>›</Text>
            </Pressable>
          ))}
        </View>

        <View style={[styles.section, { marginTop: spacing.lg }]}>
          <View style={styles.toggleRow}>
            <View style={styles.toggleIcon}>
              <Text style={{ fontSize: 20 }}>🔔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={typography.subheading}>Bidding Alerts</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Receive updates on items you bid on
              </Text>
            </View>
            <Switch value={biddingAlerts} onValueChange={setBiddingAlerts} trackColor={{ true: colors.accentGreen }} />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleIcon}>
              <Text style={{ fontSize: 20 }}>💬</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={typography.subheading}>New Messages</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Chat notifications from sellers and buyers
              </Text>
            </View>
            <Switch value={newMessages} onValueChange={setNewMessages} trackColor={{ true: colors.accentGreen }} />
          </View>

          <View style={styles.toggleRow}>
            <View style={styles.toggleIcon}>
              <Text style={{ fontSize: 20 }}>🌱</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={typography.subheading}>Sustainable Drop Alerts</Text>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>
                Be first to know about low-impact drops
              </Text>
            </View>
            <Switch value={dropAlerts} onValueChange={setDropAlerts} trackColor={{ true: colors.accentGreen }} />
          </View>
        </View>

        <View style={[styles.section, { marginTop: spacing.lg }]}>
          <View style={styles.settingRow}>
            <Text style={[typography.subheading, { flex: 1 }]}>Dark Mode Preference</Text>
            <Text style={{ fontSize: 20 }}>🌙</Text>
          </View>
          <View style={styles.settingRow}>
            <Text style={[typography.subheading, { flex: 1 }]}>Text Size Scaling</Text>
            <Text style={{ fontSize: 20 }}>Tt</Text>
          </View>
        </View>

        <Pressable style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={{ color: colors.danger, fontWeight: '700', fontSize: 16 }}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  section: { backgroundColor: colors.surface, borderRadius: radius.md, overflow: 'hidden' },
  settingRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  toggleRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  toggleIcon: { width: 40, height: 40, borderRadius: radius.sm, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  logoutBtn: { borderWidth: 1, borderColor: colors.danger, borderRadius: radius.md, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
});