import useRequest from '@/hooks/useRequest';
import { showNotification } from '@mantine/notifications';
import { useState } from 'react';

const useEventRequests = () => {
  const { callRequest } = useRequest();
  const [loading, setLoading] = useState(false);

  const createEventRequest = async (body: {
    title: string;
    description: string;
  }) => {
    setLoading(true);
    let response: (ICallRequestResponse & { event: IEvent }) | undefined;

    try {
      response = await callRequest<{ event: IEvent }>(
        'POST',
        '/api/v1/events',
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
      console.log('createEventRequest', error);
    }

    setLoading(false);
    return response;
  };

  const updateEventRequest = async (
    eventId: string,
    body: {
      title: string;
      description: string;
    },
  ) => {
    setLoading(true);
    let response: ICallRequestResponse | undefined;

    try {
      response = await callRequest('PUT', `/api/v1/events/${eventId}`, {
        body,
      });

      if (!response?.success) {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('updateEventRequest', error);
    }

    setLoading(false);
    return response;
  };

  return {
    loading,
    createEventRequest,
    updateEventRequest,
  };
};

export default useEventRequests;
