'use client';

import { Page } from '@/components/shell';
import {
  CommunitiesGroup,
  useFetchCommunities,
} from '@/components/communities';

export default function CommunitiesPage() {
  const { data, isFetching } = useFetchCommunities();

  return (
    <Page title="Communities" loading={isFetching}>
      <CommunitiesGroup communities={data?.communities} />
    </Page>
  );
}
