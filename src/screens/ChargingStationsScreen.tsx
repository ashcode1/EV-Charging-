import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useGetChargingStationsQuery } from '../services/chargingStationApi';
import { StationType } from '../types/StationType';

import { BG_PRIMARY, BRAND_PRIMARY } from '../theme/colors';

const ChargingStationsScreen: React.FC = () => {
  const { data, isError, isLoading } = useGetChargingStationsQuery({});

  const handleSelectStation = (station: StationType) => {
    console.log('Station: ', station);
  };

  if (isLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color={BRAND_PRIMARY} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centeredContainer}>
        <Text>Error loading data</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data}
      keyExtractor={item => item.ID.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleSelectStation(item)}>
          <Text>{item.AddressInfo.Title}</Text>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    backgroundColor: BG_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
});

export default ChargingStationsScreen;
