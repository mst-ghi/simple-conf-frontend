'use client';

import {
  CommunitiesGroup,
  useFetchCommunities,
} from '@/components/communities';
import { Page } from '@/components/shell';

export default function OwnCommunities() {
  const { data, isFetching } = useFetchCommunities({ own: true });

  return (
    <Page title="Own Communities" loading={isFetching}>
      <CommunitiesGroup communities={data?.communities} />
    </Page>
  );
}
