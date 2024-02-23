import { useEffect } from 'react';
import Peer from 'simple-peer';
import { useCallStates } from '.';
import { useApp, useSocketIO } from '@/hooks';
import { Events } from '@/utils';
import { showNotification } from '@mantine/notifications';
import { InitStates } from './useCallStates';

const useCall = () => {
  const { user } = useApp();
  const { socket, call } = useSocketIO();

  const {
    callMode,
    callAccepted,
    callEnded,
    callRejected,
    callInfo,
    stream,
    actions,
  } = useCallStates();

  const stopVideoAudio = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState == 'live') {
          track.stop();
        }
      });
    }
  };

  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState == 'live' && track.kind === 'video') {
          track.stop();
        }
      });
    }
  };

  const stopAudio = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState == 'live' && track.kind === 'audio') {
          track.stop();
        }
      });
    }
  };

  const streamON = (constraints: MediaStreamConstraints) => {
    if (!stream) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((currentStream) => {
          actions.setStream(currentStream);
        })
        .catch((err) => {
          showNotification({ color: 'red', message: err.message });
        });
    }
  };

  const streamOFF = () => {
    if (stream) {
      stopVideoAudio();
      actions.setStream(undefined);
    }
  };

  const audioCall = () => {
    const calledUser = call.user;

    if (socket && calledUser?.id) {
      const callingUser = {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      };

      console.log('calledUser', calledUser);
      console.log('callingUser', callingUser);

      const peer = new Peer({ initiator: true, trickle: false, stream });

      peer.on('signal', (signalData: Peer.SignalData) => {
        socket.emit(Events.call.calling, {
          roomId: calledUser.id,
          callingUser,
          calledUser,
          signalData,
        });
      });

      actions.setPeer(peer);
    }
  };

  const callAccept = () => {
    if (stream && socket) {
      actions.setStates({
        callAccepted: true,
        callRejected: undefined,
        callEnded: undefined,
      });

      const peer = new Peer({ initiator: false, trickle: false, stream });

      peer.on('signal', (signalData: Peer.SignalData) => {
        socket.emit(Events.call.accepted, { ...callInfo, signalData });
      });

      actions.setPeer(peer);
    }
  };

  const rejectAccept = () => {
    //
  };

  const endAccept = () => {
    //
  };

  return {
    initStates: InitStates,
    call,
    callMode,
    callAccepted,
    callEnded,
    callRejected,
    callInfo,
    stream,
    actions: {
      ...actions,
      streamON,
      streamOFF,
      stopVideoAudio,
      stopVideo,
      stopAudio,
      audioCall,
      callAccept,
    },
  };
};

export default useCall;
