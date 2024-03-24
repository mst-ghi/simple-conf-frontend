'use client';

import { Button, Text } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';

interface ConferenceCodeProps {
  id: string;
  disabled?: boolean;
}

const ConferenceCode = ({ id, disabled }: ConferenceCodeProps) => {
  const clipboard = useClipboard({ timeout: 400 });

  return (
    <Button
      size="xs"
      variant="light"
      leftSection={<IconCopy size={18} />}
      color={clipboard.copied ? 'teal' : 'dark'}
      onClick={() => clipboard.copy(id)}
      disabled={disabled}
    >
      Copy Link
    </Button>
  );
};

export default ConferenceCode;
