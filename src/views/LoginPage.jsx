import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';

import axios from '../lib/axios';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const navigate = useNavigate();

  const handleDefaultLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/auth/login', form);

      localStorage.setItem('token', data.access_token);
      toast.success('Successfully logged in');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleGoogleLogin = async (response) => {
    try {
      const { data } = await axios.get('/auth/google', {
        headers: {
          token: response.credential,
        },
      });

      localStorage.setItem('token', data.access_token);
      toast.success('Successfully logged in');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    document.title = 'Login | Hack TV';
  }, []);

  return (
    <section className="flex flex-col w-full gap-4 p-8 mx-auto border-2 bg-base-100 max-w-[30rem] card">
      <div className="text-center">
        <h1 className="mb-1 text-2xl font-bold">
          Login to <span className="text-orange-600">Hack TV</span>
        </h1>
        <small>Enter your email and password to login.</small>
      </div>

      <form onSubmit={handleDefaultLogin} className="flex flex-col gap-2">
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            className="w-full input input-bordered"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
          />
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            className="w-full input input-bordered"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          />
        </label>
        <button type="submit" className="my-2 btn btn-success text-base-100">
          Login
        </button>
      </form>

      <small className="text-center">
        Don&apos;t have an account?{' '}
        <Link to="/register" className="text-orange-600 link link-hover">
          Register here
        </Link>
      </small>

      <div className="divider">OR</div>

      <div className="flex justify-center">
        <GoogleLogin onSuccess={handleGoogleLogin} />
      </div>
    </section>
  );
};

export default LoginPage;
