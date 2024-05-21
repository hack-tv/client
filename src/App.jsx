import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { SocketProvider } from './contexts/socket';
import router from './routes';

const App = () => {
  return (
    <SocketProvider>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-center" />
    </SocketProvider>
  );
};

export default App;
