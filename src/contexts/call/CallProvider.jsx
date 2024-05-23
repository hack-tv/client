import { useState, useRef } from 'react';
import Peer from 'simple-peer';

import CallContext from './CallContext';
import socket from '../../lib/socket';

const CallProvider = ({ children }) => {
  const [self, setSelf] = useState(null);
  const [remoteId, setRemoteId] = useState('');
  const [stream, setStream] = useState(null);
  const [call, setCall] = useState(null);
  const [isCalling, setIsCalling] = useState(false);
  const [isCallAccepted, setIsCallAccepted] = useState(false);
  const [isCallEnded, setIsCallEnded] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  const selfVideoRef = useRef({ srcObject: null });
  const remoteVideoRef = useRef({ srcObject: null });
  const peerRef = useRef(null);

  const startCall = (remoteId) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on('signal', (signal) => {
      socket.emit('call:start', { remoteId, self, signal });
    });

    peer.on('stream', (currentStream) => {
      remoteVideoRef.current.srcObject = currentStream;
    });

    socket.on('call:accepted', ({ remote, signal }) => {
      peer.signal(signal);
      setCall({ remote, signal });
      setIsCallAccepted(true);
    });

    peerRef.current = peer;
  };

  const acceptCall = () => {
    setIsCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (signal) => {
      socket.emit('call:accept', { remoteId: call.remote.socketId, self, signal });
    });

    peer.on('stream', (currentStream) => {
      remoteVideoRef.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    peerRef.current = peer;
  };

  const endCall = () => {
    setCall(null);
    setIsCallEnded(true);
    peerRef.current = null;
    socket.emit('call:end', { remoteId: call.remote.socketId });
  };

  const toggleVideo = () => {
    selfVideoRef.current.srcObject.getVideoTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (signal) => {
      socket.emit('call:accept', { remoteId: call.remote.socketId, self, signal });
    });

    peer.on('stream', (currentStream) => {
      remoteVideoRef.current.srcObject = currentStream;
    });

    peerRef.current = peer;
  };

  const toggleAudio = () => {
    selfVideoRef.current.srcObject.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
    });

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (signal) => {
      socket.emit('call:accept', { remoteId: call.remote.socketId, self, signal });
    });

    peer.on('stream', (currentStream) => {
      remoteVideoRef.current.srcObject = currentStream;
    });

    peerRef.current = peer;
  };

  return (
    <CallContext.Provider
      value={{
        self,
        remoteId,
        stream,
        call,
        isCalling,
        isCallAccepted,
        isCallEnded,
        isVideoEnabled,
        isAudioEnabled,
        selfVideoRef,
        remoteVideoRef,
        peerRef,
        startCall,
        acceptCall,
        endCall,
        toggleVideo,
        toggleAudio,
        setSelf,
        setRemoteId,
        setStream,
        setCall,
        setIsCalling,
        setIsCallAccepted,
        setIsCallEnded,
        setIsVideoEnabled,
        setIsAudioEnabled,
      }}
    >
      {children}
    </CallContext.Provider>
  );
};

export default CallProvider;
