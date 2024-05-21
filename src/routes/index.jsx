import { createBrowserRouter } from 'react-router-dom';

import Login from '../views/Login';
import BaseLayout from '../views/BaseLayout';

const url = `http://localhost:3000`;

const router = createBrowserRouter([
  {
    path: '/',
    element: <div>Hello, World!</div>,
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
