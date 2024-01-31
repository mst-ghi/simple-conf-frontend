import useRequest from '@/hooks/useRequest';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

const useCommunityRequests = () => {
  const { callRequest } = useRequest();
  const [loading, setLoading] = useState(false);

  const createCommunityRequest = async (body: {
    title: string;
    description: string;
  }) => {
    setLoading(true);
    let response:
      | (ICallRequestResponse & { community: ICommunity })
      | undefined;

    try {
      response = await callRequest<{ community: ICommunity }>(
        'POST',
        '/api/v1/communities',
        {
          body,
        },
      );

      if (!response?.success) {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('createCommunityRequest', error);
    }

    setLoading(false);
    return response;
  };

  const updateCommunityRequest = async (
    communityId: string,
    body: {
      title: string;
      description: string;
    },
  ) => {
    setLoading(true);
    let response: ICallRequestResponse | undefined;

    try {
      response = await callRequest(
        'PUT',
        `/api/v1/communities/${communityId}`,
        {
          body,
        },
      );

      if (!response?.success) {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('updateCommunityRequest', error);
    }

    setLoading(false);
    return response;
  };

  return {
    loading,
    createCommunityRequest,
    updateCommunityRequest,
  };
};

export default useCommunityRequests;
