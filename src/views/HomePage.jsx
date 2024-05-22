import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../contexts/socket';
import socket from '../lib/socket';

const HomePage = () => {
  const [remoteId, setRemoteId] = useState('');

  const {
    selfId,
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
    setSelfId,
    setStream,
    setCall,
    setIsCallEnded,
  } = useContext(SocketContext);

  useEffect(() => {
    socket.connect();

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      selfVideoRef.current.srcObject = currentStream;
    });

    socket.on('self', (id) => {
      setSelfId(id);
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

    return () => {
      socket.off('self');
      socket.off('call:started');
      socket.off('call:accepted');
      socket.off('call:ended');
    };
  }, [selfVideoRef, remoteVideoRef, setStream, setSelfId, setIsCallEnded, setCall]);

  return (
    <div>
      {/* {stream && ( */}
      <div>
        <p>{selfId}</p>
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
          <p>{call.remoteId}</p>
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
          <p>{call.selfId} is calling...</p>
          <button onClick={acceptCall}>Accept</button>
        </div>
      )}
    </div>
  );
};

export default HomePage;
