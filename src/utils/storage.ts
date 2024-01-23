interface StorageProps {
  version: string;
}

export const storagePrefix = '__vid-conf-';

export const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return typeof JSON.parse(str);
};

export const setStorage = <T extends keyof StorageProps>(
  keyName: T,
  value: StorageProps[T],
): void => {
  if (typeof value === 'string') {
    localStorage.setItem(`${storagePrefix}${keyName}`, value);
  }
  localStorage.setItem(`${storagePrefix}${keyName}`, JSON.stringify(value));
};

export const getStorage = <T extends keyof StorageProps>(
  keyName: T,
): StorageProps[T] | undefined => {
  const storedData = localStorage.getItem(`${storagePrefix}${keyName}`);
  if (storedData) {
    if (isJsonString(storedData)) {
      return JSON.parse(storedData) as StorageProps[T];
    }
  }
  return undefined;
};

export const removeFromStorage = <T extends keyof StorageProps>(
  keyName: T,
): void => {
  localStorage.removeItem(`${storagePrefix}${keyName}`);
};

export const removeAllStorage = () => {
  localStorage.clear();
};
