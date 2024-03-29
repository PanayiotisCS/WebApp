import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import './temp.css';

import Login from './Screens/Login';
import Register from './Screens/Register';
import AdminLogin from './Admin/Screens/AdminLogin';
import { ProtectedRoute } from "./component/router/protected";
import Dashboard from "./Screens/Dashboard";
import AdminDashboard from "./Admin/Screens/AdminDashboard";
import EditForm from "./component/EditForm";
import NotFound from "./Screens/NotFound";
import CompleteForm from "./component/CompleteForm";
import Settings from "./Admin/Screens/Settings";
import SettingsRegister from "./Admin/Screens/SettingsRegister";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="admin" element={<AdminLogin />} />
          <Route path="admin/Login" element={<AdminLogin />} />

          {/* Protected routes */}
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/Dashboard/Forms/:formId/edit"
            element={
              <ProtectedRoute>
                <EditForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Forms/:formId"
            element={
              <ProtectedRoute>
                <CompleteForm />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/Settings"
            element={
              <ProtectedRoute>
                  <Settings />
              </ProtectedRoute>
            }
          />
          <Route 
            path="/Settings/Register"
            element={
              <ProtectedRoute>
                  <SettingsRegister />
              </ProtectedRoute>
            }
          />
          <Route path="/Not-found" element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
