/**
 * Seed script — creates a default admin account if one doesn't already exist.
 *
 * Usage:
 *   node seedAdmin.js
 *
 * This will connect to the MongoDB configured in .env, create the admin user,
 * and then exit.
 */
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const ADMIN_EMAIL    = 'admin@smartthrift.com';
const ADMIN_PASSWORD = 'admin123';
const ADMIN_NAME     = 'Admin';

async function seed() {
  await connectDB();

  const existing = await User.findOne({ email: ADMIN_EMAIL });

  if (existing) {
    if (existing.role !== 'admin') {
      existing.role = 'admin';
      await existing.save({ validateBeforeSave: false });
      console.log(`✅ Updated existing user "${ADMIN_EMAIL}" role to admin.`);
    } else {
      console.log(`ℹ️  Admin account "${ADMIN_EMAIL}" already exists. Skipping.`);
    }
  } else {
    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      role: 'admin',
      authProvider: 'email',
      hasCompletedOnboarding: true,
    });
    console.log(`✅ Admin account created: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
  }

  await mongoose.disconnect();
  console.log('Done.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
