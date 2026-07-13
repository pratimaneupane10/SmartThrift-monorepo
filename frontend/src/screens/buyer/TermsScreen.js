import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

export default function TermsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Terms & Conditions</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        {[
          { title: '1. Acceptance of Terms', content: 'By using Smart Thrift, you agree to these terms. If you do not agree, please do not use our platform.' },
          { title: '2. User Accounts', content: 'You must provide accurate information when creating an account. You are responsible for maintaining the security of your account credentials.' },
          { title: '3. Buying & Selling', content: 'All transactions must be completed through our platform. Off-platform transactions are prohibited and void our buyer protection guarantee.' },
          { title: '4. Prohibited Items', content: 'Counterfeit goods, stolen items, and items violating intellectual property rights are strictly prohibited on Smart Thrift.' },
          { title: '5. Payments', content: 'Payments are processed through eSewa and Khalti. Smart Thrift charges a platform fee on each transaction for maintenance and buyer protection.' },
          { title: '6. Returns & Refunds', content: 'Buyers may request returns within 7 days if items significantly differ from their description. All disputes are handled by Smart Thrift support.' },
          { title: '7. Sustainability', content: 'Smart Thrift is committed to sustainable fashion. Sellers must accurately describe item conditions and provide authentic measurements.' },
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