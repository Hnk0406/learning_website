import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Placeholder routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', stage: 1 });
});

export default app;
