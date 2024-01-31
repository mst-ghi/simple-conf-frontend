import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchCommunity = (id: string) => {
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<{
    community: ICommunity;
  }> => {
    return await callRequest('GET', `/api/v1/communities/${id}/show`);
  };

  const query = useQuery<{
    community: ICommunity;
  }>({
    queryKey: ['community', id],
    queryFn: fetchConversations,
  });

  return query;
};

export default useFetchCommunity;
