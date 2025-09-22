'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix for default marker icons in Next.js
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface OfficeLocation {
  id: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  mapLink: string;
  coordinates: [number, number];
}

interface OfficeMapProps {
  offices: OfficeLocation[];
  selectedOffice: OfficeLocation | null;
  onSelectOffice: (office: OfficeLocation) => void;
}

export default function OfficeMap({ offices, selectedOffice, onSelectOffice }: OfficeMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Initialize map
  useEffect(() => {
    if (typeof window === 'undefined' || !mapContainerRef.current) return;

    // Create map instance
    mapRef.current = L.map(mapContainerRef.current, {
      zoomControl: false,
    }).setView([20, 10], 2);

    // Add tile layer (OpenStreetMap)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Add zoom control
    L.control.zoom({
      position: 'bottomright'
    }).addTo(mapRef.current);

    // Add markers for each office
    markersRef.current = offices.map(office => {
      const marker = L.marker(office.coordinates as [number, number], {
        title: office.country,
        alt: office.country,
        riseOnHover: true,
      }).addTo(mapRef.current!);

      // Add popup
      marker.bindPopup(`
        <div class="p-2">
          <h4 class="font-semibold text-gray-900">${office.country}</h4>
          <p class="text-sm text-gray-600 mt-1">${office.address}</p>
          <button 
            class="mt-2 w-full bg-blue-600 text-white text-sm py-1 px-3 rounded hover:bg-blue-700 transition-colors"
            onclick="event.stopPropagation(); window.dispatchEvent(new CustomEvent('selectOffice', { detail: '${office.id}' }));"
          >
            View Details
          </button>
        </div>
      `);

      // Add click handler
      marker.on('click', () => {
        onSelectOffice(office);
      });

      return marker;
    });

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      markersRef.current = [];
    };
  }, [offices, onSelectOffice]);

  // Update map view when selected office changes
  useEffect(() => {
    if (selectedOffice && mapRef.current) {
      const office = offices.find(o => o.id === selectedOffice.id);
      if (office) {
        mapRef.current.flyTo(office.coordinates as [number, number], 12, {
          duration: 1,
        });

        // Open popup for the selected office
        const marker = markersRef.current.find(
          (_, index) => offices[index].id === selectedOffice.id
        );
        if (marker) {
          marker.openPopup();
        }
      }
    }
  }, [selectedOffice, offices]);

  // Add event listener for popup buttons
  useEffect(() => {
    const handleSelectOffice = (e: CustomEvent) => {
      const office = offices.find(o => o.id === e.detail);
      if (office) {
        onSelectOffice(office);
      }
    };

    // @ts-ignore
    window.addEventListener('selectOffice', handleSelectOffice);
    return () => {
      // @ts-ignore
      window.removeEventListener('selectOffice', handleSelectOffice);
    };
  }, [offices, onSelectOffice]);

  return (
    <div 
      ref={mapContainerRef} 
      className="h-full w-full z-0"
      style={{ minHeight: '400px' }}
    />
  );
}
