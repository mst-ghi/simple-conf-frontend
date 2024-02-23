import { useSocketIO } from '@/hooks';
import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchMessages = (
  args: {
    roomId?: number | string;
    page?: number | string;
    take?: number | string;
    search?: string;
  } = {
    page: 0,
    take: 20,
  },
) => {
  const { room } = useSocketIO();
  const { callRequest } = useRequest();

  const fetch = async (): Promise<{
    messages: IMessage[];
  }> => {
    let url = `/api/v1/messages?room_id=${room.id}&page=${args.page || 0}&take=${args.take || 20}`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    messages: IMessage[];
  }>({
    queryKey: ['messages', room.id],
    queryFn: fetch,
    enabled: !!room.id,
  });

  return { ...query, room };
};

export default useFetchMessages;
