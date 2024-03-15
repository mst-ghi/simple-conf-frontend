import { create } from 'zustand';
import Peer from 'simple-peer';
import { immer } from 'zustand/middleware/immer';

interface States {
  callMode?: 'in' | 'out';
  userMediaError?: boolean;
  callAccepted?: boolean;
  callInfo?: CallInfo;
  stream?: MediaStream;
  remoteStream?: MediaStream;
  peer?: Peer.Instance;
}

interface Actions {
  actions: {
    reset: () => void;
    setCallMode: (callMode?: 'in' | 'out') => void;
    setUserMediaError: (userMediaError?: boolean) => void;
    setCallAccepted: (callAccepted?: boolean) => void;
    setCallInfo: (callInfo?: CallInfo) => void;
    setStream: (stream?: MediaStream) => void;
    setRemoteStream: (remoteStream?: MediaStream) => void;
    setStates: (args: States) => void;
    setPeer: (peer?: Peer.Instance) => void;
  };
}

const InitStates: States = {
  callMode: undefined,
  userMediaError: undefined,
  callAccepted: undefined,
  callInfo: undefined,
  stream: undefined,
  remoteStream: undefined,
  peer: undefined,
};

const callStates = immer<States & Actions>((set, get) => {
  return {
    ...InitStates,
    actions: {
      reset: () => {
        set(InitStates);
      },
      setCallMode: (callMode?: 'in' | 'out') => {
        set({ callMode });
      },
      setCallAccepted: (callAccepted?: boolean) => {
        set({ callAccepted });
      },
      setUserMediaError: (userMediaError?: boolean) => {
        set({ userMediaError });
      },
      setCallInfo: (callInfo?: CallInfo) => {
        set({ callInfo });
      },
      setStream: (stream?: MediaStream) => {
        set({ stream });
      },
      setRemoteStream: (remoteStream?: MediaStream) => {
        set({ remoteStream });
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
