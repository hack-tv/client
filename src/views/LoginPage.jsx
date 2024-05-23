// import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../lib/axios';

const LoginPage = () => {
  // const [email, setEmail] = useState();
  // const [password, setPassword] = useState();

  const navigate = useNavigate();

  // const handleDefaultLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const { data } = await axios.post('/login', { email, password });

  //     localStorage.setItem('token', data.token);
  //     toast.success('Successfully logged in');
  //     navigate('/');
  //   } catch (error) {
  //     toast.error(error.response.data.message);
  //   }
  // };

  const handleGoogleLogin = async (response) => {
    try {
      const { data } = await axios.get('/auth/google', {
        headers: {
          token: response.credential,
          'ngrok-skip-browser-warning': 'true',
        },
      });

      localStorage.setItem('token', data.access_token);
      toast.success('Successfully logged in');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-900 dark">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-white">Login</h2>
          <p className="mt-2 text-center text-gray-400">Access your account</p>
          <form className="mt-4">
            <div className="flex flex-col mb-4">
              <label className="text-gray-300" htmlFor="login">
                Login
              </label>
              <input
                className="px-3 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                id="login"
                placeholder="Enter your login"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                className="px-3 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                id="password"
                placeholder="Enter your password"
                required
                type="password"
              />
            </div>
            <button
              className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <div className="flex justify-center pt-5">
            <GoogleLogin onSuccess={handleGoogleLogin} onError={(error) => console.log(error)} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
