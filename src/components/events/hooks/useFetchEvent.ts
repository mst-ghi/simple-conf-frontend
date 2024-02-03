import useRequest from '@/hooks/useRequest';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useFetchEvent = (
  id?: string,
  options?: Omit<
    UseQueryOptions<{
      event: IEvent;
    }>,
    'queryFn' | 'queryKey'
  >,
) => {
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<{
    event: IEvent;
  }> => {
    return await callRequest('GET', `/api/v1/events/${id}`);
  };

  const query = useQuery<{
    event: IEvent;
  }>({
    queryKey: ['event', id],
    queryFn: fetchConversations,
    enabled: !!id,
    ...options,
  });

  return query;
};

export default useFetchEvent;
