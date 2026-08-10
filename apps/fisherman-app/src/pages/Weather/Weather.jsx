import React from 'react';
import WeatherCard from '../../components/WeatherCard/WeatherCard';

export default function Weather({ weather }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white uppercase">Marine Forecast & Cyclone Warning</h2>
      <WeatherCard weather={weather} />
    </div>
  );
}
