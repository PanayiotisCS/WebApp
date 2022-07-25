import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import './temp.css';

import Login from './Screens/Login';
import Register from './Screens/Register';
import { ProtectedRoute } from "./component/router/protected";
import Dashboard from "./Screens/Dashboard";

class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />}/>

        {/* Protected routes */}
        <Route
          path="Dashboard" 
          element={
            <ProtectedRoute />
            // <ProtectedRoute> 
            //   <Dashboard />
            // </ProtectedRoute>
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
