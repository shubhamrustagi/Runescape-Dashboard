import express from 'express';
import { pool } from './db.js';

const router = express.Router();

router.get('/items-prices', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT items.item_id, items.name, items.members, prices.high, prices.low, prices.highTime, prices.lowTime
      FROM items
      LEFT JOIN prices ON items.item_id = prices.item_id
      ORDER BY items.item_id
      LIMIT 50
    `);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching joined items/prices:', err.message);
    res.status(500).json({ error: 'Failed to get joined data.' });
  }
});

export default router;