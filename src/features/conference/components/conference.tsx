'use client';

import { Grid } from '@mantine/core';
import { ConferenceSidebar, ConferenceView } from '.';
import useApp from '@/hooks/useApp';

const Conference = ({ event }: { event?: IEvent }) => {
  const { screenSharingStatus } = useApp();

  if (!event) {
    return null;
  }

  return (
    <Grid>
      <Grid.Col span={screenSharingStatus ? 10 : 12}>
        <ConferenceView />
      </Grid.Col>

      {screenSharingStatus && (
        <Grid.Col span={2}>
          <ConferenceSidebar />
        </Grid.Col>
      )}
    </Grid>
  );
};

export default Conference;
