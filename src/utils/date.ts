import { getBrowserLanguage } from './locale';

export const formatDate = (date: string | undefined | null) => {
  if (!date) {
    return '';
  }
  return new Date(date).toLocaleString(getBrowserLanguage());
};
