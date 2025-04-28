import React, { useState } from 'react';
import HackathonForm from '../components/HackathonForm';
import { HackathonSubmission } from '../types';

const SubmitHackathonPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (data: HackathonSubmission) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/hackathons/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit hackathon');
      }
      
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting hackathon:', error);
    }
  };
  
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Thank You for Your Submission!</h2>
            <p className="text-green-700 mb-4">
              Your hackathon has been submitted for review. Our team will verify the details and publish it on the platform soon.
            </p>
            <p className="text-green-700 mb-6">
              You will receive a confirmation email once your hackathon is approved and published.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-4 py-2 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Submit Another Hackathon
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Submit Your Hackathon</h1>
              <p className="text-gray-600">
                Are you organizing a hackathon at your college? Fill out the form below to submit your hackathon for review.
                Once approved, your hackathon will be listed on our platform for students to discover and participate.
              </p>
            </div>
            
            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-indigo-800 mb-3">Submission Guidelines</h2>
              <ul className="list-disc list-inside text-indigo-700 space-y-2">
                <li>Provide accurate and complete information about your hackathon.</li>
                <li>Ensure that the hackathon is organized by or affiliated with a recognized educational institution.</li>
                <li>Include clear eligibility criteria and prize details.</li>
                <li>Submit your hackathon at least 2 weeks before the registration deadline.</li>
                <li>Our team will review your submission and may contact you for additional information if needed.</li>
              </ul>
            </div>
            
            <HackathonForm onSubmit={handleSubmit} />
          </>
        )}
      </div>
    </div>
  );
};

export default SubmitHackathonPage;
