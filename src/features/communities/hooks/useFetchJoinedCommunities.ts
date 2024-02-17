import { useApp } from '@/hooks';
import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

type ResData = {
  communities: ICommunity[];
};

const useFetchJoinedCommunities = () => {
  const { setJoinedCommunities } = useApp();
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<ResData> => {
    const res = await callRequest<ResData>('GET', `/api/v1/communities/joined`);
    setJoinedCommunities(res.communities);
    return res;
  };

  const query = useQuery<ResData>({
    queryKey: ['joined-communities'],
    queryFn: fetchConversations,
    enabled: false,
  });

  return query;
};

export default useFetchJoinedCommunities;
