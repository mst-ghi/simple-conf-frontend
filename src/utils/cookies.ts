import Cookies from 'js-cookie';

export const cookiesPrefix = '__vid-conf-';

export type CookiesKeyProps = 'sub-acc-tkn' | 'sub-ref-tkn' | 'sub-exp-tkn';

export const getExactCookieName = (keyName: CookiesKeyProps) => {
  return `${cookiesPrefix}${keyName}`;
};

export const getCookieFromCtxRequest = (
  keyName: CookiesKeyProps,
  cookies: { [key: string]: string },
) => {
  if (cookies) {
    return cookies[getExactCookieName(keyName)];
  }
  return undefined;
};

export const setCookie = (
  keyName: CookiesKeyProps,
  value: unknown,
  options: object | undefined = undefined,
) => {
  let data: string;
  if (typeof value === 'string') {
    data = value;
  } else {
    data = JSON.stringify(value);
  }
  Cookies.set(`${cookiesPrefix}${keyName}`, data, {
    secure: process.env.NODE_ENV === 'production',
    expires: 365,
    ...options,
  });
};

export const getCookie = (
  keyName: CookiesKeyProps,
  type: 'as-string' | 'as-json' = 'as-string',
) => {
  const value = Cookies.get(`${cookiesPrefix}${keyName}`);
  if (value && type === 'as-json') {
    return JSON.parse(value);
  }
  return value;
};

export const getCookieFrom = (
  serverSideCookies: { [key: string]: string },
  keyName: CookiesKeyProps,
  type: 'as-string' | 'as-json' = 'as-string',
) => {
  if (!serverSideCookies) return null;
  const value = serverSideCookies[`${cookiesPrefix}${keyName}`];
  if (value && type === 'as-json') {
    return JSON.parse(value);
  }
  return value;
};

export const removeCookie = (keyName: CookiesKeyProps) => {
  return Cookies.remove(`${cookiesPrefix}${keyName}`);
};

export const removeAllCookies = () => {
  return Object.keys(Cookies.get()).forEach((cookieName) => {
    Cookies.remove(cookieName);
  });
};
