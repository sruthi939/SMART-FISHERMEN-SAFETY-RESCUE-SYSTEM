import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

export default function LiveMap({ lat = 9.9312, lon = 76.2673 }) {
  return (
    <div className="h-64 rounded-xl overflow-hidden border border-slate-800">
      <MapContainer center={[lat, lon]} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]} />
      </MapContainer>
    </div>
  );
}
