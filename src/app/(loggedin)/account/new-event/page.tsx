'use client';

import { EventForm } from '@/features/events/components';
import { Page } from '@/features/shell';
import { useRouter, useSearchParams } from 'next/navigation';

export default function NewEvent() {
  const router = useRouter();
  const sp = useSearchParams();

  return (
    <Page title="New Event">
      <EventForm
        communityId={sp.get('communityId')}
        done={() => router.push('/account')}
      />
    </Page>
  );
}
