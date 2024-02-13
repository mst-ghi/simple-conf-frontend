'use client';

import { Button, Text } from '@mantine/core';
import { IconCopy } from '@tabler/icons-react';
import { useClipboard } from '@mantine/hooks';

interface ConfCodeProps {
  code: string;
}

const ConfCode = ({ code }: ConfCodeProps) => {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Button
      w={164}
      variant="subtle"
      leftSection={<IconCopy size={20} />}
      color={clipboard.copied ? 'teal' : undefined}
      onClick={() => clipboard.copy(code)}
    >
      <Text tt="lowercase" fw={500}>
        {code}
      </Text>
    </Button>
  );
};

export default ConfCode;
