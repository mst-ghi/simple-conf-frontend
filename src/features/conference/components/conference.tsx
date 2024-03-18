'use client';

import { Center, Flex, Grid, Loader, Text, Title } from '@mantine/core';
import { ConferenceCode, ConferenceSidebar, ConferenceView } from '.';
import useApp from '@/hooks/useApp';
import { useFetchEvent } from '@/features/events';
import { notFound } from 'next/navigation';

const Conference = ({ eventId }: { eventId: string }) => {
  const { screenSharingStatus } = useApp();

  const { data, isFetching, isError } = useFetchEvent(eventId);

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
        <Text fw={500} fz="lg">
          {data.event.title}
        </Text>
        <ConferenceCode code={data.event.id} />
      </Flex>

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
    </Flex>
  );
};

export default Conference;
