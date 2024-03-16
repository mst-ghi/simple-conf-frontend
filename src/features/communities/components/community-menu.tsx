import { Fragment, useMemo } from 'react';
import Link from 'next/link';
import { ActionIcon, Button, Flex } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import {
  CommunityForm,
  useCommunityActions,
  useFetchJoinedCommunities,
} from '..';
import {
  IconEdit,
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
    <Flex direction="row" align="center" gap="sm">
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
                children: (
                  <CommunityForm
                    community={community}
                    done={() => {
                      if (done) {
                        done();
                      }
                      closeAllModals();
                    }}
                  />
                ),
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

      <Button
        loading={loading}
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
      </Button>
    </Flex>
  );
};

export default CommunityMenu;
