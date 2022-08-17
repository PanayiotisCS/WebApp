import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import './temp.css';

import Login from './Screens/Login';
import Register from './Screens/Register';
import AdminLogin from './Admin/Screens/AdminLogin';
import { ProtectedRoute } from "./component/router/protected";
import Dashboard from "./Screens/Dashboard";
import Forms from "./Screens/Forms";
import AdminDashboard from "./Admin/Screens/AdminDashboard";


class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />}/>
        <Route path="admin" element={<AdminLogin />}/>
        <Route path="admin/Login" element={<AdminLogin />}/>

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
          path="/Forms" 
          element={
            // <ProtectedRoute />
            <ProtectedRoute> 
              <Forms />
            </ProtectedRoute>
          } 
        />
      </Routes>
      </BrowserRouter>
    ); 
  }
}
// function App() {
//   return (
//     <div className="App">
//         <Header />
//         <div className='students-background ui-g" tabIndex={"-1"}'>
//           <Login />
//         </div>
//         <Footer />
//       </div>
//   );
// };

export default App;
