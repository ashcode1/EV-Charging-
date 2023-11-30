// ChargingStationsScreen.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ChargingStationsScreen from '../src/screens/ChargingStationsScreen';
import * as chargingStationApi from '../src/services/chargingStationApi';

jest.mock('../src/services/chargingStationApi', () => ({
  useGetChargingStationsQuery: jest.fn(),
  useStartChargingSessionMutation: jest.fn(),
}));

jest.mock('../src/components/SlideUpModal', () => 'SlideUpModal');

describe('ChargingStationsScreen', () => {
  it('renders charging stations and allows interaction', () => {
    // Setup mock return values for the hooks
    chargingStationApi.useGetChargingStationsQuery.mockReturnValue({
      data: [{ ID: 1, AddressInfo: { Title: 'Station 1' } }],
      isError: false,
      isFetching: false,
      isLoading: false,
      refetch: jest.fn(),
    });
    chargingStationApi.useStartChargingSessionMutation.mockReturnValue([
      jest.fn(),
      {},
    ]);

    const { getByText, queryByText } = render(
      <ChargingStationsScreen navigation={{ navigate: jest.fn() }} />,
    );

    // Verify if the charging station is rendered
    expect(getByText('Station 1')).toBeTruthy();

    // Simulate pressing a station
    const stationItem = getByText('Station 1');
    fireEvent.press(stationItem);

    // Verify that the modal is displayed
    expect(queryByText('Start Charging')).toBeTruthy();
  });
});
