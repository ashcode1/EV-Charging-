import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface StartChargingPayload {
  user: number;
  car_id: number;
  charger_id: number | undefined;
}

interface StartChargingResponse {
  // TODO
}

const MAPS_KEY = 'b005be98-c21a-4607-b5a3-832e3a993ad3';

export const chargingStationApi = createApi({
  reducerPath: 'chargingStationApi',
  baseQuery: fetchBaseQuery({baseUrl: 'https://example.ev.energy/'}),
  endpoints: builder => ({
    startChargingSession: builder.mutation<
      StartChargingResponse,
      StartChargingPayload
    >({
      query: data => ({
        url: 'chargingsession',
        method: 'POST',
        body: data,
      }),
    }),
    getChargingStations: builder.query({
      query: () =>
        `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&key=${MAPS_KEY}`,
    }),
  }),
});

export const {useStartChargingSessionMutation, useGetChargingStationsQuery} =
  chargingStationApi;
