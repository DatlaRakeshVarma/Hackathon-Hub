import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Search, Award, Shield, Mail } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">About HackathonHub</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting students with hackathons at regional engineering colleges across and beyond.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              HackathonHub was created with a simple mission: to make it easier for students to discover and participate in hackathons happening at regional engineering colleges, with a special focus on Visakhapatnam.
            </p>
            <p className="text-gray-600 mb-4">
              We believe that hackathons are incredible opportunities for students to learn new skills, build innovative projects, network with peers and industry professionals, and showcase their talents.
            </p>
            <p className="text-gray-600">
              By creating a centralized platform for hackathon discovery, we aim to increase participation and foster a vibrant tech community among engineering colleges in the region.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What We Offer</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Hackathon Discovery</h3>
              <p className="text-gray-600">
                Find hackathons happening at engineering colleges in Visakhapatnam and nearby regions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">College Submissions</h3>
              <p className="text-gray-600">
                Colleges can submit their hackathons for review and get them listed on our platform.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Detailed Information</h3>
              <p className="text-gray-600">
                Get comprehensive details about each hackathon, including prizes, eligibility, and deadlines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Verification</h3>
              <p className="text-gray-600">
                We verify all hackathons to ensure they are legitimate and organized by recognized institutions.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-indigo-50 rounded-lg p-8 mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">For Colleges and Universities</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 mb-4">
                If you're organizing a hackathon at your college or university, we'd love to help you reach a wider audience of talented participants.
              </p>
              <p className="text-gray-600 mb-6">
                Submitting your hackathon to HackathonHub is free and easy. Simply fill out our submission form with all the details about your event, and our team will review it. Once approved, your hackathon will be listed on our platform with a verified badge.
              </p>
              <Link
                to="/submit"
                className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors inline-block"
              >
                Submit Your Hackathon
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="College hackathon"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Us</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Have questions, suggestions, or feedback? We'd love to hear from you! Reach out to our team using the contact information below.
          </p>
          
          <div className="inline-flex items-center justify-center bg-white px-6 py-4 rounded-lg shadow-md">
            <Mail className="h-6 w-6 text-indigo-600 mr-3" />
            <span className="text-gray-800 font-medium">contact@hackathonhub.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;