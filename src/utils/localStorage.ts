export const isLocalStorageAvailable = (): boolean => {
  const test = 'test';
  try {
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const getItem = (key: string) => {
  if (!isLocalStorageAvailable() || !key) {
    return undefined;
  }
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.group('localStorage - getItem - Failed to parse string to json');
    console.log(data);
    console.log(e.message);
    console.groupEnd();
    return null;
  }
};

export const setItem = (key: string, data: number | string | boolean | object | null | undefined): void => {
  if (!isLocalStorageAvailable() || !key) {
    return;
  }
  localStorage.setItem(key, JSON.stringify(data));
};

export const removeItem = (key: string): void => {
  if (!isLocalStorageAvailable() || !key) {
    return;
  }
  localStorage.removeItem(key);
};
