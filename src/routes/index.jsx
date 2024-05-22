import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../views/HomePage';

import Login from '../views/Login';
import BaseLayout from '../views/BaseLayout';

const url = `http://localhost:3000`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/login',
    element: <Login url={url} />,
  },
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/home',
        element: <div>Home</div>,
      },
    ],
  },
]);

export default router;
