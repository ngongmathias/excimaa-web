'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export function MapSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This would be replaced with actual map initialization in a real app
    // For example, using Google Maps API or Mapbox
    const initMap = () => {
      if (typeof window !== 'undefined' && mapRef.current) {
        // In a real implementation, you would initialize your map here
        // For example:
        // const map = new window.google.maps.Map(mapRef.current, {
        //   center: { lat: 40.7128, lng: -74.0060 }, // New York coordinates
        //   zoom: 14,
        // });
        
        // For now, we'll just set a background image as a placeholder
        mapRef.current.style.backgroundImage = 'url("/images/map-placeholder.jpg")';
        mapRef.current.style.backgroundSize = 'cover';
        mapRef.current.style.backgroundPosition = 'center';
      }
    };
    
    // Initialize map when component mounts
    initMap();
    
    // Add any cleanup if needed
    return () => {
      // Cleanup map instance if needed
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative h-full w-full"
    >
      <div 
        ref={mapRef}
        className="h-96 w-full rounded-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-xs">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Our Location</h3>
            <p className="text-gray-600 text-sm mb-4">
              123 Business Ave, Suite 100<br />
              New York, NY 10001
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Open in Maps
              <svg
                className="ml-2 -mr-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Map attribution */}
      <div className="absolute bottom-2 right-2 bg-white bg-opacity-90 px-2 py-1 text-xs text-gray-600 rounded">
        © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="hover:underline">OpenStreetMap</a> contributors
      </div>
    </motion.div>
  );
}
