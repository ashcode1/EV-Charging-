import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ChargingStationsScreen from '../screens/ChargingStationsScreen';
import ChargingScreen from '../screens/ChargingScreen';
import { StationType } from '../types/StationType';
import { HeaderTitle } from '../types/HeaderTitle';
import { ScreenName } from '../types/ScreenName';
import { BRAND_PRIMARY } from '../theme/colors';

export type RootStackParamList = {
  ChargingStations: undefined;
  ChargingScreen: { station: StationType };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: BRAND_PRIMARY,
        }}>
        <Stack.Screen
          name={ScreenName.CHARGING_STATIONS}
          component={ChargingStationsScreen}
          options={{ headerTitle: HeaderTitle.CHARGIN_STATIONS }}
        />
        <Stack.Screen
          name={ScreenName.CHARGING_SCREEN}
          component={ChargingScreen}
          options={{ headerTitle: HeaderTitle.CHARGING_DETAILS }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
