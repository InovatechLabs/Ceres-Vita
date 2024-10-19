import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const center = {
  lat: -23.29428033316881, // Latitude
  lng: -45.96661849259776 // Longitude 
};

// -23.29428033316881, -45.96661849259776 FATEC

const ContactMap: React.FC = () => {
  return (
    <MapContainer
      center={center}
      zoom={15}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>
          Venha para a Fatec! <br /> R. Faria de Lima, 155 - Jardim Santa Maria, Jacareí - SP
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ContactMap;