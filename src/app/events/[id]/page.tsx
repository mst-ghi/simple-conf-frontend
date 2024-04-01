'use client';

import { Page } from '@/features/shell';
import { notFound } from 'next/navigation';

import { Card, Flex, Tabs, Text, Title } from '@mantine/core';
import { IconMessage2 } from '@tabler/icons-react';
import { CommentsGroup } from '@/features/comments';
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
        <EventMenu event={data?.event} done={refetch} joinable />
      </Flex>

      <Card withBorder={false} px={0} pt={0} radius={0}>
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

      <Tabs mt="lg" defaultValue="comments" variant="outline">
        <Tabs.List>
          <Tabs.Tab value="comments" leftSection={<IconMessage2 />}>
            Comments
          </Tabs.Tab>
        </Tabs.List>

        {data?.event.id && (
          <Tabs.Panel value="comments" p="sm">
            <CommentsGroup modelId={data?.event.id} modelType="event" />
          </Tabs.Panel>
        )}
      </Tabs>
    </Page>
  );
}
