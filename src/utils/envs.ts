export const Envs = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  app: {
    title: 'Video Conference',
    description:
      'A video conferencing site is a digital platform that enables real-time, face-to-face meetings between users in different locations.',
  },
  api: {
    url: 'http://localhost:3001',
  },
  socket: {
    url: 'http://localhost:3001',
    events: {
      user: {
        me: 'user:me',
      },
      room: {
        new: 'room:new',
        update: 'room:update',
        delete: 'room:delete',
      },
      message: {
        new: 'message:new',
        update: 'message:update',
        delete: 'message:delete',
      },
    },
  },
};

export const Events = {
  errors: {
    unauthorized: 'errors:unauthorized',
  },
  user: {
    me: 'user:me',
    get: 'user:get',
  },
  room: {
    new: 'room:new',
    update: 'room:update',
    delete: 'room:delete',
  },
  message: {
    send: 'message:send',
    update: 'message:update',
    delete: 'message:delete',
  },
};
