import { setup } from 'axios-cache-adapter';

const api = setup({
  baseURL: 'https://api.github.com',
  auth: {
    username: process.env.GITHUB_CLIENT_ID,
    password: process.env.GITHUB_SECRET
  },
  cache: {
    maxAge: 15 * 60 * 1000
  }
});

export default api;
