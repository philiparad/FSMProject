import { observable, makeObservable, action } from 'mobx';

const API_URL = 'https://restcountries.com/v3.1/region/europe';
const API_ERROR_URL = 'https://restcountriesxx.com/v3.1/region/europe';

class APISettings {
  api = API_URL;

  constructor() {
    makeObservable(this, {
      api: observable,
	  setAPI: action,
	  resetAPI: action
    })
  };

  setAPI = () => {
    this.api = API_ERROR_URL;
  };

  resetAPI = () => {
    this.api = API_URL;
  };
}

export default new APISettings();