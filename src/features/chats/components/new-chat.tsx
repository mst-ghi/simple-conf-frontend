import { ActionIcon, Box, Button } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import { NewChatForm } from '.';
import { useQueryClient } from '@tanstack/react-query';

const NewChat = () => {
  const client = useQueryClient();

  const onActionDone = (room: IRoom) => {
    client.invalidateQueries({ queryKey: ['rooms'] });
    closeAllModals();
  };

  const start = () => {
    openModal({
      title: 'Start new chat',
      closeOnClickOutside: false,
      closeOnEscape: false,
      children: <NewChatForm onActionDone={onActionDone} />,
    });
  };

  return (
    <ActionIcon variant="light" color="gray" onClick={start} size={36}>
      <IconPlus size={26} stroke={3} />
    </ActionIcon>
  );
};

export default NewChat;
