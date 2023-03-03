import axios from 'axios';

const BaseURL = 'https://api.primaxcelinovasi.co.id';

const instance = axios.create({
  baseURL: BaseURL
});

export default instance;