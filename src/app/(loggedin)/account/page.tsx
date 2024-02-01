'use client';

import { UserHeroCard } from '@/components/profile';
import { Page } from '@/components/shell';
import { useApp } from '@/hooks';
import { Flex } from '@mantine/core';

export default function ConfPage() {
  const { user } = useApp();

  return (
    <Page title={user?.name + ' Profile'}>
      <Flex direction="column" gap="lg">
        <UserHeroCard />
      </Flex>
    </Page>
  );
}
