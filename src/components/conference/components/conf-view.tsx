import { Card, Flex, ScrollArea } from '@mantine/core';
import { ConfActionBar, ConfCode, ConfContent, ConfUserCard } from '.';

const ConfView = () => {
  return (
    <Card bg="gray.1" withBorder={false} h="87vh" pos="relative" p={0}>
      <ConfCode code="chu-tose-udh" />

      <ConfContent />

      <ConfActionBar />
    </Card>
  );
};

export default ConfView;
