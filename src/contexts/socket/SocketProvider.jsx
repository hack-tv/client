import SocketContext from './SocketContext';

const SocketProvider = ({ children }) => {
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export default SocketProvider;
