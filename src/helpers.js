export function $(element, attrs = {}) {
  if (element.match(/^\.(.+)/)) {
    const elementName = element.substr(1);
    return document.getElementsByClassName(elementName)[0];
  } else {
    const newElement = document.createElement(element);
    const newAttrs = Object.entries(attrs);
    if (newAttrs.length > 0) {
      newAttrs.forEach(attr => {
        newElement.setAttribute(attr[0], attr[1]);
      });
    }
    return newElement;
  }
}

export class Template {
  constructor() {
    this.container = document.getElementById('app');
  }
  async loadTemplate(templateName) {
    try {
      const html = require(`../src/pages/${templateName}/template.html`);
      this.container.innerHTML = html;
    } catch (err) {
      console.log('error on loading template file');
    }
  }
}
