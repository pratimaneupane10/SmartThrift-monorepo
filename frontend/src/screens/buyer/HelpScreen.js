import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const FAQS = [
  { q: 'What makes Smart Thrift shipping carbon neutral?', a: 'We partner with eco-friendly logistics providers and offset all remaining emissions through verified carbon credits.' },
  { q: 'How is the Sustainability Score (0-100) calculated?', a: 'The score combines item condition, shipping distance, packaging type, and seller sustainability practices.' },
  { q: 'When will I receive payment for my sold items?', a: 'Payments are processed within 3-5 business days after the buyer confirms receipt of the item.' },
];

export default function HelpScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
  title="Help & Support"
  onBack={() => navigation.goBack()}
/>
        

      <ScrollView contentContainerStyle={{ padding: spacing.lg }}>
        <Text style={[typography.heading, { fontSize: 26 }]}>How can we help you today?</Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs }]}>
          Search our knowledge base for answers on shipping, sustainability standards, and payment protection.
        </Text>

        <View style={styles.searchBar}>
          <Text style={{ marginRight: spacing.sm }}>🔍</Text>
          <TextInput
            placeholder="Search keywords (e.g., refund, carbon credit)"
            placeholderTextColor={colors.textSecondary}
            style={{ flex: 1, fontSize: 14 }}
          />
        </View>

        <View style={styles.topicsRow}>
          {[
            { icon: '🚚', title: 'Shipping & Logistics', sub: 'Tracking, eco-friendly packaging, and international delivery options.' },
            { icon: '🛡', title: 'Secure Payments', sub: 'How our escrow system protects every transaction.' },
          ].map((topic) => (
            <Pressable key={topic.title} style={styles.topicCard}>
              <Text style={{ fontSize: 28 }}>{topic.icon}</Text>
              <Text style={[typography.subheading, { marginTop: spacing.xs }]}>{topic.title}</Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>{topic.sub}</Text>
            </Pressable>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.lg }}>
          <Text style={typography.subheading}>Frequently Asked Questions</Text>
          <Text style={[typography.caption, { color: colors.primaryTeal }]}>VIEW ALL</Text>
        </View>

        {FAQS.map((faq, i) => (
          <Pressable key={i} style={styles.faqRow}>
            <View style={{ flex: 1 }}>
              <Text style={typography.body}>{faq.q}</Text>
            </View>
            <Text style={{ color: colors.textSecondary, fontSize: 18 }}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginTop: spacing.lg },
  topicsRow: { flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg },
  topicCard: { flex: 1, backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  faqRow: { flexDirection: 'row', alignItems: 'center', padding: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
});