import { pool } from './db.js';

export async function syncAPIs() {
  const itemsApi = 'https://prices.runescape.wiki/api/v1/osrs/mapping';
  const pricesApi = 'https://prices.runescape.wiki/api/v1/osrs/latest';

  let itemsArr;
  try {
    const itemsRes = await fetch(itemsApi);
    if (!itemsRes.ok) throw new Error(`Items API HTTP ${itemsRes.status}`);
    itemsArr = await itemsRes.json();
    
  } catch (err) {
    console.error('Error fetching items:', err.message);
    return;
  }

  try {
    for (const item of itemsArr) {
      await pool.query(
        `INSERT INTO items(item_id, name, examine, members)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (item_id) DO UPDATE SET 
           name = EXCLUDED.name,
           examine = EXCLUDED.examine,
           members = EXCLUDED.members;`,
        [item.id, item.name, item.examine, item.members]
      );
    }
  } catch (err) {
    console.error('Error inserting items:', err.message);
  }

  let pricesData;
  try {
    const pricesRes = await fetch(pricesApi);
    if (!pricesRes.ok) throw new Error(`Prices API HTTP ${pricesRes.status}`);
    pricesData = await pricesRes.json();
  } catch (err) {
    console.error('Error fetching prices:', err.message);
    return;
  }

  try {
    for (const [item_id, priceObj] of Object.entries(pricesData.data)) {
      await pool.query(
        `INSERT INTO prices(item_id, high, low, highTime, lowTime)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (item_id) DO UPDATE SET 
           high = EXCLUDED.high,
           low = EXCLUDED.low,
           highTime = EXCLUDED.highTime,
           lowTime = EXCLUDED.lowTime;`,
        [
          item_id,
          priceObj.high ?? null,
          priceObj.low ?? null,
          priceObj.highTime ?? null,
          priceObj.lowTime ?? null,
        ]
      );
    }
  } catch (err) {
    console.error('Error inserting prices:', err.message);
  }
}