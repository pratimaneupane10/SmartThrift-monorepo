import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const FAQS = [
  { q: 'How do I get paid for my sold items?', a: 'Payments are processed within 3-5 business days after the buyer confirms receipt. Funds are transferred to your linked eSewa or bank account.' },
  { q: 'What is the platform fee?', a: 'Smart Thrift charges a 15% platform fee on each sale. This covers payment processing, buyer protection, and platform maintenance.' },
  { q: 'How does SmartPrint AI pricing work?', a: 'SmartPrint analyzes current market demand, similar item prices, and seasonal trends to suggest optimal pricing for your listings.' },
  { q: 'What items are not allowed?', a: 'Counterfeit goods, stolen items, and anything violating intellectual property rights are prohibited. All items must be pre-owned clothing in honest condition.' },
  { q: 'How do I handle returns?', a: 'If a buyer requests a return within 7 days and the item significantly differs from your description, Smart Thrift will mediate the dispute.' },
];

export default function SellerHelpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Seller Help</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <View style={styles.searchBar}>
          <Text style={{ marginRight: spacing.sm }}>🔍</Text>
          <TextInput
            placeholder="Search help articles..."
            placeholderTextColor={colors.textSecondary}
            style={{ flex: 1, fontSize: 14 }}
          />
        </View>

        <View style={styles.quickLinksRow}>
          {[
            { icon: '💰', label: 'Payments' },
            { icon: '📦', label: 'Shipping' },
            { icon: '⭐', label: 'Reviews' },
            { icon: '📋', label: 'Listings' },
          ].map((link) => (
            <Pressable key={link.label} style={styles.quickLink}>
              <Text style={{ fontSize: 24 }}>{link.icon}</Text>
              <Text style={[typography.caption, { marginTop: spacing.xs }]}>{link.label}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[typography.subheading, { marginBottom: spacing.sm }]}>
          Frequently Asked Questions
        </Text>

        {FAQS.map((faq, i) => (
          <View key={i} style={styles.faqCard}>
            <Text style={[typography.subheading, { color: colors.primary }]}>{faq.q}</Text>
            <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs, lineHeight: 22 }]}>
              {faq.a}
            </Text>
          </View>
        ))}

        <View style={styles.contactCard}>
          <Text style={{ fontSize: 32 }}>📞</Text>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text style={[typography.subheading, { color: '#FFFFFF' }]}>
              Need more help?
            </Text>
            <Text style={[typography.body, { color: '#FFFFFFAA' }]}>
              Contact our seller support team
            </Text>
            <Text style={[typography.caption, { color: colors.mintIcon, marginTop: spacing.xs }]}>
              sellers@smartthrift.com
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { flexDirection: 'row', alignItems: 'center', minWidth: 70 },
  backArrow: { fontSize: 36, color: colors.primary, fontWeight: '300', lineHeight: 40 },
  backText: { fontSize: 16, color: colors.primary, fontWeight: '600' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg },
  quickLinksRow: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  quickLink: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, alignItems: 'center' },
  faqCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  contactCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.primary, borderRadius: radius.md, padding: spacing.lg, marginTop: spacing.md },
});