import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import HackathonsPage from './pages/HackathonsPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import SubmitHackathonPage from './pages/SubmitHackathonPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/hackathons" element={<HackathonsPage />} />
              <Route path="/hackathons/:id" element={<HackathonDetailPage />} />
              <Route path="/submit" element={<SubmitHackathonPage />} />
              <Route path="/admin" element={<PrivateRoute element={<AdminPage />} />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/faq" element={<div>FAQ Page (Placeholder)</div>} />
              <Route path="/privacy" element={<div>Privacy Policy Page (Placeholder)</div>} />
              <Route path="/terms" element={<div>Terms of Service Page (Placeholder)</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;