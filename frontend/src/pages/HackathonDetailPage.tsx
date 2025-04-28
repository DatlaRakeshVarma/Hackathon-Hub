import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Tag, Award, Link as LinkIcon, Clock, Info } from 'lucide-react';
import { formatDate, getStatusColor, getDeadlineColor, calculateStatus } from '../utils/helpers';

const HackathonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [hackathon, setHackathon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathons/${id}`);
        if (!response.ok) {
          throw new Error('Hackathon not found');
        }
        const data = await response.json();
        setHackathon(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching hackathon:', error);
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);
  
  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }
  
  if (!hackathon) {
    return (
      <div className="py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Hackathon Not Found</h2>
        <p className="text-gray-600 mb-8">The hackathon you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/hackathons"
          className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
        >
          Browse Hackathons
        </Link>
      </div>
    );
  }
  
  const currentStatus = calculateStatus(hackathon.startDate, hackathon.endDate);
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            to="/hackathons"
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Hackathons
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="relative h-64 md:h-96">
            <img
              src={hackathon.image}
              alt={hackathon.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
                {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
              </span>
            </div>
            {hackathon.isVerified && (
              <div className="absolute top-4 left-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Verified
              </div>
            )}
          </div>
          
          <div className="p-6 md:p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{hackathon.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>{hackathon.college}, {hackathon.district}, {hackathon.state}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
                </div>
                
                <div className="flex items-center mb-3">
                  <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                  <span className={getDeadlineColor(hackathon.registrationDeadline)}>
                    Registration Deadline: {formatDate(hackathon.registrationDeadline)}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <Users className="h-5 w-5 mr-2 text-indigo-600" />
                  <span>Team Size: {hackathon.teamSize.min}-{hackathon.teamSize.max} members</span>
                </div>
                
                {hackathon.website && (
                  <div className="flex items-center text-gray-600">
                    <LinkIcon className="h-5 w-5 mr-2 text-indigo-600" />
                    <a
                      href={hackathon.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 hover:underline"
                    >
                      Visit Official Website
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col justify-center">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Registration Status</h3>
                  {currentStatus === 'upcoming' ? (
                    <div>
                      <p className="text-gray-600 mb-4">
                        Registration is open until {formatDate(hackathon.registrationDeadline)}.
                      </p>
                      <a
                        href={hackathon.website || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors inline-block"
                      >
                        Register Now
                      </a>
                    </div>
                  ) : currentStatus === 'ongoing' ? (
                    <p className="text-gray-600">
                      This hackathon is currently in progress. Registration is closed.
                    </p>
                  ) : (
                    <p className="text-gray-600">
                      This hackathon has ended. Registration is closed.
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <Info className="h-5 w-5 mr-2 text-indigo-600" />
                About the Hackathon
              </h2>
              <p className="text-gray-600 whitespace-pre-line">{hackathon.description}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-indigo-600" />
                  Eligibility
                </h2>
                <p className="text-gray-600 whitespace-pre-line">{hackathon.eligibility}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-indigo-600" />
                  Prizes
                </h2>
                <p className="text-gray-600 whitespace-pre-line">{hackathon.prizes}</p>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <Tag className="h-5 w-5 mr-2 text-indigo-600" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {hackathon.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackathonDetailPage;
