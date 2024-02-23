import { useApp, useSocketIO } from '@/hooks';
import { Events } from '@/utils';
import { ActionIcon, Flex, TextInput } from '@mantine/core';
import { useDebouncedState } from '@mantine/hooks';
import { IconSend } from '@tabler/icons-react';
import { useMemo, useRef } from 'react';
const MessageForm = () => {
  const { user } = useApp();
  const { actions, room } = useSocketIO();

  const refInput = useRef<HTMLInputElement>(null);
  const [content, setContent] = useDebouncedState<string>('', 500);

  const isActive = useMemo(() => {
    return Boolean(content && user?.id && room.id);
  }, [content, user, room.id]);

  const onSendMessage = () => {
    if (isActive) {
      actions.emit({
        event: Events.message.send,
        data: {
          RoomId: room.id,
          Content: content,
        },
      });

      setContent('');

      if (refInput.current) {
        refInput.current.value = '';
        refInput.current.focus();
      }
    }
  };

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
        ref={refInput}
        defaultValue={content}
        onChange={(e) => setContent(e.target.value)}
        variant="filled"
        w="100%"
        placeholder="Type message here ..."
        size="lg"
        onKeyUp={(e) => {
          if (e.key === 'Enter' && isActive) {
            onSendMessage();
          }
        }}
      />
      <ActionIcon
        size={50}
        color="blue"
        disabled={!isActive}
        onClick={onSendMessage}
      >
        <IconSend />
      </ActionIcon>
    </Flex>
  );
};

export default MessageForm;
