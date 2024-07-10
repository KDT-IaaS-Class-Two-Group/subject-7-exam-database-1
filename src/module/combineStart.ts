import { exitHTML } from './combineExit';
import { makediv } from './divTag';
import { makeForm } from './formTag';
import { makeHOne } from './hOneTag';
import { makeInput } from './inputTag';
import { labelTag } from './labelTag';
import { setAttr } from './setAttr';

export function combineStart(): void {
  const root = document.getElementById('root') as HTMLDivElement;
  document.body.style.background =
    'url(../img/start.png) no-repeat center center fixed';
  root.innerHTML = '';
  let hOne = makeHOne('어서와요 뚝딱상점!');
  let linkDiv = setAttr(makediv(), 'id', 'link');
  let startForm = setAttr(makeForm(), 'id', 'start-form');

  let fstDiv = setAttr(makediv(), 'class', 'form-group');
  let fstInput = makeInput();
  setAttr(fstInput, 'type', 'text');
  setAttr(fstInput, 'id', 'id');
  setAttr(fstInput, 'name', 'id');
  fstDiv.appendChild(labelTag('id', 'ID'));
  fstDiv.appendChild(fstInput);
  let secDiv = setAttr(makediv(), 'class', 'form-group');
  let secInput = makeInput();
  setAttr(secInput, 'type', 'text');
  setAttr(secInput, 'id', 'name');
  setAttr(secInput, 'name', 'name');
  secDiv.appendChild(labelTag('name', 'NAME'));
  secDiv.appendChild(secInput);
  let thrDiv = setAttr(makediv(), 'class', 'button-group');
  let thrInputSub = makeInput();
  setAttr(thrInputSub, 'type', 'submit');
  setAttr(thrInputSub, 'value', '게임시작');
  setAttr(thrInputSub, 'id', 'start');
  let thrInputBtn = makeInput();
  setAttr(thrInputBtn, 'type', 'button');
  setAttr(thrInputBtn, 'value', '게임종료');
  setAttr(thrInputBtn, 'id', 'exit');
  thrInputBtn.addEventListener('click', exitHTML);
  thrDiv.appendChild(thrInputSub);
  thrDiv.appendChild(thrInputBtn);

  startForm.appendChild(fstDiv);
  startForm.appendChild(secDiv);
  startForm.appendChild(thrDiv);
  linkDiv.appendChild(startForm);
  root.appendChild(hOne);
  root.appendChild(linkDiv);
}
