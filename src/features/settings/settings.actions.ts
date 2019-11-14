import { SETTINGS_THEME_CHANGE } from '../../actions';

export const changeTheme = (payload?: any) => ({
  type: SETTINGS_THEME_CHANGE,
  payload,
});
