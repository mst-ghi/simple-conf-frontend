import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchRooms = (
  args: {
    page?: number | string;
    take?: number | string;
    search?: string;
  } = {
    page: 0,
    take: 20,
  },
) => {
  const { callRequest } = useRequest();

  const fetch = async (): Promise<{
    rooms: IRoom[];
  }> => {
    let url = `/api/v1/rooms?page=${args.page || 0}&take=${args.take || 20}`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    rooms: IRoom[];
  }>({
    queryKey: ['rooms', args],
    queryFn: fetch,
  });

  return query;
};

export default useFetchRooms;
