'use client';

import { Page } from '@/features/shell';
import { notFound } from 'next/navigation';

import { Card, Flex, Text, Title } from '@mantine/core';
import { useThemeStyle } from '@/hooks';
import { useMemo } from 'react';
import { addTimeTo, isDateAfter, isDateBefore } from '@/utils';

import {
  EventMenu,
  EventOverAlert,
  EventStartAlert,
  EventTimer,
  useFetchEvent,
} from '@/features/events';

export default function EventPage({ params }: { params: { id: string } }) {
  const { isDesktop } = useThemeStyle();
  const { data, isFetching, refetch } = useFetchEvent(params.id);

  const joinable = useMemo(() => {
    if (!data?.event) return false;

    if (data.event.status === 'finished') {
      return false;
    }

    if (
      isDateBefore(
        addTimeTo(data.event.start_at, data.event.duration, 'minute'),
      )
    ) {
      return false;
    }

    return (
      isDateBefore(data.event.start_at) &&
      ['started', 'pending'].includes(data.event.status)
    );
  }, [data]);

  if (!isFetching && !data?.event?.id) {
    notFound();
  }

  return (
    <Page
      title={isFetching ? 'Loading...' : data?.event?.title}
      loading={isFetching}
    >
      <Flex direction="row" justify="end" mb="md">
        <EventMenu event={data?.event} done={refetch} joinable={joinable} />
      </Flex>

      <Card>
        <EventOverAlert enable={data?.event.status === 'finished'} />
        <EventStartAlert enable={joinable} />

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
