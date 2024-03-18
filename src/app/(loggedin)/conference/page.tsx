'use client';

import { Page } from '@/features/shell';
import { Conference } from '@/features/conference';
import { notFound, useSearchParams } from 'next/navigation';

export default function ConfConferencePage() {
  const search = useSearchParams();
  const eventId = search.get('eventId');

  if (!eventId) {
    return notFound();
  }

  return (
    <Page title="Conference" unstyled>
      <Conference eventId={eventId} />
    </Page>
  );
}
