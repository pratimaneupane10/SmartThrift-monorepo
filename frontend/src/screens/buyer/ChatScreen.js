import { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

import { colors, spacing, typography, radius } from '../../theme/theme';
import BackHeader from '../../components/composite/BackHeader';

const INITIAL_MESSAGES = [
  {
    id: '1',
    text: 'Hi! Is the Vintage Denim Jacket still available?',
    sender: 'me',
    time: '10:30 AM',
  },
  {
    id: '2',
    text: 'Yes it is! Just listed it yesterday.',
    sender: 'them',
    time: '10:31 AM',
  },
  {
    id: '3',
    text: 'Is this still available?',
    sender: 'me',
    time: 'Just now',
  },
];

function AvatarImage({ uri, size = 40 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        overflow: 'hidden',
        backgroundColor: colors.mintIcon,
      }}
    >
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: colors.mintIcon,
          }}
        />
      )}
    </View>
  );
}

export default function ChatScreen({ route, navigation }) {
  const contact =
    route.params?.contact || {
      name: 'Alex Curator',
      image: null,
    };

  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [text, setText] = useState('');

  const flatListRef = useRef(null);

  function sendMessage() {
    if (!text.trim()) return;

    const newMsg = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'me',
      time: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setText('');

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <BackHeader
        title={contact.name}
        onBack={() => navigation.goBack()}
      />

      {/* Contact Info */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <AvatarImage uri={contact.image} size={40} />

          <View style={{ marginLeft: spacing.sm }}>
            <Text style={typography.subheading}>
              {contact.name}
            </Text>

            <Text
              style={[
                typography.caption,
                { color: colors.accentGreen },
              ]}
            >
              ● Online
            </Text>
          </View>
        </View>

        <Text style={styles.menu}>⋯</Text>
      </View>

      {/* Messages */}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: spacing.md }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.msgRow,
              item.sender === 'me' && styles.msgRowMe,
            ]}
          >
            {item.sender !== 'me' && (
              <View style={{ marginRight: spacing.sm }}>
                <AvatarImage uri={contact.image} size={32} />
              </View>
            )}

            <View
              style={[
                styles.bubble,
                item.sender === 'me'
                  ? styles.bubbleMe
                  : styles.bubbleThem,
              ]}
            >
              <Text
                style={{
                  color:
                    item.sender === 'me'
                      ? '#FFFFFF'
                      : colors.textPrimary,
                }}
              >
                {item.text}
              </Text>

              <Text
                style={[
                  typography.caption,
                  {
                    color:
                      item.sender === 'me'
                        ? '#FFFFFFAA'
                        : colors.textSecondary,
                    marginTop: 4,
                  },
                ]}
              >
                {item.time}
              </Text>
            </View>
          </View>
        )}
      />

      {/* Input */}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
          placeholderTextColor={colors.textSecondary}
          multiline
        />

        <Pressable
          style={styles.sendBtn}
          onPress={sendMessage}
        >
          <Text
            style={{
              color: '#FFFFFF',
              fontWeight: '700',
            }}
          >
            Send
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  menu: {
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: '700',
  },

  msgRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },

  msgRowMe: {
    flexDirection: 'row-reverse',
  },

  bubble: {
    maxWidth: '75%',
    padding: spacing.md,
    borderRadius: radius.md,
  },

  bubbleMe: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },

  bubbleThem: {
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginRight: spacing.sm,
    maxHeight: 100,
    color: colors.textPrimary,
  },

  sendBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
});