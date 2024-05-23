import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../lib/axios';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await axios.post(`/auth/register`, form);

      toast.success('Successfully registered new account');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    document.title = 'Register | Hack TV';
  }, []);

  return (
    <section className="flex flex-col w-full gap-4 p-8 mx-auto border-2 bg-base-100 max-w-[30rem] card">
      <div className="text-center">
        <h1 className="mb-1 text-2xl font-bold">
          Register to <span className="text-orange-600">Hack TV</span>
        </h1>
        <small>Enter your name, email, and password to register. </small>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-2">
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            className="w-full input input-bordered"
            value={form.name}
            onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          />
        </label>
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
          Register
        </button>
      </form>

      <small className="text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-orange-600 link link-hover">
          Login here
        </Link>
      </small>
    </section>
  );
};

export default RegisterPage;
