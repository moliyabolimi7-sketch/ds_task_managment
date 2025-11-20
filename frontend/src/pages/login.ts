import { bootstrap } from '../scripts/bootstrap';

bootstrap(() => {
  const form = document.querySelector<HTMLFormElement>('#login-form');
  const status = document.querySelector<HTMLDivElement>('#login-status');

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!status) return;
    const data = new FormData(form);
    const login = data.get('login');
    const password = data.get('password');
    if (!login || !password) {
      status.textContent = 'Please enter login and password.';
      return;
    }
    status.textContent = 'Authenticating...';
    setTimeout(() => {
      status.innerHTML =
        '✅ Demo access granted. Continue to <a href="/dashboard.html">Dashboard</a>.';
    }, 500);
  });
});
