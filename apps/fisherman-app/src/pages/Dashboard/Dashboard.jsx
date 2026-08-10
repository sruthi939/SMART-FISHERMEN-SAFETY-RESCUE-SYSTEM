import React from 'react';
import WeatherCard from '../../components/WeatherCard/WeatherCard';
import BoatStatus from '../../components/BoatStatus/BoatStatus';

export default function Dashboard({ boat, weather }) {
  return (
    <div className="space-y-4">
      <WeatherCard weather={weather} />
      <BoatStatus boat={boat} />
    </div>
  );
}
