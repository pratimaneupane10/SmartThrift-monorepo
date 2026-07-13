import { useState } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, TextInput } from 'react-native';
import { colors, spacing, typography, radius } from '../../theme/theme';

const TICKETS = [
  { id: 'TKT-001', user: 'Ramesh Thapa', role: 'Buyer', issue: 'Payment failed but amount deducted', priority: 'High', status: 'Open', date: 'Jun 24' },
  { id: 'TKT-002', user: 'Maya Store', role: 'Seller', issue: 'Cannot upload more than 3 images', priority: 'Medium', status: 'In Progress', date: 'Jun 23' },
  { id: 'TKT-003', user: 'Sita Sharma', role: 'Buyer', issue: 'Order not delivered after 7 days', priority: 'High', status: 'Open', date: 'Jun 22' },
  { id: 'TKT-004', user: 'Aarav Shop', role: 'Seller', issue: 'SmartPrint pricing seems incorrect', priority: 'Low', status: 'Resolved', date: 'Jun 21' },
  { id: 'TKT-005', user: 'Hari Prasad', role: 'Buyer', issue: 'Cannot find my order history', priority: 'Low', status: 'Resolved', date: 'Jun 20' },
];

const PRIORITY_COLORS = { High: colors.danger, Medium: colors.amber, Low: colors.accentGreen };
const STATUS_COLORS = { Open: colors.danger, 'In Progress': colors.amber, Resolved: colors.accentGreen };

export default function AdminSupportScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [tickets, setTickets] = useState(TICKETS);

  function resolveTicket(id) {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, status: 'Resolved' } : t));
  }

  const filtered = tickets.filter((t) => {
    const matchSearch = t.user.toLowerCase().includes(search.toLowerCase()) ||
      t.issue.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.status === filter || t.priority === filter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backArrow}>{'<'}</Text>
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={typography.subheading}>Support Tickets</Text>
        <Text style={[typography.caption, { color: colors.danger }]}>
          {tickets.filter((t) => t.status === 'Open').length + ' open'}
        </Text>
      </View>

      <View style={{ padding: spacing.md }}>
        <View style={styles.searchBar}>
          <Text style={{ marginRight: spacing.sm }}>🔍</Text>
          <TextInput
            style={{ flex: 1 }}
            placeholder="Search tickets..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: spacing.sm }}>
          {['All', 'Open', 'In Progress', 'Resolved', 'High', 'Medium', 'Low'].map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
            >
              <Text style={{ color: filter === f ? '#FFFFFF' : colors.textPrimary, fontSize: 12 }}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.md }}>
        {filtered.map((ticket) => (
          <View key={ticket.id} style={styles.ticketCard}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.xs }}>
              <Text style={[typography.caption, { color: colors.textSecondary }]}>{ticket.id} · {ticket.date}</Text>
              <View style={{ flexDirection: 'row', gap: spacing.xs }}>
                <View style={[styles.badge, { backgroundColor: PRIORITY_COLORS[ticket.priority] + '22' }]}>
                  <Text style={{ color: PRIORITY_COLORS[ticket.priority], fontSize: 10, fontWeight: '700' }}>
                    {ticket.priority}
                  </Text>
                </View>
                <View style={[styles.badge, { backgroundColor: STATUS_COLORS[ticket.status] + '22' }]}>
                  <Text style={{ color: STATUS_COLORS[ticket.status], fontSize: 10, fontWeight: '700' }}>
                    {ticket.status}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={typography.subheading} numberOfLines={2}>{ticket.issue}</Text>
            <Text style={[typography.caption, { color: colors.textSecondary, marginTop: spacing.xs }]}>
              {ticket.user + ' · ' + ticket.role}
            </Text>
            {ticket.status !== 'Resolved' && (
              <Pressable style={styles.resolveBtn} onPress={() => resolveTicket(ticket.id)}>
                <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: '700' }}>Mark Resolved</Text>
              </Pressable>
            )}
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
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md },
  filterChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: radius.pill, backgroundColor: colors.surface, marginRight: spacing.xs },
  filterChipActive: { backgroundColor: colors.primary },
  ticketCard: { backgroundColor: colors.surface, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm },
  badge: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: radius.pill },
  resolveBtn: { backgroundColor: colors.accentGreen, borderRadius: radius.sm, padding: spacing.xs, alignItems: 'center', marginTop: spacing.sm },
});