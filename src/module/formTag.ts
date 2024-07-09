import { makediv } from './divTag';
import { makeTag } from './makeTags';
import { setAttr } from './setAttr';

export function makeForm(
  action: string = '',
  method: string = 'GET',
): HTMLElement {
  let formTag = makeTag('form') as HTMLFormElement;
  setAttr(formTag, 'action', action);
  setAttr(formTag, 'method', method);
  return formTag;
}
