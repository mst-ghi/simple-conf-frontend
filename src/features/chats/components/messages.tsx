import { useEffect, useRef, useState } from 'react';
import { Message } from '.';
import { Box, Center, Text } from '@mantine/core';

interface MessagesProps {
  initMessages?: IMessage[];
}

const Messages = ({ initMessages }: MessagesProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (initMessages) {
      setMessages(initMessages);
    }
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [initMessages]);

  if (!messages[0]) {
    return (
      <Center h="100%">
        <Text
          size="xs"
          fw={500}
          c="dimmed"
          p="lg"
          style={{ textAlign: 'center' }}
        >
          You have no messages to display
        </Text>
      </Center>
    );
  }

  return (
    <Box ref={ref} h={580} className="messages-view">
      {messages.map((message) => {
        return <Message key={message.id} message={message} />;
      })}
    </Box>
  );
};

export default Messages;
