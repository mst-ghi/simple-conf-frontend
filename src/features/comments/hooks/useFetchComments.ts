import useRequest from '@/hooks/useRequest';
import { useQuery } from '@tanstack/react-query';

const useFetchComments = (args: {
  modelId: string;
  modelType: TCommentModelType;
}) => {
  const { callRequest } = useRequest();

  const fetchComments = async (): Promise<{
    comments: IComment[];
  }> => {
    let url = `/api/v1/comments?model_id=${args.modelId}&model_type=${
      args.modelType || 3
    }`;
    return await callRequest('GET', url);
  };

  const query = useQuery<{
    comments: IComment[];
  }>({
    queryKey: ['comments', args],
    queryFn: fetchComments,
  });

  return query;
};

export default useFetchComments;
