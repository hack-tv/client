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
      console.log(self);
      // console.log(id);
    });

    socket.on('call:started', ({ remote, signal }) => {
      // console.log({ remoteId }, '<<< ini call:started');
      setCall({ remote, signal });
    });

    socket.on('call:ended', () => {
      // console.log('<<< ini call:ended');
      setIsCallEnded(true);
      // window.location.reload();
    });

    return () => {
      socket.off('self');
      socket.off('call:started');
      socket.off('call:accepted');
      socket.off('call:ended');
    };
  }, [selfVideoRef, remoteVideoRef, setStream, setSelf, setIsCallEnded, setCall]);

  return (
    <div>
      {/* {stream && ( */}
      <div>
        <p>Name: {self?.name}</p>
        <p>ID: {self?.socketId}</p>
        {/* {selfVideoRef.current.srcObject ? ( */}
        <video ref={selfVideoRef} autoPlay muted />
        {/* ) : (
          <img src="https://i.pravatar.cc/300" alt="" />
        )} */}
        <button onClick={toggleVideo}>Toggle Video</button>
        <button onClick={toggleAudio}>Toggle Audio</button>
      </div>
      {/* )} */}

      {isCallAccepted && !isCallEnded && (
        <div>
          <p>Name: {call.remote.name}</p>
          <p>ID: {call.remote.socketId}</p>
          {/* {remoteVideoRef.current.srcObject ? ( */}
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
