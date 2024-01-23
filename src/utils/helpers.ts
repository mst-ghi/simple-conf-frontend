export const isProduction = (() => {
  return process.env.NODE_ENV === 'production';
})();

export const isDevelopment = (() => {
  return process.env.NODE_ENV === 'development';
})();

export const forceReload = (toUrl?: string) => {
  if (typeof window) {
    location.href = toUrl || location.href;
  }
};

export const cleanUrl = (url?: string) => {
  if (url?.substring(url.length - 1) === '/') {
    return url?.substring(0, url.length - 1);
  }
  return url || '';
};
