'use client';

import { CommunitiesGroup, useFetchCommunities } from '@/features/communities';
import { Page } from '@/features/shell';

export default function OwnCommunities() {
  const { data, isFetching } = useFetchCommunities({ own: true });

  return (
    <Page title="Own Communities" loading={isFetching}>
      <CommunitiesGroup communities={data?.communities} />
    </Page>
  );
}
