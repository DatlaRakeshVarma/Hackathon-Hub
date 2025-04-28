import React, { useState, useEffect } from 'react';
import HackathonCard from '../components/HackathonCard';
import FilterBar from '../components/FilterBar';
import { FilterOptions, Hackathon } from '../types';
import { filterHackathons } from '../utils/helpers';

const defaultFilters: FilterOptions = {
  state: 'All States',
  district: 'All Districts',
  college: 'All Colleges',
  status: 'All Statuses',
  tag: 'All Tags',
  startDate: '',
  endDate: ''
};

const HackathonsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [filteredHackathons, setFilteredHackathons] = useState<Hackathon[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathons`);
        const data = await response.json();
        setHackathons(data);
        setFilteredHackathons(data);
      } catch (error) {
        console.error('Error fetching hackathons:', error);
      }
    };
    fetchHackathons();
  }, []);
  
  useEffect(() => {
    let result = filterHackathons(
      hackathons,
      filters.state,
      filters.district,
      filters.college,
      filters.status,
      filters.tag,
      filters.startDate,
      filters.endDate
    );
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        hackathon =>
          hackathon.title.toLowerCase().includes(term) ||
          hackathon.description.toLowerCase().includes(term) ||
          hackathon.college.toLowerCase().includes(term) ||
          hackathon.state.toLowerCase().includes(term) ||
          hackathon.district.toLowerCase().includes(term) ||
          hackathon.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    setFilteredHackathons(result);
  }, [filters, searchTerm, hackathons]);
  
  const handleFilterChange = (name: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setSearchTerm('');
  };
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Explore Hackathons</h1>
          <p className="text-gray-600">
            Discover hackathons happening at engineering colleges in Southern India.
            Filter by state, district, college, status, or tags to find the perfect hackathon for you.
          </p>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search hackathons by title, description, college, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-10 py-3"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        
        <FilterBar 
          filters={filters} 
          onFilterChange={handleFilterChange} 
          onReset={handleReset}
        />
        
        {filteredHackathons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHackathons.map(hackathon => (
              <HackathonCard key={hackathon._id} hackathon={hackathon} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No hackathons found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search term to find more hackathons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HackathonsPage;
