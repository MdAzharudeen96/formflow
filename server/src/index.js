import dotenv from 'dotenv';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: fileURLToPath(new URL('../../.env', import.meta.url)) });

const port = Number(process.env.SERVER_PORT ?? 3000);

await connectDatabase();

app.listen(port, () => {
  console.log(`FormFlow API listening on port ${port}`);
});