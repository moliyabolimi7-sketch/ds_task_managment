import { bootstrap } from '../scripts/bootstrap';

bootstrap(() => {
  const form = document.querySelector<HTMLFormElement>('#settings-form');
  const status = document.querySelector<HTMLDivElement>('#settings-status');
  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (status) {
      status.textContent = '✅ Preferences saved (local demo).';
    }
  });
});
