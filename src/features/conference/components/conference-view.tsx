import { Card } from '@mantine/core';
import { ConferenceActionBar, ConferenceContent } from '.';

const ConferenceView = () => {
  return (
    <Card bg="gray.1" withBorder={false} h="85vh" pos="relative" p={0}>
      <ConferenceContent />
      <ConferenceActionBar />
    </Card>
  );
};

export default ConferenceView;
