import React, { useState, useEffect } from 'react';
import FishermanCard from '../../components/FishermanCard';
import Loader from '../../components/Loader';
import { fishermanService } from '../../services/fishermanService';

export default function Fishermen() {
  const [fishermen, setFishermen] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFishermen();
  }, []);

  const fetchFishermen = async () => {
    try {
      const res = await fishermanService.getAll();
      setFishermen(res.fishermen || []);
    } catch (err) {
      console.error('Error fetching fishermen:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader text="Loading Fishermen Directory..." />;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-extrabold text-white">Registered Fishermen Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fishermen.map(f => <FishermanCard key={f.id} fisherman={f} />)}
      </div>
    </div>
  );
}
