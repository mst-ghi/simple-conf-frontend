'use client';

import { UserHeroCard } from '@/features/profile';
import { Page } from '@/features/shell';
import { useApp } from '@/hooks';
import { Flex } from '@mantine/core';

export default function ConfPage() {
  const { user } = useApp();

  return (
    <Page title={user?.name + ' Profile'}>
      <Flex direction="column" gap="lg">
        <UserHeroCard user={user} />
      </Flex>
    </Page>
  );
}
