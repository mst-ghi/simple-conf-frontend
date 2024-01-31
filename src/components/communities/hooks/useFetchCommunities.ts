import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchCommunities = (
  args: { page?: number | string; take?: number | string; search?: string } = {
    page: 0,
    take: 20,
  },
) => {
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<{
    communities: ICommunity[];
  }> => {
    let url = `/api/v1/communities?page=${args.page || 0}&take=${
      args.take || 20
    }`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    communities: ICommunity[];
  }>({
    queryKey: ['communities', args],
    queryFn: fetchConversations,
  });

  return query;
};

export default useFetchCommunities;
