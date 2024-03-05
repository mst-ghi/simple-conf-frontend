'use client';

import { Page } from '@/features/shell';
import { CommunitiesGroup, useFetchCommunities } from '@/features/communities';
import { PaginationMeta } from '@/features/common';
import { useState } from 'react';

export default function CommunitiesPage() {
  const [page, setPage] = useState(1);
  const { data, isFetching } = useFetchCommunities({ page });

  return (
    <Page title="Communities" loading={isFetching}>
      <CommunitiesGroup communities={data?.communities} />
      <PaginationMeta meta={data?.meta} page={page} setPage={setPage} />
    </Page>
  );
}
