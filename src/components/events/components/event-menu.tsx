import { Fragment } from 'react';
import Link from 'next/link';
import { ActionIcon, Flex, Menu } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { openModal } from '@mantine/modals';
import { EventForm } from '..';
import { useApp } from '@/hooks';
import {
  IconDotsVertical,
  IconEdit,
  IconArrowLoopRight,
  IconTrash,
} from '@tabler/icons-react';

const EventMenu = ({ event, done }: { event?: IEvent; done?: () => void }) => {
  const pathname = usePathname();
  const { user } = useApp();

  if (!event) {
    return null;
  }

  return (
    <Flex direction="row" align="center" gap="md">
      {event.community?.owner_id === user?.id && (
        <Fragment>
          <ActionIcon color="orange">
            <IconTrash />
          </ActionIcon>
          <ActionIcon
            color="blue"
            onClick={() => {
              openModal({
                title: `Update ${event.title}`,
                size: 'xl',
                children: <EventForm event={event} done={done} />,
              });
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Fragment>
      )}

      <Menu
        width={184}
        shadow="sm"
        position="bottom-end"
        withArrow
        withinPortal
      >
        <Menu.Target>
          <ActionIcon color="white">
            <IconDotsVertical />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Operations</Menu.Label>
          <Menu.Divider mx="xs" />

          {!pathname.includes(event.id) && (
            <Menu.Item
              leftSection={<IconArrowLoopRight />}
              component={Link}
              href={`/events/${event.id}`}
            >
              See Details
            </Menu.Item>
          )}

          <Menu.Item
            leftSection={<IconArrowLoopRight />}
            component={Link}
            href={`/communities/${event.community_id}`}
          >
            See Community
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default EventMenu;
