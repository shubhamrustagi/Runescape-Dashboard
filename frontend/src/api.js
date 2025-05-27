const API_URL = import.meta.env.VITE_API_URL;

export async function fetchItemsPrices() {
    try {
      const res = await fetch(`${API_URL}/api/items-prices`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error('Failed to fetch items/prices:', err.message);
      return [];
    }
  }