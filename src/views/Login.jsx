import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Login({ url }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const dataAdded = {
    email,
    password,
  };

  async function handleLogin(e) {
    e.preventDefault();
    try {
    } catch (error) {
      console.log(error);
    }
  }

  async function handleCredentialResponse(response) {
    // console.log('Encoded JWT ID token: ' + response.credential);
    const googleToken = response.credential;
    // console.log(googleToken);
    try {
      const { data } = await axios.post(`${url}/login/google`, { googleToken });

      // console.log(data);
      localStorage.setItem(`access_token`, data.access_token);

      toast.success(`Success login`, { position: 'bottom-right' });

      navigate('/home');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        '719021632539-npv9j5mdir48am9ujo0hlf749jg48pfg.apps.googleusercontent.com',
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById('buttonDiv'),
      { theme: 'outline', size: 'large' } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, []);
  return (
    <>
      <div className="dark min-h-screen flex items-center justify-center bg-gray-900">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-white text-center">
            Login
          </h2>
          <p className="mt-2 text-center text-gray-400">Access your account</p>
          <form onSubmit={handleLogin} className="mt-4">
            <div className="flex flex-col mb-4">
              <label className="text-gray-300" htmlFor="login">
                Login
              </label>
              <input
                className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                id="login"
                placeholder="Enter your login"
                required
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="text-gray-300" htmlFor="password">
                Password
              </label>
              <input
                className="px-3 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                id="password"
                placeholder="Enter your password"
                required
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <button
              className="w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <div className="flex justify-center pt-5">
            <div id="buttonDiv"></div>
          </div>
        </div>
      </div>
    </>
  );
}
