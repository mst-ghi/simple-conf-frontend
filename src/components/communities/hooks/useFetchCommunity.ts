import useRequest from '@/hooks/useRequest';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const useFetchCommunity = (
  id?: string,
  options?: Omit<
    UseQueryOptions<{
      community: ICommunity;
    }>,
    'queryFn' | 'queryKey'
  >,
) => {
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<{
    community: ICommunity;
  }> => {
    return await callRequest('GET', `/api/v1/communities/${id}`);
  };

  const query = useQuery<{
    community: ICommunity;
  }>({
    queryKey: ['community', id],
    queryFn: fetchConversations,
    enabled: !!id,
    ...options,
  });

  return query;
};

export default useFetchCommunity;
