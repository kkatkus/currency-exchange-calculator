import { RouterState } from 'connected-react-router';

import SettingsState from './features/settings/SettingsState';
import ExchangeState from './features/exchange/ExchangeState';

export default interface RootState {
  router: RouterState;
  settings: SettingsState;
  exchange: ExchangeState;
}
