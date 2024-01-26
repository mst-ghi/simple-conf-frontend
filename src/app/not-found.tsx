'use client';

import { Page } from '@/components/shell';
import { Button, Center, Image, Text } from '@mantine/core';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFoundPage() {
  const pathname = usePathname();

  return (
    <Page title="Home">
      <Center
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(90vh - 60px)',
          gap: 26,
        }}
      >
        <Image src="/not-found.png" alt="logo" w={360} />

        <Text fw={500}>Sorry, Page Not Found</Text>

        <Text fw={500} td="line-through" mt={-16}>
          {pathname}
        </Text>

        <Button component={Link} href="/">
          Go Home Page
        </Button>
      </Center>
    </Page>
  );
}
