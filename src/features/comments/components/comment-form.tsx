import { useEffect } from 'react';
import { z } from 'zod';

import { useForm, zodResolver } from '@mantine/form';
import { IconLetterCase } from '@tabler/icons-react';

import { Button, Group, Text, Textarea } from '@mantine/core';
import { useCommentRequests } from '../hooks';

type CommentFormValues = {
  model_id: string;
  model_type: TCommentModelType | string;
  content: string;
};

const CommentFormSchema = z
  .object({
    model_id: z.string(),
    model_type: z.string(),
    content: z.string().min(2).max(255),
  })
  .required();

const CommentForm = ({
  modelId,
  modelType,
  comment,
  done,
}: {
  modelId?: string;
  modelType?: TCommentModelType;
  comment?: IComment;
  done?: () => void;
}) => {
  const { loading, createCommentRequest, updateCommentRequest } =
    useCommentRequests();

  const form = useForm<CommentFormValues>({
    initialValues: {
      model_id: modelId || '',
      model_type: modelType || '',
      content: '',
    },
    validate: zodResolver(CommentFormSchema),
  });

  const handleSubmit = async (values: CommentFormValues) => {
    let res: ICallRequestResponse | undefined;

    if (comment?.id) {
      res = await updateCommentRequest(comment?.id, {
        content: values.content,
      });
    } else {
      res = await createCommentRequest(values);
    }

    if (res?.unprocessable) {
      form.setErrors(res.errors);
    }

    if (res?.success) {
      form.setFieldValue('content', '');

      if (done) {
        done();
      }
    }
  };

  useEffect(() => {
    if (modelId) {
      form.setFieldValue('model_id', modelId);
    }
    if (modelType) {
      form.setFieldValue('model_type', modelType);
    }
  }, [modelId, modelType]);

  useEffect(() => {
    if (comment) {
      form.setFieldValue('model_id', comment.model_id);
      form.setFieldValue('model_type', comment.model_type);
      form.setFieldValue('content', comment.content);
    }
  }, [comment]);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Textarea
        minLength={2}
        maxLength={255}
        withAsterisk
        label="Enter your comment"
        leftSection={<IconLetterCase size={14} />}
        rightSection={<Text pr={6}>{255 - form.values.content.length}</Text>}
        {...form.getInputProps('content')}
      />

      <Group justify="flex-end" mt="xs">
        <Button
          type="submit"
          variant="light"
          size="md"
          loading={loading}
          disabled={!form.isValid()}
        >
          {comment?.id ? 'Update' : 'Submit'}
        </Button>
      </Group>
    </form>
  );
};

export default CommentForm;
