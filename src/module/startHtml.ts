import { combineStart } from './combineStart';

export function startHTML(): void {
  document.addEventListener('DOMContentLoaded', combineStart);
}
