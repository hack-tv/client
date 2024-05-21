import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Nav() {
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem(`access_token`);
    toast.success(`Success logout`, { position: 'bottom-right' });
    navigate('/login');
  }
  return (
    <>
      <nav className="bg-gray-100 flex flex-row justify-between p-5">
        <div>Home</div>
        <div>
          <Link onClick={handleLogout}>Logout</Link>
        </div>
      </nav>
    </>
  );
}
