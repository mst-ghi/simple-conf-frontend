import Peer from 'simple-peer';
import { useCallStates } from '.';
import { useApp, useSocketIO } from '@/hooks';
import { Events } from '@/utils';
import { showNotification } from '@mantine/notifications';

// const PeerConfig = {
//   iceServers: [
//     {
//       urls: 'stun:stun.l.google.com:19302',
//     },
//   ],
// };

const useCall = () => {
  const { user } = useApp();
  const { socket, call } = useSocketIO();

  const {
    callMode,
    callAccepted,
    callInfo,
    stream,
    peer,
    remoteStream,
    actions,
  } = useCallStates();

  const stopVideoAudio = () => {
    stream?.getTracks().forEach((track) => {
      if (track.readyState == 'live') {
        track.stop();
      }
    });
  };

  const stopVideo = () => {
    stream?.getTracks().forEach((track) => {
      if (track.readyState == 'live' && track.kind === 'video') {
        track.stop();
      }
    });
  };

  const stopAudio = () => {
    stream?.getTracks().forEach((track) => {
      if (track.readyState == 'live' && track.kind === 'audio') {
        track.stop();
      }
    });
  };

  const streamON = (constraints: MediaStreamConstraints) => {
    navigator.mediaDevices
      .getUserMedia({ ...constraints, audio: false })
      .then((currentStream: any) => {
        actions.setStream(currentStream);
      })
      .catch((err: any) => {
        showNotification({ color: 'red', message: err.message });
      });
  };

  const streamOFF = () => {
    stopVideoAudio();
  };

  const calling = () => {
    const toUser = call.user;

    if (toUser && user && stream) {
      const callingPeer = new Peer({
        initiator: true,
        trickle: false,
        // config: PeerConfig,
        stream,
      });

      callingPeer.on('signal', (signalData: Peer.SignalData) => {
        const callingData: CallInfo = {
          toRoomId: toUser.id,
          toUser: {
            id: toUser.id,
            email: toUser.email,
            name: toUser.name,
          },
          fromRoomId: user.id,
          fromUser: {
            id: user.id,
            email: user.email,
            name: user.name,
          },
          offer: signalData,
        };

        actions.setStates({
          callMode: 'out',
          callInfo: callingData,
        });

        socket.emit(Events.call.calling, callingData);
      });

      callingPeer.on('stream', (currentStream) => {
        actions.setRemoteStream(currentStream);
        console.warn('CALLING STREAM EVENT');
      });

      callingPeer.on('connect', () => {
        console.warn('CALLING PEER CONNECT');
      });

      actions.setPeer(callingPeer);
    }
  };

  const acceptCall = () => {
    if (callInfo && stream) {
      actions.setCallAccepted(true);

      const acceptPeer = new Peer({
        initiator: false,
        trickle: false,
        // config: PeerConfig,
        stream,
      });

      acceptPeer.on('signal', (signalData: Peer.SignalData) => {
        const acceptData: CallInfo = {
          ...callInfo,
          answer: signalData,
        };

        socket.emit(Events.call.accepting, acceptData);

        actions.setCallInfo(acceptData);
      });

      acceptPeer.on('stream', (currentStream) => {
        actions.setRemoteStream(currentStream);
        console.warn('ACCEPTING STREAM EVENT');
      });

      acceptPeer.on('connect', () => {
        console.warn('ACCEPTING PEER CONNECT');
      });

      acceptPeer.signal(callInfo.offer);

      actions.setPeer(acceptPeer);
    }
  };

  const endCall = () => {
    if (stream) {
      socket.emit(Events.call.ending, callInfo);
    }
  };

  socket.on(Events.call.ended, () => {
    streamOFF();
    actions.reset();
  });

  return {
    call,
    callMode,
    callAccepted,
    callInfo,
    stream,
    peer,
    remoteStream,
    actions: {
      ...actions,
      streamON,
      streamOFF,
      stopVideoAudio,
      stopVideo,
      stopAudio,
      calling,
      acceptCall,
      endCall,
    },
  };
};

export default useCall;
