'use client';

import { Page } from '@/features/shell';
import { ConfGrid } from '@/features/conference';

export default function ConfPage() {
  return (
    <Page title="Conference" unstyled>
      <ConfGrid />
    </Page>
  );
}
