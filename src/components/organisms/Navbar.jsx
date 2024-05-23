import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { CallContext } from '../../contexts/call';
import socket from '../../lib/socket';

const Navbar = () => {
  const { stream, call, endCall } = useContext(CallContext);

  const navigate = useNavigate();

  function handleLogout() {
    if (call) {
      endCall();
    }

    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    socket.disconnect();
    localStorage.removeItem('token');
    toast.success('Successfully logged out');
    navigate('/login');
  }
  return (
    <nav className="max-w-screen-xl px-4 mx-auto navbar">
      <div className="navbar-start">
        <Link to="/" className="text-xl btn btn-ghost">
          <img src="/hack-tv.png" alt="Logo" width={40} />
          <span className="ml-1">Hack TV</span>
        </Link>
      </div>
      <div className="navbar-end">
        <button className="text-base-100 btn btn-error" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
