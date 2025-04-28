import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Award, Users, ArrowRight } from 'lucide-react';
import HackathonCard from '../components/HackathonCard';

const HomePage: React.FC = () => {
  const [upcomingHackathons, setUpcomingHackathons] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUpcomingHackathons = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathons`);
        if (!response.ok) {
          throw new Error('Failed to fetch hackathons');
        }
        const data = await response.json();
        // Filter for verified hackathons with status 'upcoming' and take up to 3
        const upcoming = data
          .filter((hackathon: any) => hackathon.status === 'upcoming' && hackathon.isVerified)
          .slice(0, 3);
        setUpcomingHackathons(upcoming);
      } catch (error: any) {
        console.error('Error fetching upcoming hackathons:', error);
        setError('Failed to load upcoming hackathons');
      }
    };
    fetchUpcomingHackathons();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Hackathons at Regional Engineering Colleges
              </h1>
              <p className="text-lg mb-8 text-indigo-100">
                Find and participate in exciting hackathons happening at engineering colleges across and beyond.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/hackathons"
                  className="px-6 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-indigo-50 transition-colors"
                >
                  Browse Hackathons
                </Link>
                <Link
                  to="/submit"
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md border border-indigo-300 hover:bg-indigo-500 transition-colors"
                >
                  Submit Your Hackathon
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Students at hackathon"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Why Use HackathonHub?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Find Hackathons</h3>
              <p className="text-gray-600">
                Discover hackathons happening at engineering colleges.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Stay Updated</h3>
              <p className="text-gray-600">
                Get information about upcoming hackathons, registration deadlines, and event details.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Win Prizes</h3>
              <p className="text-gray-600">
                Participate in hackathons with exciting prizes, networking opportunities, and learning experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Hackathons Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Upcoming Hackathons</h2>
            <Link
              to="/hackathons"
              className="flex items-center text-indigo-600 hover:text-indigo-800 font-medium"
            >
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          {error ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
              <p className="text-gray-500">{error}</p>
            </div>
          ) : upcomingHackathons.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming hackathons</h3>
              <p className="text-gray-500">Check back later for new hackathons!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingHackathons.map(hackathon => (
                <HackathonCard key={hackathon._id} hackathon={hackathon} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* For Colleges Section */}
      <section className="py-16 bg-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4 text-gray-800">For Colleges and Universities</h2>
              <p className="text-lg mb-6 text-gray-600">
                Are you organizing a hackathon at your college? Submit your event details to reach a wider audience and attract talented participants.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-600">Increase visibility for your hackathon</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-600">Attract diverse and talented participants</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">✓</div>
                  <span className="ml-3 text-gray-600">Get verified status for credibility</span>
                </li>
              </ul>
              <Link
                to="/submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors inline-flex items-center"
              >
                Submit Your Hackathon
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="College hackathon"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-700 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Participate in a Hackathon?</h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto">
            Browse through our collection of hackathons happening at engineering colleges. Find the perfect hackathon that matches your skills and interests.
          </p>
          <Link
            to="/hackathons"
            className="px-8 py-3 bg-white text-indigo-700 font-medium rounded-md hover:bg-indigo-50 transition-colors inline-flex items-center"
          >
            <Users className="h-5 w-5 mr-2" />
            Find a Hackathon
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
