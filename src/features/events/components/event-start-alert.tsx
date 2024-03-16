import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const EventStartAlert = ({ enable }: { enable: boolean }) => {
  if (!enable) {
    return null;
  }

  return (
    <Alert
      mb="md"
      color="green"
      icon={<IconAlertCircle />}
      title="The event has already been held. To join, click the join button and use its information."
    />
  );
};

export default EventStartAlert;
