import useRequest from '@/hooks/useRequest';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

const useCommentRequests = () => {
  const { callRequest } = useRequest();
  const [loading, setLoading] = useState(false);

  const createCommentRequest = async (body: {
    content: string;
    model_id: string;
    model_type: TCommentModelType | string;
  }) => {
    setLoading(true);
    let response: (ICallRequestResponse & { comment: IComment }) | undefined;

    try {
      response = await callRequest<{ comment: IComment }>(
        'POST',
        '/api/v1/comments',
        { body },
      );

      if (!response?.success) {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('createCommentRequest', error);
    }

    setLoading(false);
    return response;
  };

  const updateCommentRequest = async (
    commentId: string,
    body: {
      content: string;
    },
  ) => {
    setLoading(true);
    let response: ICallRequestResponse | undefined;

    try {
      response = await callRequest('PUT', `/api/v1/comments/${commentId}`, {
        body,
      });

      if (!response?.success) {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('updateCommentRequest', error);
    }

    setLoading(false);
    return response;
  };

  return {
    loading,
    createCommentRequest,
    updateCommentRequest,
  };
};

export default useCommentRequests;
