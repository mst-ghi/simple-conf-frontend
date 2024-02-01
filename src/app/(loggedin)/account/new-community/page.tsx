'use client';

import { CommunityForm } from '@/components/communities';
import { Page } from '@/components/shell';
import { useRouter } from 'next/navigation';

export default function NewCommunity() {
  const router = useRouter();

  return (
    <Page title="New Community">
      <CommunityForm done={() => router.push('/account/own-communities')} />
    </Page>
  );
}
