import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Charity server is running' });
});

app.get('/api/charities', (req, res) => {
  // Mock data for now
  res.json([
    { id: 1, name: 'Education Fund', description: 'Supporting education worldwide' },
    { id: 2, name: 'Healthcare Initiative', description: 'Providing medical aid' }
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});
