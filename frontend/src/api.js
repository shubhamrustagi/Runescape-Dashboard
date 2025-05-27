export async function fetchItemsPrices() {
    try {
      const res = await fetch('http://localhost:4000/api/items-prices');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch items/prices:', err.message);
      return [];
    }
  }