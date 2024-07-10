import { combineStart } from './combineStart';
import { makediv } from './divTag';
import { insertText } from './insertText';
import { makeTag } from './makeTags';
import { setAttr } from './setAttr';

export function exitHTML(): void {
  const root = document.getElementById('root') as HTMLDivElement;
  root.innerHTML = '';
  document.body.style.background = 'url(../img/exit.png) no-repeat';
  let messageDiv: HTMLElement = setAttr(
    makediv(),
    'id',
    'message',
  ) as HTMLDivElement;
  messageDiv.innerHTML = `<br />정말 나갈거야? <br /><br />아직 재미난 상품들이 남아있다구!`;
  let exitBtn: HTMLElement = makeTag('button') as HTMLButtonElement;
  exitBtn.addEventListener('click', combineStart);
  insertText(exitBtn, '돌아가기');
  root.appendChild(messageDiv);
  root.appendChild(makeTag('br'));
  root.appendChild(exitBtn);
}
