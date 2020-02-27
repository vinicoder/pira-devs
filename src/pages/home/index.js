import api from '../../config/api';
import { $, Template } from '../../helpers';

export default class Home extends Template {
  constructor() {
    super();

    this.users = [];
    this.onLoad();
  }

  async onLoad() {
    await this.loadTemplate('home');
    await this.registerHandlers();
  }

  registerHandlers() {
    this.getUsers();
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
    const listUsersEl = document.getElementById('listUsers');
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

      const memberEl = $('a', {
        class: 'member',
        href: `./#profile/${user.login}`
      });
      memberEl.appendChild(memberHeaderEl);

      listUsersEl.append(memberEl);
    });
  }
}
