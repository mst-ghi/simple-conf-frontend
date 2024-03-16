import { Alert } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';

const EventOverAlert = ({ enable }: { enable: boolean }) => {
  if (!enable) {
    return null;
  }

  return (
    <Alert
      mb="md"
      color="orange"
      icon={<IconAlertCircle />}
      title="The event is now over. Please write your comments to improve the quality of events. Thanks"
    />
  );
};

export default EventOverAlert;
