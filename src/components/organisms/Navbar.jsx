// import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import socket from '../../lib/socket';

const Navbar = () => {
  const navigate = useNavigate();

  function handleLogout() {
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
