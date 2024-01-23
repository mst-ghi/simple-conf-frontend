import { Envs, getExactCookieName } from '@/utils';
import { cookies } from 'next/headers';

const fetchUserInitData = async () => {
  let user;
  let isInvalidToken;

  const cookie = cookies();
  const token = cookie.get(getExactCookieName('sub-acc-tkn'));

  if (token && token.value) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    };

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
  }

  return {
    user,
    isInvalidToken,
  };
};

const init = async () => {
  const { user, isInvalidToken } = await fetchUserInitData();

  return {
    user,
    isInvalidToken,
  };
};

export default init;
