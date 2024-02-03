import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import '@/styles/app.css';

import { ColorSchemeScript } from '@mantine/core';
import { BaseShell } from '@/components/shell';

import { Envs } from '@/utils';
import init from './init';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initData = await init();

  return (
    <html lang="en">
      <head>
        <title>{Envs.app.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={Envs.app.description} />
        <link rel="icon" href="/favicon.ico" />
        <ColorSchemeScript defaultColorScheme="light" />
      </head>

      <body suppressHydrationWarning>
        <BaseShell {...initData}>{children}</BaseShell>
      </body>
    </html>
  );
}
