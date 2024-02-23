import { useEffect } from 'react';
import { useCall } from '.';
import { useSocketIO } from '@/hooks';
import { Events } from '@/utils';

const useCallBootstrap = () => {
  const { socket, actions: socketActions } = useSocketIO();

  const {
    callMode,
    callAccepted,
    callEnded,
    callRejected,
    callInfo,
    stream,
    actions,
  } = useCall();

  useEffect(() => {
    socket.on(Events.call.receiving, (res: ISocketData<CallInfo>) => {
      if (res) {
        actions.streamON({ video: false, audio: true });

        socketActions.setCall({ user: res.data.callingUser });

        actions.setStates({
          callInfo: res.data,
          callMode: 'in',
          callAccepted: undefined,
          callEnded: undefined,
          callRejected: undefined,
        });
      }
    });

    socket.on(Events.call.accepted, (callInfo: CallInfo) => {
      if (callInfo) {
        actions.setStates({
          callInfo,
          callMode: 'in',
          callAccepted: true,
          callEnded: false,
          callRejected: false,
        });
      }
    });

    socket.on(Events.call.rejected, () => {
      socketActions.setCall({ user: undefined });

      actions.setStates({
        callInfo: undefined,
        callMode: undefined,
        callAccepted: false,
        callEnded: undefined,
        callRejected: true,
      });
    });

    socket.on(Events.call.ended, () => {
      actions.setStates({
        callInfo: undefined,
        callMode: undefined,
        callAccepted: undefined,
        callEnded: true,
        callRejected: undefined,
      });
    });
  }, []);

  return {
    callMode,
    callAccepted,
    callEnded,
    callRejected,
    callInfo,
    stream,
    actions,
  };
};

export default useCallBootstrap;
