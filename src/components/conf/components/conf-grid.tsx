'use client';

import { Grid } from '@mantine/core';
import { ConfSidebar, ConfView } from '.';
import useApp from '@/hooks/useApp';

const ConfGrid = () => {
  const { screenSharingStatus } = useApp();

  return (
    <Grid>
      <Grid.Col span={screenSharingStatus ? 10 : 12}>
        <ConfView />
      </Grid.Col>

      {screenSharingStatus && (
        <Grid.Col span={2}>
          <ConfSidebar />
        </Grid.Col>
      )}
    </Grid>
  );
};

export default ConfGrid;
