'use client';

import { Page } from '@/components/shell';
import { notFound } from 'next/navigation';
import { EventCard, useFetchEvent } from '@/components/events';

export default function EventPage({ params }: { params: { id: string } }) {
  const { data, isFetching } = useFetchEvent(params.id);

  if (!isFetching && !data?.event?.id) {
    notFound();
  }

  return (
    <Page
      title={isFetching ? 'Loading...' : data?.event?.title}
      loading={isFetching}
    >
      <EventCard event={data?.event} />
    </Page>
  );
}
