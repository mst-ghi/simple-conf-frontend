'use client';

import { Button, Text } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';

interface ConferenceCodeProps {
  code: string;
}

const ConferenceCode = ({ code }: ConferenceCodeProps) => {
  const clipboard = useClipboard({ timeout: 400 });

  return (
    <Button
      w={120}
      size="xs"
      variant="light"
      leftSection={<IconCopy size={18} />}
      color={clipboard.copied ? 'teal' : 'dark'}
      onClick={() => clipboard.copy(code)}
    >
      Copy Code
    </Button>
  );
};

export default ConferenceCode;
