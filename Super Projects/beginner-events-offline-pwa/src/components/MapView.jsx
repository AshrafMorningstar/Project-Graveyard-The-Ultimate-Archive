/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { format } from 'date-fns'

export default function MapView({ events }) {
  const center = [40.7128, -74.0060] // Default NYC

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-white/10 z-0 relative">
      <MapContainer center={center} zoom={11} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map(event => (
          <Marker 
            key={event.id} 
            position={[event.location.lat, event.location.lng]}
          >
            <Popup className="text-gray-900">
              <div className="font-bold">{event.title}</div>
              <div className="text-xs">{format(new Date(event.date), 'PP')}</div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
