import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import WaitlistForm from './components/WaitlistForm';
import Footer from './components/Footer';
import TaskDashboard from './components/TaskDashboard';
import LoginPage from './components/LoginPage';

// Helper to ensure page starts at top on transition
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout for public pages
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-black text-white selection:bg-neon-teal selection:text-black">
    <Navbar />
    <main className="min-h-[calc(100vh-80px)]">
      {children}
    </main>
    <Footer />
  </div>
);

// Protected Route check
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('user');
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return (
    <div className="min-h-screen bg-black text-white selection:bg-neon-teal selection:text-black">
      {children}
    </div>
  );
};

const LandingPage = () => (
  <>
    <Hero />
    <Features />
    <HowItWorks />
    <Testimonials />
    <WaitlistForm />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={
          <PublicLayout>
            <LandingPage />
          </PublicLayout>
        } />

        {/* Auth Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Dashboard */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <TaskDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
