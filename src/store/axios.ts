import axios from 'axios';
import { API_BASE_URL } from '@env';

const instance = axios.create({
  baseURL: API_BASE_URL,
});

console.log(`Requesting to : ${API_BASE_URL}`);

export default instance;
