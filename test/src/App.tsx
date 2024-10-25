import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import AdminPanel from './pages/AdminPanel';
import Shop from './pages/Shop';
import NfcReader from './pages/NfcReader';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<NfcReader />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;