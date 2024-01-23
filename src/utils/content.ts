import queryString, { StringifyOptions } from 'query-string';

export function urlQueryString(
  object: Record<string, any>,
  options?: StringifyOptions,
) {
  return queryString.stringify(object, options);
}

export function toEnDigit(s: string) {
  return s.replace(/([۰-۹])/g, function (token) {
    return String.fromCharCode(token.charCodeAt(0) - 1728);
  });
}

export const truncateText = (text: string, length = 180, ending = '...') => {
  if (text.length > length) {
    return (
      text
        .substring(0, length - ending.length)
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .replace(/ +(?= )/g, '') + ending
    );
  }
  return text;
};

export const truncateHtmlText = (
  text: string,
  length = 180,
  ending = '...',
) => {
  if (text.length > length) {
    return (
      text
        .substring(0, length - ending.length)
        .replace(/(\r\n|\n|\r)/gm, ' ')
        .replace(/ +(?= )/g, '') + ending
    );
  }
  return text;
};
