const API_BASE = 'http://localhost:5000/api';

export async function fetchFamilyBoat() {
  const res = await fetch(`${API_BASE}/boats/b-102`);
  return await res.json();
}
