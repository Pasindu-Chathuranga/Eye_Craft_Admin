import './App.css'; 
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import OrderPage from './pages/OrderPage';

const App = () => {
  const isLoggedIn = sessionStorage.getItem('adminToken');

  return (
    <Router>
      <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/orders" element={<OrderPage /> } />
          <Route path="*" element={<Navigate to="/dashboard" />} /> 
      </Routes>
    </Router>
  );
};

export default App;
