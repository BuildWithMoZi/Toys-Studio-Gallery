"use client";

import { useMemo } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { STORE_LOCATION } from "@/data/site";

function createStoreIcon() {
  return L.divIcon({
    className: "footer-map-marker",
    html: `<span class="footer-map-marker-pin" aria-hidden="true"></span>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -28],
  });
}

/** Interactive store map — Leaflet + CARTO Voyager tiles (no API key). */
export function FooterMap() {
  const icon = useMemo(() => createStoreIcon(), []);
  const { lat, lng } = STORE_LOCATION.coordinates;

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={14}
      scrollWheelZoom={false}
      className="footer-map-container z-0 h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <ZoomControl position="bottomright" />
      <Marker position={[lat, lng]} icon={icon}>
        <Popup>
          <strong>{STORE_LOCATION.name}</strong>
          <br />
          {STORE_LOCATION.address}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
