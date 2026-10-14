import 'dotenv/config';
import process from 'node:process';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'ShowCase API is running!'
  });
});

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is missing from .env');
  process.exit(1);
}

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
