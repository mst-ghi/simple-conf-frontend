import { PaginationMeta } from '@/features/common';
import { EventsGroup, useFetchCommunityEvents } from '@/features/events';
import { Box, Text } from '@mantine/core';
import { useState } from 'react';

const CommunityEvents = ({ communityId }: { communityId?: string }) => {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchCommunityEvents(
    { page, communityId },
    Boolean(communityId),
  );

  if (!isFetching && (!data || !data.events[0])) {
    return (
      <Text c="gray" tt="capitalize" size="sm">
        No events have been registered
      </Text>
    );
  }

  return (
    <Box>
      <EventsGroup events={data?.events} />
      <PaginationMeta meta={data?.meta} page={page} setPage={setPage} />
    </Box>
  );
};

export default CommunityEvents;
