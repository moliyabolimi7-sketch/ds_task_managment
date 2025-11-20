const STORAGE_KEY = 'tfp-theme';

type Theme = 'dark' | 'light';

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  if (theme === 'light') {
    document.body.style.background = '#f4f4fb';
    document.body.style.color = '#0b1220';
  } else {
    document.body.style.background = '';
    document.body.style.color = '';
  }
};

const nextTheme = (current: Theme): Theme => (current === 'dark' ? 'light' : 'dark');

export const initThemeToggle = () => {
  const stored = (localStorage.getItem(STORAGE_KEY) as Theme | null) ?? 'dark';
  applyTheme(stored);

  const toggles = document.querySelectorAll<HTMLButtonElement>('.theme-toggle');
  toggles.forEach((btn) => {
    btn.textContent = stored === 'dark' ? '☀️ Light' : '🌙 Dark';
    btn.onclick = () => {
      const updated = nextTheme((document.documentElement.dataset.theme as Theme) ?? 'dark');
      localStorage.setItem(STORAGE_KEY, updated);
      applyTheme(updated);
      toggles.forEach((peer) => {
        peer.textContent = updated === 'dark' ? '☀️ Light' : '🌙 Dark';
      });
    };
  });
};
