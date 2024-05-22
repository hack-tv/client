import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { SocketProvider } from './contexts/socket';
import router from './routes';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <SocketProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </SocketProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
