import React, { useState } from 'react';

// This is the data for your specific trip
const initialItems = [
  { id: 1, name: "Passports (All 3)", cat: "Docs", mode: "pack", packed: false },
  { id: 2, name: "Baby Birth Certificate", cat: "Docs", mode: "pack", packed: false },
  { id: 3, name: "Camera & Chargers", cat: "Tech", mode: "pack", packed: false },
  { id: 4, name: "Laptop & Phone Cables", cat: "Tech", mode: "pack", packed: false },
  { id: 5, name: "Universal Power Bank", cat: "Tech", mode: "pack", packed: false },
  { id: 6, name: "Baby Carrier (Ergobaby)", cat: "Gear", mode: "pack", packed: false },
  { id: 7, name: "Bulk Diapers", cat: "Baby", mode: "buy", packed: false },
  { id: 8, name: "Baby Wipes (Large)", cat: "Baby", mode: "buy", packed: false },
  { id: 9, name: "Bottled Water (Formula)", cat: "Food", mode: "buy", packed: false },
];

export default function App() {
  const [items, setItems] = useState(initialItems);
  const [view, setView] = useState('pack'); // 'pack' or 'buy'

  const toggleItem = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, packed: !item.packed } : item
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '400px', margin: 'auto', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <h1 style={{ color: '#1e40af', fontSize: '24px' }}>Family Travel ✈️</h1>
      
      {/* Tab Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button 
          onClick={() => setView('pack')}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: view === 'pack' ? '#2563eb' : '#cbd5e1', color: 'white', fontWeight: 'bold' }}
        >
          🧳 Pack Now
        </button>
        <button 
          onClick={() => setView('buy')}
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', backgroundColor: view === 'buy' ? '#16a34a' : '#cbd5e1', color: 'white', fontWeight: 'bold' }}
        >
          🛒 Buy There
        </button>
      </div>

      {/* The List */}
      <div>
        {items.filter(item => item.mode === view).map(item => (
          <div 
            key={item.id} 
            onClick={() => toggleItem(item.id)}
            style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', padding: '15px', 
              backgroundColor: 'white', marginBottom: '10px', borderRadius: '12px', 
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)', cursor: 'pointer',
              opacity: item.packed ? 0.5 : 1
            }}
          >
            <input type="checkbox" checked={item.packed} readOnly />
            <span style={{ textDecoration: item.packed ? 'line-through' : 'none' }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748b', marginTop: '20px' }}>
        Route: Bali → Thailand → Japan
      </p>
    </div>
  );
}