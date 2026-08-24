import 'dotenv/config';
import app from './app.js';

const port = Number(process.env.SERVER_PORT ?? 3000);

app.listen(port, () => {
  console.log(`FormFlow API listening on port ${port}`);
});