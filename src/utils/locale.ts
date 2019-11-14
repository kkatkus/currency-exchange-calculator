export const getBrowserLanguage = () => {
  if (navigator.languages !== undefined) {
    return navigator.languages[0];
  }
  return navigator.language;
};
