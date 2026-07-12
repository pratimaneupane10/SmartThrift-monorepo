// Quick manual test for the chat socket layer.
// Run with: node socketTest.js
// Paste a real admin (or any user) token below before running.

const { io } = require('socket.io-client');

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhM2ZjMzU0ZTA1MDNhNTBiZGFmNzAyYyIsImlhdCI6MTc4MzE2NzAxOSwiZXhwIjoxNzgzNzcxODE5fQ.OOhIuyrYo-EuOl-B47RBkM8v1febJrN3C1WyAuFGpG8';

const RECEIVER_ID = '6a491abcbd5742e56dd07717';

const socket = io('http://localhost:5000', {
  auth: { token: TOKEN },
});

socket.on('connect', () => {
  console.log('✅ Connected! Socket ID:', socket.id);

  // Send a real-time test message 3 seconds after connecting
  setTimeout(() => {
    console.log('📤 Sending test message...');
    socket.emit('sendMessage', {
      receiverId: RECEIVER_ID,
      content: 'Hello from the real-time socket test!',
    });
  }, 3000);
});

socket.on('connect_error', (err) => {
  console.log('❌ Connection failed:', err.message);
});

socket.on('onlineUsers', (users) => {
  console.log('👥 Currently online:', users);
});

socket.on('receiveMessage', (msg) => {
  console.log('📩 New message received:', msg);
});

socket.on('messageSent', (msg) => {
  console.log('✅ Message saved/sent confirmation:', msg);
});

socket.on('readReceipt', (data) => {
  console.log('👀 Read receipt:', data);
});

socket.on('chatError', (err) => {
  console.log('⚠️ Chat error:', err);
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected');
});