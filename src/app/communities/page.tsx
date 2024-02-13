'use client';

import { Page } from '@/features/shell';
import { CommunitiesGroup, useFetchCommunities } from '@/features/communities';

export default function CommunitiesPage() {
  const { data, isFetching } = useFetchCommunities();

  return (
    <Page title="Communities" loading={isFetching}>
      <CommunitiesGroup communities={data?.communities} />
    </Page>
  );
}
