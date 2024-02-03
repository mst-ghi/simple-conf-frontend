'use client';

import { EventForm } from '@/components/events/components';
import { Page } from '@/components/shell';
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
