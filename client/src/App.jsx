import React from 'react';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Home from './Pages/Home';
import Properties from './Pages/Properties';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Update from './Pages/Update';
import PropertyForm from './Pages/PropertyForm';

const App = () => {
  // Function to check if user is logged in
  const isLoggedIn = () => {
    // Check if userID is present in local storage
    const userID = localStorage.getItem('userID');
    return userID !== null;
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/properties' element={<Properties />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {/* Dashboard route with conditional navigation */}
          <Route
            path='/dashboard'
            element={isLoggedIn() ? <Dashboard /> : <Navigate to='/' replace />}
          />
          <Route
            path='/addproperty'
            element={
              isLoggedIn() ? <PropertyForm /> : <Navigate to='/' replace />
            }
          />
          <Route
            path='/update/:id'
            element={isLoggedIn() ? <Update /> : <Navigate to='/' replace />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
