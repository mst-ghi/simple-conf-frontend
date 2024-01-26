'use client';

import { Page } from '@/components/shell';
import { ConfGrid } from '@/components/conf';

export default function ConfPage() {
  return (
    <Page title="Conference" unstyled>
      <ConfGrid />
    </Page>
  );
}
