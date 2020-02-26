import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com'
});

api.interceptors.request.use(config => {
  config.params = {
    client_id: '34dbf7f8b7468aa19f71',
    client_secret: 'a4d1bcaab4ef676e0c0dfa75c43f42bdcad8533d',
    ...config.params
  };
  return config;
});

export default api;
