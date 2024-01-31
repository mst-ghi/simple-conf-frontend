'use client';

import { Page } from '@/components/shell';
import { notFound } from 'next/navigation';
import { CommunityCard, useFetchCommunity } from '@/components/communities';

export default function CommunityPage({ params }: { params: { id: string } }) {
  const { data, isFetching } = useFetchCommunity(params.id);

  if (!isFetching && !data?.community?.id) {
    notFound();
  }

  return (
    <Page
      title={isFetching ? 'Loading...' : data?.community?.title}
      loading={isFetching}
    >
      <CommunityCard community={data?.community} />
    </Page>
  );
}
