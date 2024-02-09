import { ActionIcon, Flex, TextInput } from '@mantine/core';
import { IconSend } from '@tabler/icons-react';

const MessageForm = () => {
  return (
    <Flex
      direction="row"
      justify="space-between"
      align="center"
      w="100%"
      h={64}
      gap="xs"
    >
      <TextInput
        variant="filled"
        w="100%"
        placeholder="Type message here ..."
        size="lg"
      />
      <ActionIcon size={50} color="blue">
        <IconSend />
      </ActionIcon>
    </Flex>
  );
};

export default MessageForm;
