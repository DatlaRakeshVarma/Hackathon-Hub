import React, { useState, useEffect, useContext } from 'react';
import { Calendar, MapPin, Users, Tag, Clock } from 'lucide-react';
import { formatDate, getStatusColor } from '../utils/helpers';
import AuthContext from '../context/AuthContext';

interface Hackathon {
  _id: string;
  title: string;
  college: string;
  state: string;
  district: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  description: string;
  eligibility: string;
  prizes: string;
  teamSize: {
    min: number;
    max: number;
  };
  tags: string[];
  website?: string;
  image: string;
  status: string;
  isVerified: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

const AdminPage: React.FC = () => {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPendingHackathons = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathons/pending`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch pending hackathons');
        }
        const data = await response.json();
        setHackathons(data);
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching pending hackathons:', error);
        setError(error.message || 'An error occurred while fetching hackathons');
        setLoading(false);
      }
    };
    fetchPendingHackathons();
  }, [token]);

  const handleApprove = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathons/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to approve hackathon');
      }
      setHackathons(hackathons.filter(hackathon => hackathon._id !== id));
    } catch (error: any) {
      console.error('Error approving hackathon:', error);
      setError('Failed to approve hackathon');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathons/${id}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error('Failed to reject hackathon');
      }
      setHackathons(hackathons.filter(hackathon => hackathon._id !== id));
    } catch (error: any) {
      console.error('Error rejecting hackathon:', error);
      setError('Failed to reject hackathon');
    }
  };

  if (loading) {
    return <div className="py-16 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="py-16 text-center">
        <h3 className="text-lg font-medium text-red-600 mb-2">Error</h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin - Pending Hackathons</h1>
        
        {hackathons.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No pending hackathons</h3>
            <p className="text-gray-500">All submissions have been reviewed.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {hackathons.map(hackathon => (
              <div key={hackathon._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">{hackathon.title}</h2>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(hackathon.status)}`}>
                    {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                  <div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>{hackathon.college}, {hackathon.district}, {hackathon.state}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Clock className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>Registration Deadline: {formatDate(hackathon.registrationDeadline)}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <Users className="h-5 w-5 mr-2 text-indigo-600" />
                      <span>Team Size: {hackathon.teamSize.min}-{hackathon.teamSize.max} members</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600 mb-2"><strong>Description:</strong> {hackathon.description}</p>
                    <p className="text-gray-600 mb-2"><strong>Eligibility:</strong> {hackathon.eligibility}</p>
                    <p className="text-gray-600 mb-2"><strong>Prizes:</strong> {hackathon.prizes}</p>
                    <div className="flex flex-wrap gap-2">
                      {hackathon.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                        >
                          <Tag className="h-4 w-4 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h3>
                  <p className="text-gray-600 mb-1"><strong>Name:</strong> {hackathon.contactName}</p>
                  <p className="text-gray-600 mb-1"><strong>Email:</strong> {hackathon.contactEmail}</p>
                  <p className="text-gray-600 mb-1"><strong>Phone:</strong> {hackathon.contactPhone}</p>
                  {hackathon.website && (
                    <p className="text-gray-600">
                      <strong>Website:</strong>{' '}
                      <a href={hackathon.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
                        {hackathon.website}
                      </a>
                    </p>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end gap-4">
                  <button
                    onClick={() => handleApprove(hackathon._id)}
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(hackathon._id)}
                    className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;