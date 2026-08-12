import React, { useState, useEffect } from 'react';
import BoatCard from '../../components/BoatCard';
import Loader from '../../components/Loader';
import { boatService } from '../../services/boatService';

export default function Boat() {
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

  if (loading) return <Loader text="Loading Registered Vessel Specifications..." />;

  return (
    <div className="flex flex-col gap-4 max-w-2xl">
      <h1 className="text-xl font-extrabold text-white">Vessel Specification & Hardware</h1>
      <div className="grid grid-cols-1 gap-4">
        {boats.map((b, idx) => (
          <BoatCard key={b.id || idx} boat={b} />
        ))}
      </div>
    </div>
  );
}
