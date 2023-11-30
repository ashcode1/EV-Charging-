import {configureStore} from '@reduxjs/toolkit';

import {chargingStationApi} from './services/chargingStationApi';

const middlewares = [chargingStationApi.middleware];

if (__DEV__) {
  const createDebugger = require('redux-flipper').default;
  middlewares.push(createDebugger());
}

export const store = configureStore({
  reducer: {
    [chargingStationApi.reducerPath]: chargingStationApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middlewares),
});
