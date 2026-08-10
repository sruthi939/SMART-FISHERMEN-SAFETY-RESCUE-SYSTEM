import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function LiveMap({ children }) {
  return (
    <div className="h-full rounded-xl overflow-hidden border border-slate-800">
      <MapContainer center={[9.9000, 76.2000]} zoom={10} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {children}
      </MapContainer>
    </div>
  );
}
