import { createBrowserRouter, redirect } from 'react-router-dom';

import { AuthLayout, BaseLayout } from '../components/templates';
import RegisterPage from '../views/RegisterPage';
import LoginPage from '../views/LoginPage';
import HomePage from '../views/HomePage';

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    loader: () => (localStorage.getItem('token') ? redirect('/') : null),
    children: [
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
  {
    element: <BaseLayout />,
    loader: () => (!localStorage.getItem('token') ? redirect('/login') : null),
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
