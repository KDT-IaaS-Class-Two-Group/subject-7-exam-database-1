export function makeTag(tags: string): HTMLElement {
  let tag: HTMLElement = document.createElement(`${tags}`);
  return tag;
}
