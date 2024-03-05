'use client';

import { Page } from '@/features/shell';
import { EventsGroup, useFetchEvents } from '@/features/events';
import { useState } from 'react';
import { PaginationMeta } from '@/features/common';

export default function EventsPage() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchEvents({ page });

  return (
    <Page title="Events" loading={isFetching}>
      <EventsGroup events={data?.events} />
      <PaginationMeta meta={data?.meta} page={page} setPage={setPage} />
    </Page>
  );
}
