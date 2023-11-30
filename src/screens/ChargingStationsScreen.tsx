import React from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Button,
} from 'react-native';

import {
  useGetChargingStationsQuery,
  useStartChargingSessionMutation,
} from '../services/chargingStationApi';
import { StationType } from '../types/StationType';
import { BG_PRIMARY, BRAND_PRIMARY } from '../theme/colors';
import SlideUpModal from '../components/SlideUpModal';

const ChargingStationsScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [selectedStation, setSelectedStation] =
    React.useState<StationType | null>(null);
  const { data, isError, isLoading } = useGetChargingStationsQuery({});
  const [startChargingSession] = useStartChargingSessionMutation();

  const handleSelectStation = (station: StationType) => {
    setSelectedStation(station);
    setModalVisible(true);

    console.log('Station: ', station);
  };

  const handleStartCharging = () => {
    const reqStartChargingSession = async () => {
      const chargerId = selectedStation?.ID;
      try {
        const payload = {
          user: 1,
          car_id: 1,
          charger_id: chargerId,
        };
        const response = await startChargingSession(payload).unwrap();
        console.log('response: ', response);
        // TODO Handle the response
      } catch (err) {
        // TODO Handle the error
        console.log('error: ', err);
      }
    };

    reqStartChargingSession();
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
    <View>
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
      <SlideUpModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <Text>{selectedStation?.AddressInfo.Title}</Text>
          <Text>Address: {selectedStation?.AddressInfo.AddressLine1}</Text>
          <Button title="Start Charging" onPress={handleStartCharging} />
        </View>
      </SlideUpModal>
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
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

export default ChargingStationsScreen;
