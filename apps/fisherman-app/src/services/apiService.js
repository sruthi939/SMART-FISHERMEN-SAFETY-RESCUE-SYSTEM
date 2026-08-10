const API_BASE = 'http://localhost:5000/api';

export async function fetchBoatData(boatId = 'b-102') {
  const res = await fetch(`${API_BASE}/boats/${boatId}`);
  return await res.json();
}

export async function triggerSOS(payload) {
  const res = await fetch(`${API_BASE}/emergency/sos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
}
