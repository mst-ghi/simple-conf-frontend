'use client';

import { Page } from '@/features/shell';
import { notFound } from 'next/navigation';

import { Card, Flex, Text, Title } from '@mantine/core';
import { useThemeStyle } from '@/hooks';

import {
  EventMenu,
  EventOverAlert,
  EventStartAlert,
  EventTimer,
  useEventStatus,
  useFetchEvent,
} from '@/features/events';

export default function EventPage({ params }: { params: { id: string } }) {
  const { isDesktop } = useThemeStyle();
  const { data, isFetching, refetch } = useFetchEvent(params.id);

  const { isStarted, isFinished } = useEventStatus({ event: data?.event });

  if (!isFetching && !data?.event?.id) {
    notFound();
  }

  return (
    <Page
      title={isFetching ? 'Loading...' : data?.event?.title}
      loading={isFetching}
    >
      <Flex direction="row" justify="end" mb="md">
        <EventMenu event={data?.event} done={refetch} joinable={isStarted} />
      </Flex>

      <Card>
        <EventOverAlert enable={isFinished} />
        <EventStartAlert enable={isStarted} />

        <Flex direction={isDesktop ? 'row' : 'column-reverse'} gap="md">
          <Flex direction="column" mt={6} style={{ flex: 1 }}>
            {data?.event.community?.owner?.name && (
              <Text c="gray" tt="capitalize" size="sm" mb={4} mt={-10}>
                {data?.event.community?.owner?.name}
              </Text>
            )}

            <Title order={3} tt="capitalize">
              {data?.event.title}
            </Title>

            <Text>{data?.event.description}</Text>
          </Flex>

          {data?.event && (
            <EventTimer
              startDate={new Date(data?.event.start_at)}
              duration={data?.event.duration}
            />
          )}
        </Flex>
      </Card>
    </Page>
  );
}
