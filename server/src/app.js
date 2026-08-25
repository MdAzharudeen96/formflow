import cors from 'cors';
import express from 'express';
import apiRoutes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ?? 'http://localhost:5173' }));
app.use(express.json());

app.use('/api', apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;