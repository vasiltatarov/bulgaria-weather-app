import React, { useState } from 'react';
import { MAJOR_CITIES, REGIONS } from '../utils/constants';
import type { Location } from '../types';

interface LocationSelectorProps {
  onLocationSelect: (location: Location) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onLocationSelect }) => {
  const [selectedTab, setSelectedTab] = useState<'cities' | 'regions'>('cities');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  
  const handleLocationSelect = (name: string) => {
    const newLocation: Location = {
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name: name,
      region: selectedTab === 'regions' ? name : undefined,
      isFavorite: false
    };
    
    setSelectedLocation(newLocation);
    onLocationSelect(newLocation);
  };

  return (
    <div className="location-selector">
      <h2>Select a Location</h2>
      
      <div className="location-tabs">
        <button 
          className={`tab ${selectedTab === 'cities' ? 'active' : ''}`}
          onClick={() => setSelectedTab('cities')}
        >
          Major Cities
        </button>
        <button 
          className={`tab ${selectedTab === 'regions' ? 'active' : ''}`}
          onClick={() => setSelectedTab('regions')}
        >
          Regions
        </button>
      </div>
      
      <div className="location-list">
        {selectedTab === 'cities' ? (
          <div className="cities-grid">
            {MAJOR_CITIES.map((city) => (
              <button
                key={city}
                className={`location-item ${selectedLocation?.name === city ? 'selected' : ''}`}
                onClick={() => handleLocationSelect(city)}
              >
                {city}
              </button>
            ))}
          </div>
        ) : (
          <div className="regions-grid">
            {REGIONS.map((region) => (
              <button
                key={region}
                className={`location-item ${selectedLocation?.name === region ? 'selected' : ''}`}
                onClick={() => handleLocationSelect(region)}
              >
                {region}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {selectedLocation && (
        <div className="selected-location">
          <p>Selected: <strong>{selectedLocation.name}</strong></p>
        </div>
      )}
    </div>
  );
};

export default LocationSelector; 