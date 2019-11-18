import { STATE_KEY_NAME } from '../constants';

import { getItem, setItem } from './localStorage';

export const getState = () => {
  const state = getItem(STATE_KEY_NAME);
  if (state === null) {
    return undefined;
  }
  return state;
};

export const saveState = (state: object): void => {
  setItem(STATE_KEY_NAME, state);
};
