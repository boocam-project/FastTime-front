import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://3.36.128.110:8080/',
});
