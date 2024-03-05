import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchCommunities = (
  args: {
    page?: number | string;
    take?: number | string;
    search?: string;
    own?: boolean;
  } = {
    page: 0,
    take: 3,
    own: false,
  },
) => {
  const { callRequest } = useRequest();

  const fetchConversations = async (): Promise<{
    communities: ICommunity[];
    meta: IPaginationMeta;
  }> => {
    let url = `/api/v1/communities${args.own ? '/own' : ''}?page=${args.page || 0}&take=${
      args.take || 3
    }`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return callRequest('GET', url);
  };

  const query = useQuery<{
    communities: ICommunity[];
    meta: IPaginationMeta;
  }>({
    queryKey: ['communities', args],
    queryFn: fetchConversations,
  });

  return query;
};

export default useFetchCommunities;
