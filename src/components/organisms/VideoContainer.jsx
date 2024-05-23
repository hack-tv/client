import { useContext } from 'react';

import { CallContext } from '../../contexts/call';
import { VideoCard } from '../molecules';

const VideoContainer = () => {
  const {
    self,
    remoteId,
    call,
    isCalling,
    isCallAccepted,
    isCallEnded,
    selfVideoRef,
    remoteVideoRef,
  } = useContext(CallContext);

  return (
    <section
      className={`grid gap-4 ${call || isCalling ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}
    >
      {self && (
        <VideoCard
          ref={selfVideoRef}
          id={self.socketId}
          name={self.name}
          isIdle={!call && !isCalling}
          isMuted
        />
      )}

      {call && isCallAccepted && !isCallEnded && (
        <VideoCard
          ref={remoteVideoRef}
          id={call.remote.socketId}
          name={call.remote.name}
          isIdle={false}
          isMuted={false}
        />
      )}

      {isCalling && !isCallAccepted && (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 bg-gradient-to-r from-orange-600 to-orange-400 text-base-100 card animate-pulse">
          <img src="/pikachu-loading.gif" alt="Loading" width={160} />
          <p className="font-bold">Calling {remoteId}...</p>
        </div>
      )}

      {call && !isCallAccepted && (
        <div className="flex flex-col items-center justify-center gap-2 px-4 py-8 bg-gradient-to-r from-orange-600 to-orange-400 text-base-100 card animate-pulse">
          <img src="/pikachu-loading.gif" alt="Loading" width={160} />
          <p className="font-bold">{call.remote.name} is calling...</p>
        </div>
      )}
    </section>
  );
};

export default VideoContainer;
