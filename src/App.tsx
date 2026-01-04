import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import InspectionForm from './components/InspectionForm';
import InspectionList from './components/InspectionList';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-blue-600">QualiGuard</span>
              </div>
              <div className="flex space-x-8">
                <Link 
                  to="/" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  📊 Dashboard
                </Link>
                <Link 
                  to="/inspections" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  📋 Inspections
                </Link>
                <Link 
                  to="/create" 
                  className="flex items-center px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
                >
                  ✅ Create Audit
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="py-8">
          <Routes>
            <Route path="/" element={<InspectionList />} />
            <Route path="/inspections" element={<InspectionList />} />
            <Route path="/create" element={<InspectionForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;