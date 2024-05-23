import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { SocketContext } from '../../contexts/socket';
import socket from '../../lib/socket';

const Navbar = () => {
  const navigate = useNavigate();

  const { stream, call, endCall } = useContext(SocketContext);

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
    <nav className="flex flex-row justify-between p-5 bg-gray-100">
      <div>Home</div>
      <div>
        <Link onClick={handleLogout}>Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
