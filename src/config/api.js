import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
  auth: {
    username: '34dbf7f8b7468aa19f71',
    password: 'a4d1bcaab4ef676e0c0dfa75c43f42bdcad8533d'
  }
});

export default api;
