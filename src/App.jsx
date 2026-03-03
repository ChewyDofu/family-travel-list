import React, { useState, useEffect } from 'react';

export default function App() {
  // 1. Load data from memory
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("travel-list");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Passports (All 3)", mode: "pack", packed: false },
      { id: 2, name: "Baby Carrier", mode: "pack", packed: false }
    ];
  });

  const [newItem, setNewItem] = useState("");
  const [view, setView] = useState('pack');

  // 2. Save to memory
  useEffect(() => {
    localStorage.setItem("travel-list", JSON.stringify(items));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    if (!newItem) return;
    const item = { id: Date.now(), name: newItem, mode: view, packed: false };
    setItems([...items, item]);
    setNewItem("");
  };

  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const resetPackedStatus = () => {
    if (window.confirm("Reset all checkmarks for the next leg of the trip?")) {
      setItems(items.map(item => ({ ...item, packed: false })));
    }
  };

  return (
    <div style={{ 
      fontFamily: '-apple-system, sans-serif', 
      width: '100%', 
      minHeight: '100vh', 
      backgroundColor: '#f0f4f8', 
      margin: 0, 
      padding: 0 
    }}>
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <header style={{ marginBottom: '20px' }}>
          <h1 style={{ color: '#1a365d', fontSize: '28px', margin: '0' }}>Family Trip ✈️</h1>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Bali • Thailand • Japan</p>
        </header>
        
        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', backgroundColor: '#e2e8f0', padding: '4px', borderRadius: '12px' }}>
          {['pack', 'buy'].map(m => (
            <button key={m} onClick={() => setView(m)} style={{
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none', 
              backgroundColor: view === m ? '#ffffff' : 'transparent',
              boxShadow: view === m ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
              fontWeight: '600', color: view === m ? '#2563eb' : '#64748b', transition: '0.2s'
            }}>
              {m === 'pack' ? '🧳 Pack' : '🛒 Buy'}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={addItem} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <input 
            value={newItem} 
            onChange={(e) => setNewItem(e.target.value)}
            placeholder={`Add to ${view} list...`}
            style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '16px' }} 
          />
          <button type="submit" style={{ padding: '12px 20px', borderRadius: '10px', border: 'none', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold' }}>+</button>
        </form>

        {/* The List */}
        <div style={{ marginBottom: '40px' }}>
          {items.filter(item => item.mode === view).map(item => (
            <div key={item.id} style={{ 
              display: 'flex', alignItems: 'center', padding: '16px', backgroundColor: 'white', 
              marginBottom: '10px', borderRadius: '14px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}>
              <input type="checkbox" checked={item.packed} onChange={() => toggleItem(item.id)} style={{ width: '20px', height: '20px', marginRight: '12px' }} />
              <span style={{ flex: 1, fontSize: '16px', textDecoration: item.packed ? 'line-through' : 'none', color: item.packed ? '#94a3b8' : '#1e293b' }}>
                {item.name}
              </span>
              <button onClick={() => deleteItem(item.id)} style={{ background: 'none', border: 'none', color: '#cbd5e1', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <button 
          onClick={resetPackedStatus}
          style={{ width: '100%', padding: '12px', background: 'none', border: '1px dashed #cbd5e1', borderRadius: '10px', color: '#64748b', fontSize: '14px' }}
        >
          🔄 Reset All Checkmarks
        </button>
      </div>
    </div> // Closing the background div!
  );
}