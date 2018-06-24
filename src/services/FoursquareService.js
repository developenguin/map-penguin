// @flow

export default {

  API_BASE_URL: 'https://api.foursquare.com/v2/',
  CLIENT_ID: 'FOOWKOR3XQF0BWRYZED10SIBY3I4HVOKOU0FUNPSTXKU4QIY',
  CLIENT_SECRET: 'VDQ0SJ3QEEHZDCHR1HOBFW5CGKMWYFUEAFVYM3OY3XKQSFNI',
  VERSION: '20180623',

  CATEGORIES: {
    TOURIST_INFO: '4f4530164b9074f6e4fb00ff',
    CHURCHES: '4bf58dd8d48988d131941735',
    OBSERVATORY: '5744ccdfe4b0c0459246b4d9',
    RECREATION: '4d4b7105d754a06377d81259',
    FOOD: '4d4b7105d754a06374d81259'
  },

  /**
   * Gets the details for a certain venue from the Foursquare API
   * @param venueId
   */
  getDetailsForVenue(venueId: string) {

    const url = this.parametrizeURL(`venues/${venueId}`);

    return fetch(url)
      .then(response => {
        return response.json();
      });

  },

  /**
   * Search for places near a given lat/long pair, using the Foursquare API
   * @param latLong
   * @returns {Promise<Response>}
   */
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

  /**
   * Build the URL for a given endpoint and set of query parameters
   * @param endpoint
   * @param options
   * @returns {string}
   */
  parametrizeURL(endpoint: string, options: object = {}) {

    let url = `${this.API_BASE_URL}${endpoint}?`;

    for (const key in options) {

      if (options.hasOwnProperty(key)) {
        url += `${key}=${options[key]}&`;
      }

    }

    url += `categoryId=${this.enumerateCategories()}&`;
    url += `client_id=${this.CLIENT_ID}&client_secret=${this.CLIENT_SECRET}&v=${this.VERSION}&limit=50`;

    return url;

  },

  /**
   * Assembles the url for a venue photo
   * @param photo
   * @returns {string}
   */
  getPhotoUrlForPhoto(photo: object) {
    return `${photo.prefix}width500${photo.suffix}`;
  },

  /**
   * Return the categories as a comma-separated string
   * @returns {string}
   */
  enumerateCategories() {
    return Object.values(this.CATEGORIES).join(',');
  }

};
