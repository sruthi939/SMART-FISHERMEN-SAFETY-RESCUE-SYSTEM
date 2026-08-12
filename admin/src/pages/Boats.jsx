import React, { useState, useEffect } from 'react';
import BoatCard from '../../../frontend/src/components/BoatCard';
import Loader from '../../../frontend/src/components/Loader';
import { boatService } from '../../../frontend/src/services/boatService';

export default function Boats() {
  const [boats, setBoats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoats();
  }, []);

  const fetchBoats = async () => {
    try {
      const res = await boatService.getAll();
      setBoats(res.boats || []);
    } catch (err) {
      console.error('Error fetching boats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Vessels Database..." />;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Registered Vessels Database</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {boats.map((b) => <BoatCard key={b.id || b.name} boat={b} />)}
      </div>
    </div>
  );
}
