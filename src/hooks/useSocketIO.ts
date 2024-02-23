import { showNotification } from '@mantine/notifications';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import ioClient from 'socket.io-client';
import { Envs, Events, getCookie, titleCase } from '@/utils';

const IoClientConfig: SocketIOClient.ConnectOpts = {
  secure: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 7,
  reconnectionDelay: 2000,
  transports: ['websocket'],
  query: {
    tkn: getCookie('sub-acc-tkn'),
  },
};

type RoomState = {
  id?: string;
  mode?: TRoomMode;
};

type CallState = {
  user?: IUserShort;
};

interface States {
  socket: SocketIOClient.Socket;
  isConnected?: boolean;
  isDisconnected?: boolean;
  room: RoomState;
  call: CallState;
}

interface Actions {
  actions: {
    connect: () => void;
    disconnect: () => void;
    emit: <T extends {}>(arg: ISocketEmitArgs<T>) => void;
    roomClick: (args: { room: RoomState; call: CallState }) => void;
    setRoom: (room: RoomState) => void;
    setCall: (call: CallState) => void;
  };
}

const InitStates: States = {
  socket: ioClient(Envs.socket.url, IoClientConfig),
  isConnected: false,
  isDisconnected: true,
  room: { id: undefined, mode: undefined },
  call: { user: undefined },
};

const socketStates = immer<States & Actions>((set) => {
  const { socket } = InitStates;

  socket.on('connect', () => {
    if (Envs.isDev) {
      console.log('socket connected, ID:', socket.id);
    }

    set({ isConnected: true, isDisconnected: false });
  });

  socket.on('disconnect', () => {
    if (Envs.isDev) {
      console.log('socket disconnected');
    }

    set(InitStates);
  });

  socket.on(Events.errors.unauthorized, (res: ISocketData<any>) => {
    showNotification({
      color: 'red',
      title: titleCase(res.event.split(':')[1]),
      message: res.message,
    });
  });

  socket.on(Events.errors.message, (res: ISocketData<any>) => {
    showNotification({
      color: 'red',
      title: titleCase(res.event.split(':')[1]),
      message: res.message,
    });
  });

  return {
    ...InitStates,
    actions: {
      connect: () => {
        if (getCookie('sub-acc-tkn')) {
          socket.connect();
        }
      },
      disconnect: () => {
        socket.disconnect();
      },
      emit: (arg) => {
        socket.emit(arg.event, arg.data);
      },
      roomClick: ({ room, call }: { room: RoomState; call: CallState }) => {
        set({ room, call });
      },
      setRoom: (room: RoomState) => {
        set({ room });
      },
      setCall: (call: CallState) => {
        set({ call });
      },
    },
  };
});

const useSocketIO = create(socketStates);
export default useSocketIO;
