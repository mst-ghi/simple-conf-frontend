import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchUsers = (
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
    users: IUser[];
  }> => {
    let url = `/api/v1/users?page=${args.page || 0}&take=${args.take || 20}`;
    if (args.search) {
      url += `&search=${args.search}`;
    }
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    users: IUser[];
  }>({
    queryKey: ['users', args],
    queryFn: fetch,
  });

  return query;
};

export default useFetchUsers;
