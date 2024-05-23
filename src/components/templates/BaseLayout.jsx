import { Outlet } from 'react-router-dom';

import { Navbar } from '../organisms';

const BaseLayout = () => {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-50 shadow-xl bg-slate-800/[0.9] text-base-100 backdrop-blur">
        <Navbar />
      </header>
      <main className="max-w-screen-xl p-4 mx-auto min-h-dvh">
        <Outlet />
      </main>
    </div>
  );
};

export default BaseLayout;
