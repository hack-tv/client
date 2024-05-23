import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <main className="flex items-center justify-center min-h-screen p-4 bg-slate-100">
      <Outlet />
    </main>
  );
};

export default AuthLayout;
