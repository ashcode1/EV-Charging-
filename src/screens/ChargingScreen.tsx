import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../navigation/AppNavigator';
import { BG_PRIMARY } from '../theme/colors';
import { ScreenName } from '../types/ScreenName';

type ChargingScreenRouteProp = RouteProp<
  RootStackParamList,
  ScreenName.CHARGING_SCREEN
>;

interface ChargingScreenProps {
  route: ChargingScreenRouteProp;
}

const ChargingScreen: React.FC<ChargingScreenProps> = ({ route }) => {
  const { station } = route.params;

  return (
    <View style={styles.container}>
      <Text>{station.AddressInfo.Title}</Text>
      <Text>Charging...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_PRIMARY,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 100,
    paddingBottom: 100,
  },
});

export default ChargingScreen;
