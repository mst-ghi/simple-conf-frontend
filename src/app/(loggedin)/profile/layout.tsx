'use client';

import { UserHeroCard } from '@/components/profile';
import { Box, Container, Flex } from '@mantine/core';

export default function LoggedInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container w="100%" mt="sm">
      <Flex direction="column" align="center" gap="md">
        <UserHeroCard />
        <Box w="100%">{children}</Box>
      </Flex>
    </Container>
  );
}
