'use client';

import { useEffect } from 'react';
import { EmptyPage } from '@/components/shell';
import { useApp } from '@/hooks';
import { useRouter } from 'next/navigation';

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isLoggedIn } = useApp();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/login');
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return <EmptyPage>{children}</EmptyPage>;
}
