'use client';

import Link from 'next/link';
import { Page } from '@/features/shell';
import { Button, Center, Flex, Image, Text } from '@mantine/core';
import { usePathname, useRouter } from 'next/navigation';
import { IconArrowLeft, IconHome } from '@tabler/icons-react';

export default function NotFoundPage() {
  const pathname = usePathname();
  const router = useRouter();

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

        <Text fw={500} size="xl">
          Sorry, Page Not Found
        </Text>

        <Text fw={500} td="line-through" mt={-16} c="gray">
          {pathname}
        </Text>

        <Flex direction="row" align="center" justify="center" gap="xl">
          <Button leftSection={<IconArrowLeft />} onClick={() => router.back()}>
            Go Back
          </Button>

          <Button
            leftSection={<IconHome />}
            variant="outline"
            component={Link}
            href="/"
          >
            Home Page
          </Button>
        </Flex>
      </Center>
    </Page>
  );
}
