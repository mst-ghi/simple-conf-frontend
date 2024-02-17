import { useApp } from '@/hooks';
import { dateView } from '@/utils';
import { Avatar, Box, Card, Flex, Group, Text } from '@mantine/core';

const Message = ({ message }: { message: IMessage }) => {
  const { user } = useApp();
  const isOwner = user?.id === message.user.id;

  return (
    <Box dir={isOwner ? 'rtl' : 'ltr'}>
      <Card
        withBorder={false}
        style={{
          maxWidth: '70%',
          width: 'fit-content',
          blockSize: 'fit-content',
          borderEndEndRadius: 28,
          borderTopRightRadius: !isOwner ? 28 : undefined,
          borderTopLeftRadius: isOwner ? 28 : undefined,
        }}
      >
        <Text dir="ltr" fw={500} size="xs">
          {message.content}
        </Text>

        <Flex direction="row" align="center" justify="end" mt={8}>
          <Text fw={300} fz={10}>
            {dateView(message.created_at, 'normal-date-time')}
          </Text>
        </Flex>
      </Card>
    </Box>
  );
};

export default Message;
