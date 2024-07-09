import { makeTag } from './makeTags';

export function makediv(): HTMLElement {
  let div = makeTag('div') as HTMLDivElement;
  return div;
}
