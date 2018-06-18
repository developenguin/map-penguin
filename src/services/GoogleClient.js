// @flow

import GoogleMaps from '@google/maps';

export const apiKey = 'AIzaSyAMss-ib4bIIBFQg2__-IzT4ic_AVvKR4I';

export const GoogleMapsClient = GoogleMaps.createClient({
  key: apiKey
});
