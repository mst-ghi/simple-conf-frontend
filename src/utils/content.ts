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

export const pascalCase = (str: string) => {
  return `${str}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      (_, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`,
    )
    .replace(new RegExp(/\w/), (s) => s.toUpperCase());
};

export const titleCase = (str?: string) => {
  if (!str) {
    return undefined;
  }

  return str
    .toLowerCase()
    .split(/[ -]+/)
    .map((word) => {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
};
