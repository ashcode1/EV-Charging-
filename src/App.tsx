import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import ChargingStationsScreen from './screens/ChargingStationsScreen';

const App = () => {
  return (
    <Provider store={store}>
      <ChargingStationsScreen />
    </Provider>
  );
};

export default App;
