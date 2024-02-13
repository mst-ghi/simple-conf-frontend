import { UsersSelectInput } from '@/features/users';
import useRequest from '@/hooks/useRequest';
import { Button, Card, CardProps, Flex } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

interface NewChatFormProps extends CardProps {
  onActionDone?: (room: IRoom) => void;
}

const NewChatForm = ({ onActionDone, ...props }: NewChatFormProps) => {
  const { callRequest, calling } = useRequest();
  const [selectUser, setSelectUser] = useState<IUser>();

  const startNewChat = async () => {
    const body = {
      user_ids: [selectUser?.id],
      title: selectUser?.name,
      description: selectUser?.email,
      mode: 'private',
    };

    try {
      const res = await callRequest<{ room: IRoom }>('POST', '/api/v1/rooms', {
        body,
      });
      if (onActionDone) {
        onActionDone(res.room);
      }
    } catch (error) {
      showNotification({
        color: 'red',
        message: 'Start chat with this user has error, please try again',
      });
    }
  };

  return (
    <Card {...props}>
      <Flex direction="column" gap="md">
        <UsersSelectInput label="Select user:" onSelectUser={setSelectUser} />

        <Button
          disabled={!selectUser?.id}
          loading={calling}
          onClick={() => startNewChat()}
        >
          Start
        </Button>
      </Flex>
    </Card>
  );
};

export default NewChatForm;
