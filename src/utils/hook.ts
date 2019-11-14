import { useState } from 'react';
import { getItem, setItem } from './localStorage';

export const useIsOpen = () => {
  const getDefaultIsOpen = () => getItem('isOpen');
  const storageIsOpen = getDefaultIsOpen();
  const defaultIsOpen = storageIsOpen === undefined || storageIsOpen === null ? true : storageIsOpen;
  const [isOpen, setIsOpen] = useState<boolean>(defaultIsOpen);

  const toggleOpen = () => {
    const result = !isOpen;
    setItem('isOpen', result);
    setIsOpen(result);
  };

  return { isOpen, toggleOpen };
};
