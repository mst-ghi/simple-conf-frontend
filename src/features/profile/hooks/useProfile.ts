import useRequest from '@/hooks/useRequest';
import { useState } from 'react';

const useProfile = () => {
  const { callRequest } = useRequest();

  const [loading, setLoading] = useState(false);

  return {};
};

export default useProfile;
