import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchCommunityEvents = (
  args: {
    page?: number | string;
    take?: number | string;
    communityId?: string;
  } = {
    page: 0,
    take: 20,
    communityId: undefined,
  },
  enabled?: boolean,
) => {
  const { callRequest } = useRequest();

  const fetchEvents = async (): Promise<{
    events: IEvent[];
    meta: IPaginationMeta;
  }> => {
    let url = `/api/v1/events?page=${args.page || 0}&take=${args.take || 20}`;

    if (args.communityId) {
      url += `&community_id=${args.communityId}`;
    }

    return await callRequest('GET', url);
  };

  const query = useQuery<{
    events: IEvent[];
    meta: IPaginationMeta;
  }>({
    queryKey: ['events', args],
    queryFn: fetchEvents,
    enabled,
  });

  return query;
};

export default useFetchCommunityEvents;
