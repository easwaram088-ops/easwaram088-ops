import express from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { DataSimulator } from './src/lib/data-simulator';
import { MLEngine } from './src/lib/ml-engine';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get('/api/data', (req, res) => {
    const history = DataSimulator.generateHistoricalData(24);
    const bigDataStats = DataSimulator.generateMockBigData();
    res.json({ history, stats: bigDataStats });
  });

  app.get('/api/predict', (req, res) => {
    const history = DataSimulator.generateHistoricalData(24);
    const predictions = MLEngine.forecast(history, 6);
    res.json({ predictions });
  });

  app.get('/api/metrics', (req, res) => {
    const history = DataSimulator.generateHistoricalData(24);
    const metrics = MLEngine.calculateMetrics(history);
    res.json(metrics);
  });

  app.post('/api/train', (req, res) => {
    // Simulate training process
    setTimeout(() => {
      res.json({ 
        status: 'success', 
        message: 'Models (XGBoost & LSTM) retrained successfully on 12.4M records.',
        timestamp: new Date().toISOString()
      });
    }, 2000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 InflationPulse AI Server running at http://localhost:${PORT}`);
  });
}

startServer();
