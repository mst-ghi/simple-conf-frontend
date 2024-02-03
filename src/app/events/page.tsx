'use client';

import { Page } from '@/components/shell';
import { EventsGroup, useFetchEvents } from '@/components/events';

export default function EventsPage() {
  const { data, isFetching } = useFetchEvents();

  return (
    <Page title="Events" loading={isFetching}>
      <EventsGroup events={data?.events} />
    </Page>
  );
}
