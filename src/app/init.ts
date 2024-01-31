import { Envs, getExactCookieName } from '@/utils';
import { cookies } from 'next/headers';

const fetchJoinedCommunities = async (options: object) => {
  let joinedCommunities = [];

  try {
    const { res, status } = await fetch(
      `${Envs.api.url}/api/v1/communities/joined`,
      options,
    ).then(async (res) => ({ status: res.status, res: await res.json() }));

    if (status === 200) {
      joinedCommunities = res.data.communities;
    }
  } catch (error) {
    console.log('init data', error);
  }

  return joinedCommunities;
};

const fetchUserInitData = async (options: object) => {
  let isInvalidToken;
  let user;

  try {
    const { res, status } = await fetch(
      `${Envs.api.url}/api/v1/auth/user`,
      options,
    ).then(async (res) => ({ status: res.status, res: await res.json() }));

    if (status === 200) {
      user = res.data.user;
    } else {
      isInvalidToken = true;
    }
  } catch (error) {
    isInvalidToken = true;
  }

  return {
    user,
    isInvalidToken,
  };
};

const init = async () => {
  let isInvalidToken;
  let user;
  let joinedCommunities = [];

  const cookie = cookies();
  const token = cookie.get(getExactCookieName('sub-acc-tkn'));

  if (token && token.value) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    };

    const res = await fetchUserInitData(options);
    user = res.user;
    isInvalidToken = res.isInvalidToken;

    if (!res.isInvalidToken) {
      joinedCommunities = await fetchJoinedCommunities(options);
    }
  }

  return {
    user,
    isInvalidToken,
    joinedCommunities,
  };
};

export default init;
