import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Leaves from './pages/Leaves';
import CalendarPage from './pages/CalendarPage';
import Salary from './pages/Salary';

import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/" element={<Layout />}>
            <Route index element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="employees" element={
              <ProtectedRoute roles={['admin', 'team_lead']}>
                <Employees />
              </ProtectedRoute>
            } />

            <Route path="attendance" element={
              <ProtectedRoute>
                <Attendance />
              </ProtectedRoute>
            } />

            <Route path="leaves" element={
              <ProtectedRoute>
                <Leaves />
              </ProtectedRoute>
            } />

            <Route path="calendar" element={
              <ProtectedRoute>
                <CalendarPage />
              </ProtectedRoute>
            } />

            <Route path="salary" element={
              <ProtectedRoute>
                <Salary />
              </ProtectedRoute>
            } />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
