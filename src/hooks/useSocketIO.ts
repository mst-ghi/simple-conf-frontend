import { showNotification } from '@mantine/notifications';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import ioClient from 'socket.io-client';
import {
  Envs,
  Events,
  forceReload,
  getCookie,
  removeAllCookies,
  titleCase,
} from '@/utils';

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

interface States {
  socket: SocketIOClient.Socket;
  isConnected?: boolean;
  isDisconnected?: boolean;

  room: {
    activeId?: string;
  };
}

interface Actions {
  actions: {
    connect: () => void;
    disconnect: () => void;
    emit: <T extends {}>(arg: ISocketEmitArgs<T>) => void;
    setActiveRoomId: (roomId?: string) => void;
  };
}

const InitStoreData: States = {
  socket: ioClient(Envs.socket.url, IoClientConfig),
  isConnected: false,
  isDisconnected: true,
  room: { activeId: undefined },
};

const socketStates = immer<States & Actions>((set) => {
  const { socket } = InitStoreData;

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

    set(InitStoreData);
  });

  socket.on(Events.errors.unauthorized, (res: ISocketData<any>) => {
    showNotification({
      color: 'red',
      title: titleCase(res.event.split(':')[1]),
      message: res.message,
    });
  });

  return {
    ...InitStoreData,
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
      setActiveRoomId: (activeId?: string) => {
        set({ room: { activeId } });
      },
    },
  };
});

const useSocketIO = create(socketStates);

export default useSocketIO;
