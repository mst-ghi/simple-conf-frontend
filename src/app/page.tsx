'use client';

import { Logo } from '@/components/common';
import { Page } from '@/components/shell';
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
