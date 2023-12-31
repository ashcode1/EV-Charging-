import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button,
  RefreshControl,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../navigation/AppNavigator';
import {
  useGetChargingStationsQuery,
  useStartChargingSessionMutation,
} from '../services/chargingStationApi';
import { StationType } from '../types/StationType';
import { BG_PRIMARY, BRAND_PRIMARY } from '../theme/colors';
import SlideUpModal from '../components/SlideUpModal';
import { ScreenName } from '../types/ScreenName';
import ListEmptyComponent from '../components/ListEmptyComponent';
import RenderStationItem from '../components/RenderStationItem';
import TitleText from '../components/TitleText';
import Spacer from '../components/Spacer';
import ActionButton from '../components/ActionButton';

type ChargingStationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ChargingStations'
>;

type ChargingStationsScreenProps = {
  navigation: ChargingStationsScreenNavigationProp;
};

const ChargingStationsScreen: React.FC<ChargingStationsScreenProps> = ({
  navigation,
}) => {
  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [selectedStation, setSelectedStation] =
    React.useState<StationType | null>(null);
  const { data, isError, isLoading, isFetching, refetch } =
    useGetChargingStationsQuery({});
  const [startChargingSession] = useStartChargingSessionMutation();

  const handleSelectStation = (station: StationType) => {
    setSelectedStation(station);
    setModalVisible(true);

    console.log('Station: ', station);
  };

  const handleStartCharging = () => {
    const onSuccess = () => {
      setModalVisible(false);
      selectedStation &&
        navigation.navigate(ScreenName.CHARGING_SCREEN, {
          station: selectedStation,
        });
    };

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
        // onSuccess();
      } catch (err) {
        // TODO Handle the error
        console.log('error: ', err);
      }

      // Fake success
      onSuccess();
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
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data}
        keyExtractor={item => item.ID.toString()}
        renderItem={({ item }) => (
          <RenderStationItem item={item} onSelect={handleSelectStation} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={refetch}
            // iOS only
            tintColor={BRAND_PRIMARY}
            // Android only
            colors={[BRAND_PRIMARY]}
          />
        }
        ListEmptyComponent={
          <ListEmptyComponent text="No Charging Stations Found" />
        }
      />
      <SlideUpModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          <View style={styles.modalTextContainer}>
            <TitleText title={selectedStation?.AddressInfo.Title} />
            <Spacer />
            <Text>Address: {selectedStation?.AddressInfo.AddressLine1}</Text>
          </View>
          <ActionButton title="Start Charging" onPress={handleStartCharging} />
        </View>
      </SlideUpModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_PRIMARY,
  },
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
  modalTextContainer: {
    padding: 50,
    alignItems: 'center',
  },
});

export default ChargingStationsScreen;
