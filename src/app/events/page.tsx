'use client';

import { Page } from '@/features/shell';
import { EventsGroup, useFetchEvents } from '@/features/events';

export default function EventsPage() {
  const { data, isFetching } = useFetchEvents();

  return (
    <Page title="Events" loading={isFetching}>
      <EventsGroup events={data?.events} />
    </Page>
  );
}
