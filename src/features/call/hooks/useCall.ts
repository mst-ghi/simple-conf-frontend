import Peer from 'simple-peer';
import { useCallStates } from '.';
import { useApp, useSocketIO } from '@/hooks';
import { Events } from '@/utils';
import { showNotification } from '@mantine/notifications';
import { useSetState } from '@mantine/hooks';

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

  const [tracks, setTracks] = useSetState({ audio: true, video: true });

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

  const toggleAudio = () => {
    if (stream) {
      setTracks({ audio: !stream.getAudioTracks()[0].enabled });
      stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    }
  };

  const toggleVideo = () => {
    if (stream) {
      setTracks({ video: !stream.getVideoTracks()[0].enabled });
      stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    }
  };

  const streamON = (constraints: MediaStreamConstraints) => {
    setTracks({
      audio: Boolean(constraints.audio),
      video: Boolean(constraints.video),
    });

    navigator.mediaDevices
      .getUserMedia(constraints)
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

  socket.on(Events.call.busy, () => {
    showNotification({ color: 'orange', message: 'The audience is talking' });
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
    tracks,
    actions: {
      ...actions,
      streamON,
      streamOFF,
      stopVideoAudio,
      stopVideo,
      stopAudio,
      toggleAudio,
      toggleVideo,
      calling,
      acceptCall,
      endCall,
    },
  };
};

export default useCall;
