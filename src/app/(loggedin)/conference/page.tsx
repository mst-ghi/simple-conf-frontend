'use client';

import { Page } from '@/features/shell';
import { Conference, ConferenceLink } from '@/features/conference';
import { notFound, useSearchParams } from 'next/navigation';
import { EventTimer, useEventStatus, useFetchEvent } from '@/features/events';
import {
  Button,
  Card,
  Center,
  Container,
  Flex,
  Loader,
  Text,
} from '@mantine/core';
import Link from 'next/link';

export default function ConfConferencePage() {
  const search = useSearchParams();
  const eventId = search.get('eventId');

  const { data, isFetching, isError } = useFetchEvent(eventId || '');
  const { isPended, isStarted, isFinished } = useEventStatus({
    event: data?.event,
  });

  if (isFetching) {
    return (
      <Center w="100%" h="40vh">
        <Loader />
      </Center>
    );
  }

  if (!eventId || isError || !data?.event) {
    return notFound();
  }

  return (
    <Page title="Conference" unstyled>
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
          <ConferenceLink id={data.event.id} disabled={isFinished} />
        </Flex>

        {isPended && (
          <Container mt="lg">
            <Card>
              <Flex direction="column" justify="center" align="center" gap="lg">
                <Text>{data?.event.description}</Text>

                <EventTimer
                  startDate={new Date(data?.event.start_at)}
                  duration={data?.event.duration}
                  miw={260}
                  h={120}
                />
              </Flex>
            </Card>
          </Container>
        )}

        {isStarted && <Conference event={data.event} />}

        {isFinished && (
          <Center
            h="50vh"
            w="100%"
            style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <Text c="dark" fz={36} fw={500}>
              This Event Is Over
            </Text>

            <Button color="dark" component={Link} href={`/events/${eventId}`}>
              Go to Event details
            </Button>
          </Center>
        )}
      </Flex>
    </Page>
  );
}
