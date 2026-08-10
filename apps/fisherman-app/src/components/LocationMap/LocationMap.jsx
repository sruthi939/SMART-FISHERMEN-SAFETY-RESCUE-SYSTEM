import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const icon = new L.DivIcon({
  className: 'm-icon',
  html: `<div style="background:#0284c7;color:#fff;padding:6px;border-radius:50%;border:2px solid #fff;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M12 2v8"/></svg></div>`,
  iconSize: [28, 28]
});

export default function LocationMap({ lat = 9.9312, lon = 76.2673, boatName = 'Sea Falcon' }) {
  return (
    <div className="h-64 rounded-xl overflow-hidden border border-slate-800">
      <MapContainer center={[lat, lon]} zoom={11} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lon]} icon={icon}>
          <Popup>{boatName}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
