import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import { connectDatabase } from '../config/database.js';
import User from '../models/User.js';
import { hashPassword } from '../services/authService.js';

dotenv.config({ path: fileURLToPath(new URL('../../../.env', import.meta.url)) });

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
  throw new Error('ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD are required');
}

try {
  await connectDatabase();

  const email = ADMIN_EMAIL.trim().toLowerCase();
  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log('Admin already exists; no new admin was created');
  } else {
    await User.create({
      name: ADMIN_NAME.trim(),
      email,
      passwordHash: await hashPassword(ADMIN_PASSWORD),
      role: 'admin',
    });
    console.log('Admin created successfully');
  }
} finally {
  await mongoose.disconnect();
}
