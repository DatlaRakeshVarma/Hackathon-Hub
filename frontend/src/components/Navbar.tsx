import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Menu, X } from 'lucide-react';
import AuthContext from '../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { isAuthenticated, isAdmin, logout } = useContext(AuthContext);

  return (
    <nav className="bg-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code2 className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">HackathonHub</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
              Home
            </Link>
            <Link to="/hackathons" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
              Hackathons
            </Link>
            <Link to="/submit" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
              Submit Hackathon
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
              About
            </Link>
            {isAuthenticated && isAdmin && (
              <Link to="/admin" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600"
              >
                Logout
              </button>
            ) : (
              <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600">
                Login
              </Link>
            )}
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/hackathons" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Hackathons
            </Link>
            <Link 
              to="/submit" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Submit Hackathon
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            {isAuthenticated && isAdmin && (
              <Link 
                to="/admin" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 w-full text-left"
              >
                Logout
              </button>
            ) : (
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;