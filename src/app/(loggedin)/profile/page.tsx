'use client';

import { Page } from '@/components/shell';
import { useApp } from '@/hooks';

export default function ConfPage() {
  const { user } = useApp();

  return <Page title={user?.name + ' Profile'}>Profile</Page>;
}
