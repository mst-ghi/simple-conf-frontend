import { create } from 'zustand';
import Peer from 'simple-peer';
import { immer } from 'zustand/middleware/immer';

interface States {
  callMode?: 'in' | 'out';
  callAccepted?: boolean;
  callRejected?: boolean;
  callEnded?: boolean;
  callInfo?: CallInfo;
  stream?: MediaStream;
  peer?: Peer.Instance;
}

interface Actions {
  actions: {
    setCallMode: (callMode?: 'in' | 'out') => void;
    setCallAccepted: (callAccepted?: boolean) => void;
    setCallRejected: (callRejected?: boolean) => void;
    setCallEnded: (callEnded?: boolean) => void;
    setCallInfo: (callInfo?: CallInfo) => void;
    setStream: (stream?: MediaStream) => void;
    setStates: (args: States) => void;
    setPeer: (peer?: Peer.Instance) => void;
  };
}

export const InitStates: States = {
  callMode: undefined,
  callAccepted: undefined,
  callRejected: undefined,
  callEnded: undefined,
  callInfo: undefined,
};

const callStates = immer<States & Actions>((set) => {
  return {
    ...InitStates,
    actions: {
      setCallMode: (callMode?: 'in' | 'out') => {
        set({ callMode });
      },
      setCallAccepted: (callAccepted?: boolean) => {
        set({ callAccepted });
      },
      setCallRejected: (callRejected?: boolean) => {
        set({ callRejected });
      },
      setCallEnded: (callEnded?: boolean) => {
        set({ callEnded });
      },
      setCallInfo: (callInfo?: CallInfo) => {
        set({ callInfo });
      },
      setStream: (stream?: MediaStream) => {
        set({ stream });
      },
      setPeer: (peer?: Peer.Instance) => {
        set({ peer });
      },
      setStates: (args?: States) => {
        set({ ...args });
      },
    },
  };
});

const useCallStates = create(callStates);
export default useCallStates;
