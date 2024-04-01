import { ActionIcon, Blockquote, Box, Flex, Text } from '@mantine/core';
import { closeAllModals, openModal } from '@mantine/modals';
import { IconEdit } from '@tabler/icons-react';
import { CommentForm } from '.';

const CommentCard = ({
  comment,
  onReload,
}: {
  comment: IComment;
  onReload?: () => void;
}) => {
  const onOpenEditModal = () => {
    openModal({
      title: 'Edit Comment',
      children: (
        <CommentForm
          comment={comment}
          done={() => {
            if (onReload) {
              onReload();
            }
            closeAllModals();
          }}
        />
      ),
    });
  };

  return (
    <Blockquote
      color="gray"
      radius="lg"
      cite={`- ${comment.user.name}`}
      styles={{
        root: {
          padding: 8,
        },
        cite: {
          marginTop: 6,
        },
      }}
    >
      <Flex direction="row" gap="md">
        <Box style={{ flex: 1 }}>
          <Text fw={500} fz="sm">
            {comment.content}
          </Text>
        </Box>

        <ActionIcon size="sm" color="blue" onClick={onOpenEditModal}>
          <IconEdit />
        </ActionIcon>
      </Flex>
    </Blockquote>
  );
};

export default CommentCard;
