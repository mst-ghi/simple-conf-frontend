import { FormErrors } from '@mantine/form';
import { Envs, getCookie, urlQueryString } from '@/utils';
import { SetStateAction, useState } from 'react';
import { showNotification } from '@mantine/notifications';

const useRequest = () => {
  const [calling, setCalling] = useState(false);

  const getBaseHeaders = (init?: any) => {
    const headers = init || {};

    if (!headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const accTkn = getCookie('sub-acc-tkn');
    if (accTkn) {
      headers['Authorization'] = `Bearer ${accTkn}`;
    }

    headers['x-timezone'] = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return headers;
  };

  const callRequest = async <T>(
    method: MakeRequestMethods = 'GET',
    path: string,
    init?: {
      body?: any;
      params?: any;
      headers?: any;
      withoutStringifyBody?: boolean;
    },
  ): Promise<ICallRequestResponse & T> => {
    setCalling(true);

    const headers = getBaseHeaders(init?.headers);
    let body = undefined;

    if (init?.body) {
      if (init?.withoutStringifyBody) {
        body = init?.body;
      } else {
        body = JSON.stringify(init?.body);
      }
    }

    let url = `${Envs.api.url}${path}`;

    if (init?.params) {
      url += '?' + urlQueryString(init.params);
    }

    const response = await fetch(url, {
      method,
      body,
      headers,
      redirect: 'manual',
    }).then(async (res) => {
      let success;
      let unprocessable;
      let internalError;
      let message;
      let data: any = {};
      let errors: SetStateAction<FormErrors> = {};

      try {
        if (res.status >= 500 && res.status < 600) {
          internalError = true;
        }

        internalError = res.status >= 500 && res.status < 600;
        success = res.status === 200;
        unprocessable = res.status === 422;

        let response = await res.json();

        message = response.message;
        data = response.data || {};
        errors = response.errors || {};

        if (internalError) {
          showNotification({
            color: 'red',
            message: message || 'Internal server error. Please contact support',
          });
        }
      } catch (error) {
        //
      }

      return {
        ...data,
        errors,
        message,
        success,
        unprocessable,
        internalError,
      };
    });

    setCalling(false);

    return response;
  };

  return {
    calling,
    getBaseHeaders,
    callRequest,
  };
};

export default useRequest;
