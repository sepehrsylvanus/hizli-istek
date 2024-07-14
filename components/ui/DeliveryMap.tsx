// DeliveryMap.tsx
"use client";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix icon issue with Leaflet in React
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const DeliveryMap: React.FC = () => {
  const positionUSA: [number, number] = [37.0902, -95.7129]; // USA coordinates
  const positionCyprus: [number, number] = [35.1264, 33.4299]; // Cyprus coordinates
  const polylinePositions: [number, number][] = [positionUSA, positionCyprus];

  return (
    <MapContainer
      center={[20, 0]}
      zoom={0}
      style={{ height: "178px", width: "271px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={positionUSA}>
        <Popup>Start: USA</Popup>
      </Marker>
      <Marker position={positionCyprus}>
        <Popup>Destination: Cyprus</Popup>
      </Marker>
      <Polyline positions={polylinePositions} color="red" />
    </MapContainer>
  );
};

export default DeliveryMap;
