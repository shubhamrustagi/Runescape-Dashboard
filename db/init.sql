CREATE TABLE IF NOT EXISTS items (
  id INTEGER PRIMARY KEY,
  name TEXT,
  examine TEXT,
  members BOOLEAN,
  lowalch INTEGER,
  highalch INTEGER,
  limit INTEGER,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS prices (
  item_id INTEGER PRIMARY KEY REFERENCES items(id),
  avg_high_price INTEGER,
  avg_low_price INTEGER,
  timestamp TIMESTAMP
);