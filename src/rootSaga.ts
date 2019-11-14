import { all } from 'redux-saga/effects';

import { settingsSagas } from './features/settings/settings.sagas';
import { exchangeSagas } from './features/exchange/exchange.sagas';

export default function* rootSaga() {
  yield all([
    // add sagas
    settingsSagas(),
    exchangeSagas(),
  ]);
}
