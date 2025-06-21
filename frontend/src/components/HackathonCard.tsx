import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Hackathon } from '../types';
import { formatDate, getStatusColor, getDeadlineColor, calculateStatus } from '../utils/helpers';

interface HackathonCardProps {
  hackathon: Hackathon;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon }) => {
  const currentStatus = calculateStatus(hackathon.startDate, hackathon.endDate);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={hackathon.image} 
          alt={hackathon.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 right-0 m-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(currentStatus)}`}>
            {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
          </span>
        </div>
        {hackathon.isVerified && (
          <div className="absolute top-0 left-0 m-2 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
            Verified
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">{hackathon.title}</h3>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{hackathon.college}, {hackathon.district}, {hackathon.state}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <Users className="h-4 w-4 mr-1" />
          <span>Team Size: {hackathon.teamSize.min}-{hackathon.teamSize.max} members</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mt-3 mb-4">
          {hackathon.tags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-flex items-center bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full"
            >
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
          {hackathon.tags.length > 3 && (
            <span className="inline-flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
              +{hackathon.tags.length - 3}
            </span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {hackathon.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-sm ${getDeadlineColor(hackathon.registrationDeadline)}`}>
            Registration ends: {formatDate(hackathon.registrationDeadline)}
          </span>
          <Link 
            to={`/hackathons/${hackathon._id}`}
            className="px-3 py-1 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HackathonCard;