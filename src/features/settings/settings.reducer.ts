import { SETTINGS_THEME_CHANGE } from '../../actions';
import { ThemeEnum } from './ThemeEnum';

const settingsReducer = (state: any = { theme: ThemeEnum.Light, loading: true }, action) => {
  switch (action.type) {
    case SETTINGS_THEME_CHANGE:
      return { ...state, theme: action.payload };
    default:
      return state;
  }
};

export default settingsReducer;
