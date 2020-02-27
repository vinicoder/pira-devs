import Router from './router';
import './styles.scss';

import Home from './pages/home/';
import Profile from './pages/profile/';

const router = new Router({
  mode: 'hash',
  root: '/'
});

router
  .add(/profile\/(.*)/, username => new Profile(username))
  .add('', () => new Home());
