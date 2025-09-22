'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, Globe, List, Map } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const MapWithNoSSR = dynamic(
  () => import('./OfficeMap'),
  { ssr: false }
);

interface OfficeLocation {
  id: string;
  country: string;
  address: string;
  phone: string;
  email: string;
  mapLink: string;
  coordinates: [number, number]; // [lat, lng]
}

const offices: OfficeLocation[] = [
  {
    id: 'cameroon',
    country: 'Cameroon',
    address: 'BP 2606 Boulevard de la République – Douala',
    phone: '+237 698 835 251',
    email: 'pngatcha@excimaa.ca',
    mapLink: 'https://goo.gl/maps/your-map-link-1',
    coordinates: [4.0511, 9.7679], // Douala coordinates
  },
  {
    id: 'canada',
    country: 'Canada',
    address: '1395 Marshall Crescent, Milton, ON, L9T 6N4',
    phone: '+1 (416) 624-2510',
    email: 'pkemeni@excimaa.ca',
    mapLink: 'https://goo.gl/maps/your-map-link-2',
    coordinates: [43.5186, -79.8824], // Milton, ON coordinates
  },
  {
    id: 'usa',
    country: 'United States',
    address: '3700 Cypress Spring PI, Louisville, KY 40245',
    phone: '+1 (502) 299-0247',
    email: 'ptchamake@excimaa.ca',
    mapLink: 'https://goo.gl/maps/your-map-link-3',
    coordinates: [38.2834, -85.4914], // Louisville, KY coordinates
  },
  {
    id: 'france',
    country: 'France',
    address: '5 Square du Nord, 95500 Gonesse',
    phone: '+33 6 52 45 21 402',
    email: 'pkemeni@excimaa.ca',
    mapLink: 'https://goo.gl/maps/your-map-link-4',
    coordinates: [48.9855, 2.4499], // Gonesse coordinates
  },
  {
    id: 'rwanda',
    country: 'Rwanda',
    address: 'Imm. Aigle Blanc, KN 05 Ave, Airport, Gasabo District',
    phone: '+250 787 779 965',
    email: 'mnkwain@excimaa.ca',
    mapLink: 'https://goo.gl/maps/your-map-link-5',
    coordinates: [-1.9441, 30.0619], // Kigali coordinates
  },
  {
    id: 'drc',
    country: 'DR Congo',
    address: 'N°1A - 1st Floor, Immeuble de la pharmacie Maria, near CFAO, BP: 4018 Pointe-Noire',
    phone: '+242 06 444 0729',
    email: 'pkemeni@excimaa.ca',
    mapLink: 'https://goo.gl/maps/your-map-link-6',
    coordinates: [-4.7761, 11.8635], // Pointe-Noire coordinates
  },
  {
    id: 'burundi',
    country: 'Burundi',
    address: 'Boulevard Melchior NDADAYE N°68A, Immeuble Be Forward, Quartier Asiatique',
    phone: '+257 79 34 39 93',
    email: 'ofodji@excimaa.ca',
    mapLink: 'https://goo.gl/maps/your-map-link-7',
    coordinates: [-3.3614, 29.3599], // Bujumbura coordinates
  },
];

export function GlobalOffices() {
  const [activeTab, setActiveTab] = useState<'map' | 'list'>('map');
  const [selectedOffice, setSelectedOffice] = useState<OfficeLocation | null>(null);

  // Set the first office as selected by default when component mounts
  useEffect(() => {
    if (offices.length > 0 && !selectedOffice) {
      setSelectedOffice(offices[0]);
    }
  }, [selectedOffice]);

  const handleOfficeSelect = (office: OfficeLocation) => {
    setSelectedOffice(office);
    // If on mobile, switch to list view when an office is selected
    if (window.innerWidth < 768) {
      setActiveTab('list');
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Global Presence</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            With offices across multiple continents, we provide local expertise with a global perspective
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                activeTab === 'map' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Map className="h-4 w-4 mr-2" />
              Map View
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium ml-1 ${
                activeTab === 'list' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <List className="h-4 w-4 mr-2" />
              List View
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* Map View */}
            <div className={`${activeTab === 'map' ? 'block' : 'hidden md:block'} w-full md:w-1/2 h-full`}>
              <div className="h-full w-full">
                <MapWithNoSSR 
                  offices={offices} 
                  selectedOffice={selectedOffice}
                  onSelectOffice={handleOfficeSelect}
                />
              </div>
            </div>

            {/* List View */}
            <div className={`${activeTab === 'list' ? 'block' : 'hidden md:block'} w-full md:w-1/2 overflow-y-auto`}>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <motion.div
                      key={office.id}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedOffice?.id === office.id 
                          ? 'bg-blue-50 border-l-4 border-blue-600' 
                          : 'hover:bg-gray-50 border-l-4 border-transparent'
                      }`}
                      onClick={() => handleOfficeSelect(office)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-semibold text-gray-900">{office.country}</h4>
                      <p className="text-sm text-gray-600 mt-1">{office.address}</p>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <Phone className="h-4 w-4 mr-1" />
                        <a href={`tel:${office.phone.replace(/\D/g, '')}`} className="hover:text-blue-600">
                          {office.phone}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedOffice && (
                  <motion.div 
                    className="mt-8 bg-gray-50 p-6 rounded-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <h4 className="font-bold text-lg text-gray-900 mb-4">{selectedOffice.country} Office</h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                        <p className="text-gray-700">{selectedOffice.address}</p>
                      </div>
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                        <a href={`tel:${selectedOffice.phone.replace(/\D/g, '')}`} className="text-gray-700 hover:text-blue-600">
                          {selectedOffice.phone}
                        </a>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-gray-500 mr-3 flex-shrink-0" />
                        <a href={`mailto:${selectedOffice.email}`} className="text-gray-700 hover:text-blue-600">
                          {selectedOffice.email}
                        </a>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button
                        href={selectedOffice.mapLink}
                        variant="outline"
                        className="w-full flex items-center justify-center mt-2"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4 mr-2" />
                        View on Google Maps
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Need to contact a specific office?</h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Our global team is ready to assist you with your business needs, no matter where you are located.
          </p>
          <Button href="/contact" variant="primary" size="lg">
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
}
