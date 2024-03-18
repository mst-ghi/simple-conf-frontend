'use client';

import { Center, Flex, Grid, Loader, Text, Title } from '@mantine/core';
import { ConferenceCode, ConferenceSidebar, ConferenceView } from '.';
import useApp from '@/hooks/useApp';
import { useFetchEvent } from '@/features/events';
import { notFound } from 'next/navigation';
import { useMemo } from 'react';
import { addTimeTo, isDateBefore } from '@/utils';

const Conference = ({ eventId }: { eventId: string }) => {
  const { screenSharingStatus } = useApp();

  const { data, isFetching, isError } = useFetchEvent(eventId);

  const available = useMemo(() => {
    if (!data || !data.event) {
      return false;
    }

    return (
      isDateBefore(
        addTimeTo(data.event.start_at, data.event.duration, 'minute'),
      ) && data.event.status !== 'finished'
    );
  }, [data]);

  if (isFetching) {
    return (
      <Center w="100%" h="40vh">
        <Loader />
      </Center>
    );
  }

  if (isError || !data?.event) {
    return notFound();
  }

  return (
    <Flex direction="column">
      <Flex
        direction="row"
        align="center"
        justify="space-between"
        mb="xs"
        px="xs"
      >
        <Text fw={600} fz="lg">
          {data.event.title}
        </Text>
        <ConferenceCode code={data.event.id} />
      </Flex>

      {available && (
        <Grid>
          <Grid.Col span={screenSharingStatus ? 10 : 12}>
            <ConferenceView />
          </Grid.Col>

          {screenSharingStatus && (
            <Grid.Col span={2}>
              <ConferenceSidebar />
            </Grid.Col>
          )}
        </Grid>
      )}
    </Flex>
  );
};

export default Conference;
