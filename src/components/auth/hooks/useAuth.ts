import { useState } from 'react';
import { showNotification } from '@mantine/notifications';
import useRequest from '@/hooks/useRequest';
import { forceReload, removeAllCookies, setCookie } from '@/utils';
import { useApp } from '@/hooks';

const useAuth = () => {
  const states = useApp();
  const { callRequest } = useRequest();

  const [loading, setLoading] = useState(false);

  const setTokensToCookies = (tokens: ITokens) => {
    setCookie('sub-acc-tkn', tokens.access_token);
    setCookie('sub-ref-tkn', tokens.refresh_token);
    setCookie('sub-exp-tkn', tokens.expires_at);
  };

  const clearAuthData = () => {
    states.setUser();
    removeAllCookies();
  };

  const logout = () => {
    clearAuthData();
    forceReload('/');
  };

  const fetchUser = async () => {
    let user;
    states.setIsLoading(true);

    try {
      const response = await callRequest<{ user: IUser }>(
        'GET',
        '/api/v1/auth/user',
      );

      if (response.success) {
        states.setUser(response.user);
        user = response.user;
      }
    } catch (error) {
      console.log('fetchUser', error);
    }

    states.setIsLoading(false);
    return user;
  };

  const loginRequest = async (
    body: {
      email: string;
      password: string;
    },
    redirectUrl = '/',
  ) => {
    setLoading(true);
    let response: (ICallRequestResponse & { tokens: ITokens }) | undefined;

    try {
      response = await callRequest<{ tokens: ITokens }>(
        'POST',
        '/api/v1/auth/login',
        {
          body,
        },
      );

      if (response?.success) {
        setTokensToCookies(response.tokens);
        forceReload(redirectUrl);
      } else {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('loginRequest', error);
    }

    setLoading(false);
    return response;
  };

  const registerRequest = async (
    body: {
      email: string;
      name: string;
      password: string;
    },
    redirectUrl = '/',
  ) => {
    setLoading(true);
    let response: (ICallRequestResponse & { tokens: ITokens }) | undefined;

    try {
      response = await callRequest<{ tokens: ITokens }>(
        'POST',
        '/api/v1/auth/register',
        {
          body,
        },
      );

      if (response?.success) {
        forceReload(redirectUrl);
      } else {
        showNotification({
          color: 'red',
          message: response.message,
        });
      }
    } catch (error) {
      console.log('registerRequest', error);
    }

    setLoading(false);
    return response;
  };

  return {
    ...states,
    loading,
    setTokensToCookies,
    clearAuthData,
    refetchUser: fetchUser,
    loginRequest,
    registerRequest,
    logout,
  };
};

export default useAuth;
