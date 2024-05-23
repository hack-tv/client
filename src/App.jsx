import { GoogleOAuthProvider } from '@react-oauth/google';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { CallProvider } from './contexts/call';
import router from './routes';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <CallProvider>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </CallProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
