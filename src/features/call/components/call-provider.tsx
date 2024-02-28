import { useEffect } from 'react';
import { CallModal, useCall } from '..';
import { Events } from '@/utils';
import { useSocketIO } from '@/hooks';
const CallProvider = () => {
  const { socket, actions: socketActions } = useSocketIO();
  const { callInfo, stream, callMode, peer, actions } = useCall();

  useEffect(() => {
    socket.on(Events.call.receiving, (res: ISocketData<CallInfo>) => {
      if (res) {
        if (callInfo?.fromUser) {
          socket.emit(Events.call.busy, res.data);
        } else {
          if (!stream) {
            actions.streamON({ video: true, audio: true });
          }

          socketActions.setCall({ user: res.data.fromUser });

          actions.setStates({
            callInfo: res.data,
            callMode: 'in',
            callAccepted: false,
          });
        }
      }
    });

    socket.on(Events.call.accepted, (res: ISocketData<CallInfo>) => {
      actions.setStates({
        callInfo: res.data,
        callAccepted: true,
      });
    });
  }, []);

  useEffect(() => {
    if (callInfo?.answer && callMode === 'out') {
      peer?.signal(callInfo.answer);
    }
  }, [callInfo]);

  return (
    <CallModal receiving={Boolean(callInfo?.fromRoomId)} onClose={() => {}} />
  );
};

export default CallProvider;
