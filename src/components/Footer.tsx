import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center mb-4">
              <Code2 className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">HackathonHub</span>
            </Link>
            <p className="text-gray-300 text-sm">
              Connecting students with hackathons across regional engineering colleges.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white text-sm">Home</Link>
              </li>
              <li>
                <Link to="/hackathons" className="text-gray-300 hover:text-white text-sm">Hackathons</Link>
              </li>
              <li>
                <Link to="/submit" className="text-gray-300 hover:text-white text-sm">Submit Hackathon</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">About Us</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white text-sm">FAQ</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm">Terms of Service</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@hackathonhub.com</span>
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center text-gray-300 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Visakhapatnam, Andhra Pradesh</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6">
          <p className="text-center text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} HackathonHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;