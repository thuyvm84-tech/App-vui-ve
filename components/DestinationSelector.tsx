
import React from 'react';
import { Destination } from '../constants';

interface DestinationSelectorProps {
  destinations: Destination[];
  selectedDestination: Destination;
  onSelectDestination: (destination: Destination) => void;
}

export const DestinationSelector: React.FC<DestinationSelectorProps> = ({ destinations, selectedDestination, onSelectDestination }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = destinations.find(d => d.id === event.target.value);
    if (selected) {
      onSelectDestination(selected);
    }
  };

  return (
    <div className="relative w-full">
      <select
        value={selectedDestination.id}
        onChange={handleChange}
        className="w-full bg-gray-700 border border-gray-600 text-white text-md rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block p-3 appearance-none"
      >
        {destinations.map((destination) => (
          <option key={destination.id} value={destination.id}>
            {destination.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>
    </div>
  );
};
