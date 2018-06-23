// @flow

export default {

  API_BASE_URL: 'https://api.foursquare.com/v2/',
  CLIENT_ID: 'FOOWKOR3XQF0BWRYZED10SIBY3I4HVOKOU0FUNPSTXKU4QIY',
  CLIENT_SECRET: 'VDQ0SJ3QEEHZDCHR1HOBFW5CGKMWYFUEAFVYM3OY3XKQSFNI',
  VERSION: '20180623',

  searchPlacesNearLocation(latLong: object) {

    const url = this.parametrizeURL('venues/search', {
      ll: `${latLong.lat},${latLong.lng}`,
      intent: 'browse',
      radius: 10000
    });

    return fetch(url)
      .then(response => {
        return response.json();
      });

  },

  parametrizeURL(endpoint, options) {

    let url = `${this.API_BASE_URL}${endpoint}?`;

    for (const key in options) {

      if (options.hasOwnProperty(key)) {
        url += `${key}=${options[key]}&`;
      }

    }

    url += `client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&v=${this.VERSION}&limit=50`;

    return url;

  }

};
