import { insertText } from './insertText';
import { makeTag } from './makeTags';

export function makeHOne(textNode: string): HTMLElement {
  let hOne: HTMLHeadElement = makeTag('h1');
  insertText(hOne, textNode);
  return hOne;
}
