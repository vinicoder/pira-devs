import api from '../../config/api';
import { viewport, $, Template } from '../../helpers';

export default class Home extends Template {
  constructor() {
    super();

    this.total = 0;
    this.per_page = 48;
    this.loading = true;
    this.listUsersEl;
    this.loaderUsersEl;
    this.totalUsersEl;
    this.page = 1;
    this.users = [];
    this.onLoad();
  }

  async onLoad() {
    await this.loadTemplate('home');
    this.listUsersEl = document.getElementById('listUsers');
    this.loaderUsersEl = document.getElementById('loaderListUsers');
    this.totalUsersEl = document.getElementById('totalUsers');
    await this.getUsers();
    this.registerHandlers();
  }

  registerHandlers() {
    setTimeout(() => {
      document.body.onscroll = () => {
        if (!this.loading && this.page < this.total) {
          let { bottom } = this.listUsersEl.getBoundingClientRect();
          bottom -= 100;
          let { scrollTop } = document.documentElement || document.body;
          scrollTop += viewport().height;
          if (scrollTop >= bottom) {
            this.getUsers(this.page + 1);
          }
        }
      };
    }, 50);

    this.listenLoader();
  }

  listenLoader() {
    setInterval(() => {
      if (this.loading) {
        if (!this.loaderUsersEl.classList.contains('show')) {
          this.loaderUsersEl.classList.add('show');
        }
      } else {
        if (this.loaderUsersEl.classList.contains('show')) {
          this.loaderUsersEl.classList.remove('show');
        }
      }
    }, 50);
  }

  async getUsers(page = this.page) {
    try {
      this.loading = true;
      const users = await api.get('search/users', {
        params: {
          q: 'location:Piracicaba',
          sort: 'followers',
          order: 'desc',
          page,
          per_page: this.per_page
        }
      });

      this.total = Math.round(users.data.total_count / this.per_page);
      this.totalUsersEl.innerHTML = users.data.total_count;
      this.users = users.data.items;

      await this.render();
      this.loading = false;
      this.page = page;
    } catch (error) {
      console.warn(error);
      this.loading = false;
    }
  }

  async render() {
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

      this.listUsersEl.append(memberEl);
    });
  }
}
