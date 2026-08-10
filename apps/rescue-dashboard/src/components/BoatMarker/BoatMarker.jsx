import React from 'react';
import { Marker, Popup } from 'react-leaflet';

export default function BoatMarker({ position, name }) {
  return (
    <Marker position={position}>
      <Popup>{name}</Popup>
    </Marker>
  );
}
