import { insertText } from './insertText';
import { makeTag } from './makeTags';
import { setAttr } from './setAttr';

export function labelTag(value: string, textNode: string): HTMLElement {
  let label = makeTag('label');
  setAttr(label, 'for', value);
  insertText(label, textNode);
  return label;
}
