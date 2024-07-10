export function setAttr(
  element: HTMLElement,
  key: string,
  value: string,
): HTMLElement {
  element.setAttribute(key, value);
  return element;
}
