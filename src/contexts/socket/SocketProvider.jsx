import { useState, useRef, useEffect } from 'react';
import Peer from 'simple-peer';

import SocketContext from './SocketContext';
import socket from '../../lib/socket';

const SocketProvider = ({ children }) => {
  const [selfId, setselfId] = useState(null);
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState(null);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);

  const selfVideoRef = useRef({ srcObject: null });
  const remoteVideoRef = useRef({ srcObject: null });
  const peerRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      selfVideoRef.current.srcObject = currentStream;
    });

    socket.on('self', (id) => {
      setselfId(id);
      // console.log(id);
    });

    socket.on('call:started', ({ remoteId, signal }) => {
      // console.log({ remoteId }, '<<< ini call:started');
      setCall({ remoteId, signal });
    });

    socket.on('call:ended', () => {
      // console.log('<<< ini call:ended');
      setIsCallEnded(true);
      // window.location.reload();
    });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const startCall = (remoteId) => {
    // console.log(stream, '<<< ini stream');
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (signal) => {
      socket.emit('call:start', { selfId, remoteId, signal });
    });

    peer.on('stream', (currentStream) => {
      remoteVideoRef.current.srcObject = currentStream;
    });

    socket.on('call:accepted', ({ remoteId, signal }) => {
      peer.signal(signal);
      setCall({ remoteId, signal });
      setIsCallAccepted(true);
    });

    peerRef.current = peer;
  };

  const acceptCall = () => {
    // console.log(stream, '<<< ini stream');
    setIsCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (signal) => {
      socket.emit('call:accept', { selfId, remoteId: call.remoteId, signal });
    });

    peer.on('stream', (currentStream) => {
      remoteVideoRef.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    peerRef.current = peer;
  };

  const endCall = () => {
    setIsCallEnded(true);
    socket.emit('call:end', { remoteId: call.remoteId });
    // window.location.reload();
  };

  return (
    <SocketContext.Provider
      value={{
        selfId,
        stream,
        call,
        isCallAccepted,
        isCallEnded,
        selfVideoRef,
        remoteVideoRef,
        startCall,
        acceptCall,
        endCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
