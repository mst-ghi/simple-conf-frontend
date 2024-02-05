'use client';

import { UserHeroCard } from '@/components/profile';
import { Page } from '@/components/shell';
import { useApp, useSocketIO } from '@/hooks';
import { Events } from '@/utils';
import { Button, Flex } from '@mantine/core';
import { useEffect } from 'react';

export default function ConfPage() {
  const { user } = useApp();
  const { socket, actions } = useSocketIO();

  useEffect(() => {
    socket.on(Events.user.me, (res: ISocketData<{ user: IUser }>) =>
      console.log('res', res.data.user),
    );
  }, []);

  return (
    <Page title={user?.name + ' Profile'}>
      <Flex direction="column" gap="lg">
        <UserHeroCard />

        <Button onClick={() => actions.emit({ event: Events.user.get })}>
          Get me from socket
        </Button>
      </Flex>
    </Page>
  );
}
