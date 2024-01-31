import { useApp } from '@/hooks';

const useCommunityActions = () => {
  const { isLoggedIn, user, joinedCommunities } = useApp();

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

  return {
    isIJoined,
    isIOwner,
  };
};

export default useCommunityActions;
