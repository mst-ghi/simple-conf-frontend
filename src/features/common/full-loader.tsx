'use client';

import { Box, Loader } from '@mantine/core';

const FullLoader = () => {
  return (
    <Box
      style={{
        minHeight: '100vh',
        minWidth: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999,
      }}
    >
      <Loader size="xl" />
    </Box>
  );
};

export default FullLoader;
