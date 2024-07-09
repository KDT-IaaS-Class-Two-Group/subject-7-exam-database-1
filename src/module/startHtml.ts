import { combineStart } from './combineStart';
import './style/start.css';

export function startHTML(): void {
  document.addEventListener('DOMContentLoaded', combineStart);
}
