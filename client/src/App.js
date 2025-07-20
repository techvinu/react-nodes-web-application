import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Users from './components/Users';
import UserForm from './components/UserForm';
import NotFound from './components/NotFound';
import LoadingSpinner from './components/LoadingSpinner';
import { healthCheck } from './services/api';

function App() {
  // Health check query to verify backend connection
  const { data: healthData, isLoading: healthLoading, error: healthError } = useQuery(
    'health',
    healthCheck,
    {
      retry: 3,
      retryDelay: 1000,
    }
  );

  // Show loading spinner while checking backend health
  if (healthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Connecting to server...</p>
        </div>
      </div>
    );
  }

  // Show error if backend is not available
  if (healthError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Server Connection Error</h1>
          <p className="text-gray-600 mb-4">
            Unable to connect to the backend server. Please make sure the server is running.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header healthData={healthData} />
      
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home healthData={healthData} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/new" element={<UserForm />} />
          <Route path="/users/:id/edit" element={<UserForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
