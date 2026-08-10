import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export default function FishermanMarker({ position, name }) {
  return (
    <Marker position={position}>
      <Popup>Fisherman: {name}</Popup>
    </Marker>
  );
}
