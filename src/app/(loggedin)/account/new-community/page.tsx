'use client';

import { CommunityForm } from '@/features/communities';
import { Page } from '@/features/shell';
import { useRouter } from 'next/navigation';

export default function NewCommunity() {
  const router = useRouter();

  return (
    <Page title="New Community">
      <CommunityForm done={() => router.push('/account/own-communities')} />
    </Page>
  );
}
