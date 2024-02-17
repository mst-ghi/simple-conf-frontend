import { Fragment, useMemo } from 'react';
import Link from 'next/link';
import { ActionIcon, Flex, Loader, Menu } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { openModal } from '@mantine/modals';
import {
  CommunityForm,
  useCommunityActions,
  useFetchJoinedCommunities,
} from '..';
import {
  IconCalendarEvent,
  IconDotsVertical,
  IconEdit,
  IconArrowLoopRight,
  IconTrash,
  IconLayersUnion,
  IconCalendarPlus,
  IconLayersOff,
} from '@tabler/icons-react';

const CommunityMenu = ({
  community,
  done,
}: {
  community?: ICommunity;
  done?: () => void;
}) => {
  const pathname = usePathname();
  const { refetch, isFetching } = useFetchJoinedCommunities();
  const { loading, isIJoined, isIOwner, joinRequest, leftRequest } =
    useCommunityActions();

  const isJoinAble = useMemo(() => {
    if (community) {
      return !isIJoined(community.id) && !isIOwner(community.owner_id);
    }
    return false;
  }, [community, isFetching]);

  if (!community) {
    return null;
  }

  return (
    <Flex direction="row" align="center" gap="md">
      {isIOwner(community.owner_id) && (
        <Fragment>
          <ActionIcon color="orange">
            <IconTrash />
          </ActionIcon>
          <ActionIcon
            color="blue"
            onClick={() => {
              openModal({
                title: `Update ${community.title}`,
                size: 'xl',
                children: <CommunityForm community={community} done={done} />,
              });
            }}
          >
            <IconEdit />
          </ActionIcon>
          <ActionIcon
            color="blue"
            component={Link}
            href={`/account/new-event?communityId=${community.id}`}
          >
            <IconCalendarPlus />
          </ActionIcon>
        </Fragment>
      )}

      <Menu
        width={148}
        shadow="sm"
        position="bottom-end"
        withArrow
        withinPortal
      >
        <Menu.Target>
          <ActionIcon color="white">
            {loading || isFetching ? (
              <Loader color="white" size="xs" />
            ) : (
              <IconDotsVertical />
            )}
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Operations</Menu.Label>
          <Menu.Divider mx="xs" />

          {!pathname.includes(community.id) && (
            <Menu.Item
              leftSection={<IconArrowLoopRight />}
              component={Link}
              href={`/communities/${community.id}`}
            >
              See Details
            </Menu.Item>
          )}

          <Menu.Item leftSection={<IconCalendarEvent />}>See Events</Menu.Item>

          <Menu.Item
            leftSection={isJoinAble ? <IconLayersUnion /> : <IconLayersOff />}
            color={isJoinAble ? 'green' : 'orange'}
            disabled={isIOwner(community.owner_id)}
            onClick={async () => {
              if (isJoinAble) {
                await joinRequest(community.id);
              } else {
                await leftRequest(community.id);
              }

              await refetch();

              if (done) {
                done();
              }
            }}
          >
            {isJoinAble ? 'Join' : 'Left'}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default CommunityMenu;
