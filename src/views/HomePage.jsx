import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../contexts/socket';
import socket from '../lib/socket';

const HomePage = () => {
  const [remoteId, setRemoteId] = useState('');

  const {
    self,
    call,
    isCallAccepted,
    isCallEnded,
    selfVideoRef,
    remoteVideoRef,
    peerRef,
    startCall,
    acceptCall,
    endCall,
    toggleVideo,
    toggleAudio,
    setSelf,
    setStream,
    setCall,
    setIsCallEnded,
  } = useContext(SocketContext);

  useEffect(() => {
    socket.auth = {
      token: localStorage.getItem('token'),
    };

    socket.connect();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      selfVideoRef.current.srcObject = currentStream;
    });

    socket.on('self', ({ self }) => {
      setSelf(self);
    });

    socket.on('call:started', ({ remote, signal }) => {
      setCall({ remote, signal });
    });

    socket.on('call:ended', () => {
      setCall(null);
      setIsCallEnded(true);
      peerRef.current = null;
    });

    return () => {
      socket.off('self');
      socket.off('call:started');
      socket.off('call:accepted');
      socket.off('call:ended');
    };
  }, [selfVideoRef, remoteVideoRef, peerRef, setSelf, setStream, setCall, setIsCallEnded]);

  return (
    <div>
      {/* {stream && ( */}
      <div>
        <p>Name: {self?.name}</p>
        <p>ID: {self?.socketId}</p>
        <video ref={selfVideoRef} autoPlay muted />
        <button onClick={toggleVideo}>Toggle Video</button>
        <button onClick={toggleAudio}>Toggle Audio</button>
      </div>
      {/* )} */}

      {isCallAccepted && !isCallEnded && (
        <div>
          <p>Name: {call.remote.name}</p>
          <p>ID: {call.remote.socketId}</p>
          {/* {remoteVideoRef.current.srcObject ? ( */}
          {/* {!isRemoteVideoEnabled && <img src="https://i.pravatar.cc/300" alt="" />} */}
          <video ref={remoteVideoRef} autoPlay />
          {/* ) : (
            <img src="https://i.pravatar.cc/300" alt="" />
          )} */}
        </div>
      )}

      {isCallAccepted && !isCallEnded ? (
        <div>
          <button onClick={endCall}>End Call</button>
        </div>
      ) : (
        <div>
          <input type="text" value={remoteId} onChange={(e) => setRemoteId(e.target.value)} />
          <button onClick={() => startCall(remoteId)}>Call</button>
        </div>
      )}

      {isCallEnded && (
        <div>
          <button onClick={() => window.location.reload()}>Refresh ID</button>
        </div>
      )}

      {call && !isCallAccepted && (
        <div>
          <p>{call.remote.name} is calling...</p>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
