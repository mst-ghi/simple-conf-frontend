import { showNotification } from '@mantine/notifications';
import { useApp } from '@/hooks';
import useRequest from '@/hooks/useRequest';

const useCommunityActions = () => {
  const { isLoggedIn, user, joinedCommunities } = useApp();
  const { callRequest, calling } = useRequest();

  const isIJoined = (communityId: string) => {
    if (!isLoggedIn) {
      return false;
    }

    return Boolean(
      joinedCommunities?.find((community) => community.id === communityId),
    );
  };

  const isIOwner = (communityOwnerId: string) => {
    if (!isLoggedIn) {
      return false;
    }

    return user?.id === communityOwnerId;
  };

  const joinRequest = async (communityId: string) => {
    const res = await callRequest(
      'PUT',
      `/api/v1/communities/${communityId}/join`,
    );

    if (!res.success && res.errors.reason) {
      showNotification({ color: 'red', message: res.errors.reason });
    }
  };

  const leftRequest = async (communityId: string) => {
    const res = await callRequest(
      'PUT',
      `/api/v1/communities/${communityId}/left`,
    );

    if (!res.success && res.errors.reason) {
      showNotification({ color: 'red', message: res.errors.reason });
    }
  };

  return {
    loading: calling,
    isIJoined,
    isIOwner,
    joinRequest,
    leftRequest,
  };
};

export default useCommunityActions;
