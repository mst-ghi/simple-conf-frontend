'use client';

import { Fragment } from 'react';
import { EmptyPage } from '@/features/shell';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <EmptyPage>{children}</EmptyPage>
    </Fragment>
  );
}
