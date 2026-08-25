import mongoose from 'mongoose';
import dns from 'node:dns';

export async function connectDatabase() {
  const { MONGODB_URI } = process.env;

  if (!MONGODB_URI) {
    const error = new Error('MONGODB_URI is not configured');
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }

  const dnsServers = process.env.MONGODB_DNS_SERVERS?.split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (dnsServers?.length) {
    dns.setServers(dnsServers);
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log(`MongoDB connected: ${mongoose.connection.name}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
}
