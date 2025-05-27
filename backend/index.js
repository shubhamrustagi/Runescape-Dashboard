import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes.js';
import { syncAPIs } from './fetchApis.js';
import { pool, initTables } from './db.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

const server = http.createServer(app);

async function pollAndEmit() {
  try {
    await syncAPIs();
    const { rows } = await pool.query(`
      SELECT items.item_id, items.name, items.members, prices.high, prices.low, prices.highTime, prices.lowTime
      FROM items
      LEFT JOIN prices ON items.item_id = prices.item_id
      ORDER BY items.name
    `);
    
  } catch (err) {
    console.error('Error during pollAndEmit:', err.message);
  }
}

try {
  await initTables();
  await pollAndEmit();
} catch (err) {
  console.error('Server init error:', err.message);
}

const PORT = process.env.PORT || 8081;
server.listen(PORT, () => {
  console.log('Backend listening on', PORT);
});