import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Processing...');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    if (token) {
      fetch(`/api/auth/verify-email?token=${token}`)
        .then(response => response.json())
        .then(data => {
          setMessage(data.message);
          if (data.success) {
            setTimeout(() => {
              navigate('/login?verification=success');
            }, 3000); // Wait 3 seconds before redirecting
          }
        })
        .catch(error => {
          console.error('Error during email verification:', error);
          setMessage('An error occurred. Please try again later.');
        });
    } else {
      setMessage('No verification token found.');
    }
  }, [location.search, navigate]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;
