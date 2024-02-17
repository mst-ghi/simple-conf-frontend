'use client';

import { useThemeStyle } from '@/hooks';
import { useDisclosure } from '@mantine/hooks';
import Link from 'next/link';

import { Burger, Card, Divider, Drawer, Flex, Text } from '@mantine/core';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '../common';
import UserAvatarHeader from './user-avatar-header';

const links: { label: string; href: string }[] = [
  { label: 'Communities', href: '/communities' },
  { label: 'Events', href: '/events' },
];

const PageHeader = () => {
  const pathname = usePathname();
  const [opened, { open, close }] = useDisclosure();
  const { isDesktop, isMobile } = useThemeStyle();

  useEffect(() => {
    close();
  }, [pathname]);

  return (
    <Card
      h={60}
      pt="xs"
      pb={isDesktop ? 'xs' : 0}
      radius={0}
      withBorder={false}
      style={{ backgroundColor: 'transparent' }}
    >
      <Flex direction="row" align="center" justify="space-between">
        {isDesktop && (
          <Flex direction="row" align="center" gap="xl">
            <Link href="/">
              <Logo height={40} />
            </Link>

            <Flex direction="row" align="center" gap="xl">
              {links.map((el, idx) => {
                return (
                  <Link href={el.href} key={`${el.label}-${idx}`}>
                    <Text
                      fw={500}
                      size={pathname === el.href ? 'xl' : undefined}
                    >
                      {el.label}
                    </Text>
                  </Link>
                );
              })}
            </Flex>
          </Flex>
        )}

        {isMobile && (
          <Burger
            opened={opened}
            onClick={open}
            aria-label="Toggle navigation"
          />
        )}

        <Flex direction="row" align="center" gap="md">
          <UserAvatarHeader />
        </Flex>
      </Flex>

      <Drawer
        withCloseButton={false}
        size="72%"
        opened={opened}
        onClose={close}
        pos="relative"
        title={<Logo height={36} />}
      >
        <Divider mb="lg" />

        <Flex direction="column" gap="md" style={{ flex: 1 }}>
          {links.map((el, idx) => {
            return (
              <Link href={el.href} key={`${el.label}-${idx}-drawer`}>
                <Text size={pathname === el.href ? 'xl' : undefined} fw={500}>
                  {el.label}
                </Text>
              </Link>
            );
          })}
        </Flex>
      </Drawer>
    </Card>
  );
};

export default PageHeader;
