import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomerRegistration from './components/CustomerRegister';
import AdminRegistration from './components/AdminRegister';
import AdminLogin from './components/AdminLogin';
import VerifyEmail from './components/VerifyEmail';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<CustomerRegistration />} />
         <Route path="/admin/register" element={<AdminRegistration />} />
         <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/verify-email" element={<VerifyEmail />} /> 
      </Routes>
    </Router>
  );
}

export default App;


 
