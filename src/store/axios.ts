import axios from 'axios';
import { API_BASE_URL } from '@env';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

instance.interceptors.request.use((config) => {
  config.maxBodyLength = Infinity;
  config.maxContentLength = Infinity;

  return config;
});

console.log(`Requesting to : ${API_BASE_URL}`);

export default instance;
