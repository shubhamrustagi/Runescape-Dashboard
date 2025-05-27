import React, { useEffect, useState } from 'react';
import { fetchItemsPrices } from './api';
import { io } from 'socket.io-client';

const socket = io('http://localhost:8081');

export default function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const d = await fetchItemsPrices();
        setData(d);
      } catch (err) {
        setError(err.message);
      }
    })();

    socket.on('data_update', setData);

    return () => socket.off('data_update');
  }, []);

  return (
    <div>
      <h1>RuneScape Items & Prices (Live)</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <table border="1" cellPadding={5}>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Members?</th>
            <th>High Price</th>
            <th>Low Price</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0
            ? <tr><td colSpan="8">No data loaded</td></tr>
            : data.map(row => (
              <tr key={row.item_id}>
                <td>{row.item_id}</td>
                <td>{row.name}</td>
                <td>{row.members ? 'Yes' : 'No'}</td>
                <td>{row.high}</td>
                <td>{row.low}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
