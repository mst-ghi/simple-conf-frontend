import { Button, Center, Flex, Loader, Stack, Text } from '@mantine/core';
import React from 'react';
import { CommentCard, CommentForm } from '.';
import { IconPlus } from '@tabler/icons-react';
import { closeAllModals, openModal } from '@mantine/modals';
import { useFetchComments } from '..';
import { useApp } from '@/hooks';

interface CommentsGroupProps {
  modelId: string;
  modelType: TCommentModelType;
}

const CommentsGroup = ({ modelId, modelType }: CommentsGroupProps) => {
  const { isLoggedIn } = useApp();

  const { data, isFetching, refetch } = useFetchComments({
    modelId,
    modelType,
  });

  const onOpenForm = () => {
    openModal({
      title: 'New Comment',
      children: (
        <CommentForm
          modelId={modelId}
          modelType={modelType}
          done={() => {
            refetch();
            closeAllModals();
          }}
        />
      ),
    });
  };

  return (
    <Stack>
      <Flex direction="row" align="center" justify="flex-end">
        <Button
          size="xs"
          variant="outline"
          leftSection={<IconPlus size={16} />}
          onClick={onOpenForm}
          disabled={!isLoggedIn}
        >
          New Comment
        </Button>
      </Flex>

      {isFetching && (
        <Center mih={100}>
          <Loader />
        </Center>
      )}

      {!isFetching && !data?.comments[0] && (
        <Text c="gray" tt="capitalize" size="sm">
          No Comments yet
        </Text>
      )}

      {!isFetching &&
        data?.comments[0] &&
        data.comments.map((comment) => {
          return (
            <CommentCard
              key={`comment-${comment.id}`}
              comment={comment}
              onReload={refetch}
            />
          );
        })}
    </Stack>
  );
};

export default CommentsGroup;
