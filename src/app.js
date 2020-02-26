import api from './api';
import $ from './helpers';

class App {
  constructor() {
    this.users = [];
    this.listUsersEl = document.getElementById('listUsers');
    this.registerHandlers();
  }

  registerHandlers() {
    document.body.onload = () => {
      this.getUsers();
    };
  }

  async getUsers() {
    try {
      const users = await api.get('search/users', {
        params: {
          q: 'location:Piracicaba',
          sort: 'followers',
          order: 'desc'
        }
      });

      this.users = users.data.items;

      this.render();
    } catch (error) {
      console.warn(error);
    }
  }

  render() {
    this.users.forEach(user => {
      const memberPhoto = $('img', {
        class: 'member-photo',
        src: user.avatar_url
      });
      const memberUsernameEl = $('h2', {
        class: 'username'
      });
      memberUsernameEl.appendChild(document.createTextNode(user.login));
      const memberInfoEl = $('div', { class: 'member-info' });
      memberInfoEl.appendChild(memberUsernameEl);

      const memberHeaderEl = $('div', { class: 'member-header' });
      memberHeaderEl.appendChild(memberPhoto);
      memberHeaderEl.appendChild(memberInfoEl);

      const memberEl = $('a', { class: 'member', href: `/${user.login}` });
      memberEl.appendChild(memberHeaderEl);

      this.listUsersEl.append(memberEl);
    });
  }
}

export default App;
