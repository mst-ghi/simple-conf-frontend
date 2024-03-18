import { Fragment } from 'react';
import Link from 'next/link';
import { ActionIcon, Button, Flex } from '@mantine/core';
import { openModal } from '@mantine/modals';
import { EventForm } from '..';
import { useApp } from '@/hooks';
import {
  IconEdit,
  IconTrash,
  IconCube,
  IconArrowRight,
} from '@tabler/icons-react';

const EventMenu = ({
  event,
  joinable,
  done,
}: {
  event?: IEvent;
  joinable?: boolean;
  done?: () => void;
}) => {
  const { user } = useApp();

  if (!event) {
    return null;
  }

  return (
    <Flex direction="row" align="center" gap="sm">
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
                children: (
                  <EventForm
                    communityId={event.community_id}
                    event={event}
                    done={done}
                  />
                ),
              });
            }}
          >
            <IconEdit />
          </ActionIcon>
        </Fragment>
      )}

      <Button
        size="xs"
        variant="light"
        component={Link}
        leftSection={<IconCube size={20} />}
        href={`/communities/${event.community_id}`}
      >
        Community
      </Button>

      <Button
        size="xs"
        variant="light"
        color="green"
        leftSection={<IconArrowRight size={20} />}
        disabled={!joinable}
      >
        Join Meeting
      </Button>
    </Flex>
  );
};

export default EventMenu;
