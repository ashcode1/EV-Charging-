import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {BG_PRIMARY} from '../theme/colors';

const ChargingStationsScreen: React.FC = () => {
  return (
    <View style={styles.centeredContainer}>
      <Text>Hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: BG_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChargingStationsScreen;
