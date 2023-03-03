import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.primaxcelinovasi.co.id',
});

export default instance;