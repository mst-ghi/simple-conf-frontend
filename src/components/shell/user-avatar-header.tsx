import { Avatar, Button, Flex, Menu, Text } from '@mantine/core';
import { closeAllModals, openConfirmModal, openModal } from '@mantine/modals';
import { IconLock, IconLogout, IconUserPin } from '@tabler/icons-react';
import { ChangePasswordForm, useAuth } from '../auth';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const UserAvatarHeader = () => {
  const pathname = usePathname();
  const { isLoggedIn, user, logoutRequest } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <Button
        variant={!pathname.includes('/auth') ? 'light' : undefined}
        component={Link}
        href="/auth/login"
      >
        Login / Register
      </Button>
    );
  }

  return (
    <Menu position="bottom-end" withArrow withinPortal width={200}>
      <Menu.Target>
        <Avatar radius="xl" src="/user.png" />
      </Menu.Target>

      <Menu.Dropdown>
        <Flex direction="row" px="xs" py={4} align="center" gap={6}>
          <Avatar
            size="sm"
            alt={user.name}
            radius="md"
            color="blue"
            src="/user.png"
          />
          <Text size="sm" fw={600}>
            {user.name}
          </Text>
        </Flex>

        <Menu.Divider mx="xs" />

        <Menu.Item
          leftSection={<IconUserPin size={20} />}
          component={Link}
          href="/profile"
        >
          My Profile
        </Menu.Item>

        <Menu.Item
          leftSection={<IconLock size={20} />}
          onClick={() => {
            openModal({
              title: 'Change Password',
              children: <ChangePasswordForm done={closeAllModals} />,
            });
          }}
        >
          Change Password
        </Menu.Item>

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={20} />}
          onClick={() => {
            openConfirmModal({
              title: (
                <Text size="xl" fw={600}>
                  Logout
                </Text>
              ),
              children: <Text>Are you sure to logout?</Text>,
              confirmProps: {
                color: 'red',
              },
              onConfirm: logoutRequest,
            });
          }}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserAvatarHeader;
