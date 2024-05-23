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
  }, [selfVideoRef, remoteVideoRef, peerRef, setStream, setSelf, setIsCallEnded, setCall]);

  return (
    <>
      <section className="flex flex-col justify-center min-h-screen p-5 bg-slate-900">
        <div
          className={`bg-slate-100 grid ${
            call ? 'grid-cols-2' : 'grid-cols-1'
          } justify-items-center rounded-md`}
        >
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
        </div>
        <div className="flex justify-center bottom-10">
          {isCallAccepted && !isCallEnded ? (
            <div>
              <button className="btn" onClick={endCall}>
                End Call
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center">
              <div>
                <input type="text" value={remoteId} onChange={(e) => setRemoteId(e.target.value)} />
              </div>
              <div>
                <button className="justify-center btn" onClick={() => startCall(remoteId)}>
                  Call
                </button>
              </div>
            </div>
          )}

          {call && !isCallAccepted && (
            <div>
              <p>{call.remote.name} is calling...</p>
              <button onClick={acceptCall}>Accept</button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HomePage;
