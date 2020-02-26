export default function $(element, attrs = {}) {
  const newElement = document.createElement(element);
  const newAttrs = Object.entries(attrs);
  if (newAttrs.length > 0) {
    newAttrs.forEach(attr => {
      newElement.setAttribute(attr[0], attr[1]);
    });
  }
  return newElement;
}
