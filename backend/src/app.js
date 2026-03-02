import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('src/uploads'));
app.use(morgan('dev'));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 200 }));

app.get('/api/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, _, res, __) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});

export default app;
