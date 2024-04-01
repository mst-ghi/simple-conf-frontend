'use client';

import { Fragment, useEffect } from 'react';

import {
  AppShell,
  Box,
  MantineProvider,
  MantineProviderProps,
  ScrollArea,
} from '@mantine/core';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Notifications } from '@mantine/notifications';
import { ModalsProvider } from '@mantine/modals';

import useApp from '@/hooks/useApp';
import { PageHeader } from '.';
import { BaseTheme } from '@/utils';
import { FireFly, FullLoader } from '../common';
import { useSocketIO } from '@/hooks';
import { CallProvider } from '../call';

const queryClient = new QueryClient();

interface BaseShellProps extends MantineProviderProps {
  isInvalidToken?: boolean;
  user?: IUser;
  joinedCommunities?: ICommunity[];
}

const BaseShell = ({
  isInvalidToken = false,
  user,
  joinedCommunities,
  children,
  ...props
}: BaseShellProps) => {
  const {
    isLoading,
    isLoggedIn,
    setIsInvalidToken,
    setUser,
    setJoinedCommunities,
    setIsLoading,
  } = useApp();

  const { actions } = useSocketIO();

  useEffect(() => {
    setIsInvalidToken(isInvalidToken);
    setUser(user);
    setJoinedCommunities(joinedCommunities);

    const timeout = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isLoading && isLoggedIn) {
      actions.connect();
    }
  }, [isLoading, isLoggedIn]);

  return (
    <QueryClientProvider client={queryClient}>
      <FireFly />

      <MantineProvider
        defaultColorScheme="light"
        withCssVariables
        theme={BaseTheme}
        {...props}
      >
        <Notifications limit={7} autoClose={5000} containerWidth={320} />

        <ModalsProvider
          modalProps={{
            centered: true,
            scrollAreaComponent: ScrollArea.Autosize,
            overlayProps: {
              opacity: 0.55,
              blur: 3,
            },
          }}
          labels={{ confirm: 'Yes', cancel: 'No' }}
        >
          {isLoading && <FullLoader />}

          <AppShell
            withBorder={false}
            styles={{
              header: {
                backgroundColor: 'transparent',
              },
              footer: {
                position: 'relative',
                backgroundColor: 'transparent',
              },
              main: {
                padding: 0,
              },
              root: {
                padding: 0,
              },
            }}
          >
            {!isLoading && (
              <Fragment>
                <CallProvider />

                <AppShell.Header>
                  <PageHeader />
                </AppShell.Header>

                <AppShell.Main mt="md">
                  <ScrollArea type="always" h="100vh" pt={60}>
                    <Box
                      px="sm"
                      pb="sm"
                      pt={0}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '100%',
                        width: '100%',
                      }}
                    >
                      {children}
                    </Box>
                  </ScrollArea>
                </AppShell.Main>
              </Fragment>
            )}
          </AppShell>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  );
};

export default BaseShell;
