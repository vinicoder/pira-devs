import api from '../../config/api';
import { $, Template } from '../../helpers';

export default class Profile extends Template {
  constructor(username) {
    super();

    this.username = username;
    this.profile = [];
    this.onLoad();
  }

  async onLoad() {
    await this.loadTemplate('profile');
    await this.registerHandlers();
  }

  registerHandlers() {
    this.getProfile();
  }

  async getProfile() {
    try {
      const user = await api.get(`users/${this.username}`);
      this.profile = user.data;
      this.render();
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    const {
      login,
      avatar_url,
      name,
      bio,
      company,
      location,
      email,
      followers,
      public_repos,
      html_url
    } = this.profile;

    $('.user-login').innerHTML = login;
    $('.user-avatar').setAttribute('src', avatar_url);
    $('.user-name').innerHTML = name;
    $('.user-bio').innerHTML = bio;
    $('.user-company').innerHTML = company;
    $('.user-location').getElementsByTagName('span')[0].innerHTML = location;
    $('.user-email').getElementsByTagName('span')[0].innerHTML = email;
    $('.user-email').setAttribute('href', `mailto:${email}`);
    $('.user-followers').getElementsByTagName(
      'span'
    )[0].innerHTML = `${followers} seguidores`;
    $('.user-repos').getElementsByTagName(
      'span'
    )[0].innerHTML = `${public_repos} repos`;
    $('.user-repos').setAttribute('href', `${html_url}?tab=repositories`);
  }
}
