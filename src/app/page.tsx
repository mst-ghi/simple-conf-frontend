'use client';

import { Logo } from '@/features/common';
import { Page } from '@/features/shell';
import { Center } from '@mantine/core';

export default function Home() {
  return (
    <Page title="Home">
      <Center h="calc(90vh - 60px)">
        <Logo />
      </Center>
    </Page>
  );
}
