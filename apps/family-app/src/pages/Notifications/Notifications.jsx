import React from 'react';
import Notification from '../../components/Notification/Notification';

export default function Notifications() {
  return (
    <div className="space-y-3">
      <h2 className="text-sm font-bold text-white uppercase">Trip Notifications</h2>
      <Notification message="Boat departed Kochi Harbor at 04:30 AM" />
    </div>
  );
}
