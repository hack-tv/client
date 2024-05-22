import { useContext, useEffect, useState } from 'react';

import { SocketContext } from '../contexts/socket';

const HomePage = () => {
  const [remoteId, setRemoteId] = useState('');

  const {
    selfId,
    // stream,
    call,
    isCallAccepted,
    isCallEnded,
    selfVideoRef,
    remoteVideoRef,
    startCall,
    acceptCall,
    endCall,
  } = useContext(SocketContext);

  useEffect(() => {
    console.log(selfVideoRef.current, '<<< ini selfVideoRef');
    console.log(remoteVideoRef.current, '<<< ini remoteVideoRef');
  }, [selfVideoRef, remoteVideoRef]);

  return (
    <div>
      {/* {stream && ( */}
      <div>
        <p>{selfId}</p>
        {/* {selfVideoRef.current.srcObject ? ( */}
        <video ref={selfVideoRef} autoPlay />
        {/* ) : (
          <img src="https://i.pravatar.cc/300" alt="" />
        )} */}
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
