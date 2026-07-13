import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

export default function PrivacyScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Privacy Policy</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {[
          { title: 'Data Collection', content: 'Smart Thrift collects personal information including name, email, phone number, and purchase history to provide personalized recommendations and improve your shopping experience.' },
          { title: 'Data Usage', content: 'Your data is used to power our AI recommendation engine, process payments securely, and communicate order updates. We never sell your personal data to third parties.' },
          { title: 'Payment Security', content: 'All payment transactions are processed through eSewa and Khalti which use 256-bit SSL encryption. Smart Thrift never stores your card or wallet credentials.' },
          { title: 'Cookies', content: 'We use session data to keep you logged in and remember your preferences. You can clear this data anytime from Settings.' },
          { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal data. Contact us at privacy@smartthrift.com to exercise these rights.' },
          { title: 'Updates', content: 'This privacy policy was last updated on June 2026. We will notify you of significant changes via email or in-app notification.' },
        ].map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={[typography.subheading, { color: colors.primary }]}>{section.title}</Text>
            <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 22 }]}>
              {section.content}
            </Text>
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
  section: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
});