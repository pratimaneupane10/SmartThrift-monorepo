import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const FAQS = [
  { q: 'What makes Smart Thrift shipping carbon neutral?', a: 'We partner with eco-friendly logistics providers and offset all remaining emissions through verified carbon credits.' },
  { q: 'How is the Sustainability Score (0-100) calculated?', a: 'The score combines item condition, shipping distance, packaging type, and seller sustainability practices.' },
  { q: 'When will I receive payment for my sold items?', a: 'Payments are processed within 3-5 business days after the buyer confirms receipt of the item.' },
];

const RESOLUTION_STEPS = [
  { step: '1', title: 'Verification', desc: 'Our team reviews provided evidence and transaction logs within 24 hours.' },
  { step: '2', title: 'Mediation', desc: 'We reach out to both buyer and seller to find a sustainable solution.' },
  { step: '3', title: 'Settlement', desc: 'Funds are released or refunded based on the final arbitration decision.' },
];

// Blues matched from your screenshots — move these into theme.js if you'd like them shared app-wide
const BLUE = {
  card: '#EAF2FF',
  cardBorder: '#BFD9FF',
  icon: '#DCE9FF',
  text: '#2F6FE0',
  button: '#1E293B',
};

export default function HelpScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [issueCategory, setIssueCategory] = useState('Item not received');
  const [description, setDescription] = useState('');

  function toggleFaq(i) {
    setExpandedFaq(expandedFaq === i ? null : i);
  }

  function handleSubmitCase() {
    // Wire this up to your support/ticket API
    console.log({ orderNumber, issueCategory, description });
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <BackHeader
        title="Help & Support"
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ padding: spacing.lg, paddingBottom: spacing.xl * 1.5 }} showsVerticalScrollIndicator={false}>
        <Text style={[typography.heading, { fontSize: 26, textAlign: 'center' }]}>
          How can we help you today?
        </Text>
        <Text style={[typography.body, { color: colors.textSecondary, marginTop: spacing.xs, textAlign: 'center' }]}>
          Search our knowledge base for answers on shipping, sustainability standards, and payment protection.
        </Text>

        <View style={styles.searchBar}>
          <Text style={{ marginRight: spacing.sm }}>🔍</Text>
          <TextInput
            placeholder="Search keywords (e.g. 'refund', 'carbon credit')"
            placeholderTextColor={colors.textSecondary}
            style={{ flex: 1, fontSize: 14, color: colors.textPrimary }}
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Topic cards */}
        <View style={{ marginTop: spacing.lg, gap: spacing.md }}>
          {[
            { icon: '🚚', title: 'Shipping & Logistics', sub: 'Tracking, eco-friendly packaging, and international delivery options.' },
            { icon: '💳', title: 'Secure Payments', sub: 'Escrow protection, payout schedules, and tax documentation.' },
            { icon: '🌱', title: 'Sustainability Ethics', sub: 'Verification process, carbon offsetting, and circularity scores.' },
          ].map((topic) => (
            <Pressable key={topic.title} style={styles.topicCard}>
              <View style={styles.topicIcon}>
                <Text style={{ fontSize: 20 }}>{topic.icon}</Text>
              </View>
              <Text style={[typography.subheading, { marginTop: spacing.sm, textAlign: 'center' }]}>
                {topic.title}
              </Text>
              <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs, textAlign: 'center' }]}>
                {topic.sub}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* FAQ section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.xl }}>
          <Text style={typography.subheading}>Frequently Asked Questions</Text>
          <Pressable>
            <Text style={[typography.caption, { color: BLUE.text, fontWeight: '700' }]}>VIEW ALL</Text>
          </Pressable>
        </View>

        <View style={styles.faqCard}>
          {FAQS.map((faq, i) => (
            <View key={i}>
              <Pressable style={styles.faqRow} onPress={() => toggleFaq(i)}>
                <View style={{ flex: 1 }}>
                  <Text style={typography.body}>{faq.q}</Text>
                </View>
                <Text style={{ color: colors.textSecondary, fontSize: 16 }}>
                  {expandedFaq === i ? '⌃' : '⌄'}
                </Text>
              </Pressable>
              {expandedFaq === i && (
                <View style={styles.faqAnswer}>
                  <Text style={[typography.caption, { color: colors.textSecondary }]}>
                    {faq.a}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Resolution Center — support ticket form */}
        <View style={styles.resolutionCard}>
          <Text style={[typography.caption, { color: BLUE.text, fontWeight: '700', letterSpacing: 1 }]}>
            RESOLUTION CENTER
          </Text>
          <Text style={[typography.subheading, { fontSize: 20, marginTop: spacing.xs }]}>
            Open a Support Ticket
          </Text>
          <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>
            Experiencing an issue with a transaction? Our resolution team mediates disputes to ensure fair outcomes for both parties.
          </Text>

          <View style={{ flexDirection: 'row', gap: spacing.md, marginTop: spacing.lg }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.formLabel}>ORDER NUMBER</Text>
              <TextInput
                placeholder="#TS-10293"
                placeholderTextColor={colors.textSecondary}
                style={styles.formInput}
                value={orderNumber}
                onChangeText={setOrderNumber}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.formLabel}>ISSUE CATEGORY</Text>
              <Pressable style={[styles.formInput, { justifyContent: 'center' }]}>
                <Text style={{ color: colors.textPrimary, fontSize: 14 }}>{issueCategory} ⌄</Text>
              </Pressable>
            </View>
          </View>

          <Text style={[styles.formLabel, { marginTop: spacing.md }]}>DESCRIPTION</Text>
          <TextInput
            placeholder="Please describe the issue in detail..."
            placeholderTextColor={colors.textSecondary}
            style={styles.textArea}
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: spacing.md }}>
            <Pressable style={styles.uploadBtn}>
              <Text style={{ color: colors.textPrimary, fontSize: 13 }}>📎 Upload Photos</Text>
            </Pressable>
            <Pressable style={styles.submitBtn} onPress={handleSubmitCase}>
              <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 14 }}>Submit Case</Text>
            </Pressable>
          </View>
        </View>

        {/* Resolution process */}
        <View style={styles.processCard}>
          <Text style={[typography.subheading, { fontSize: 18, marginBottom: spacing.md }]}>
            Resolution Process
          </Text>
          {RESOLUTION_STEPS.map((item) => (
            <View key={item.step} style={styles.processRow}>
              <View style={styles.processCircle}>
                <Text style={{ color: '#FFFFFF', fontWeight: '700', fontSize: 13 }}>{item.step}</Text>
              </View>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={typography.subheading}>{item.title}</Text>
                <Text style={[typography.caption, { color: colors.textSecondary, marginTop: 2 }]}>
                  {item.desc}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  topicCard: {
    backgroundColor: BLUE.card,
    borderWidth: 1,
    borderColor: BLUE.cardBorder,
    borderStyle: 'dashed',
    borderRadius: radius.md,
    padding: spacing.lg,
    alignItems: 'center',
  },
  topicIcon: {
    width: 44,
    height: 44,
    borderRadius: 999,
    backgroundColor: BLUE.icon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  faqCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  faqRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  faqAnswer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resolutionCard: {
    backgroundColor: BLUE.card,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  formLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  formInput: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 14,
    color: colors.textPrimary,
  },
  textArea: {
    backgroundColor: colors.background,
    borderRadius: radius.sm,
    padding: spacing.md,
    fontSize: 14,
    color: colors.textPrimary,
    marginTop: spacing.xs,
    minHeight: 90,
    textAlignVertical: 'top',
  },
  uploadBtn: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  submitBtn: {
    backgroundColor: BLUE.button,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
  },
  processCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  processRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  processCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: BLUE.button,
    justifyContent: 'center',
    alignItems: 'center',
  },
});