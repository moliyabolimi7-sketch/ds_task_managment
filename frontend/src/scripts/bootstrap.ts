import '../styles/global.scss';
import { initThemeToggle } from './theme';

export const bootstrap = (callback?: () => void) => {
  document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    callback?.();
  });
};
