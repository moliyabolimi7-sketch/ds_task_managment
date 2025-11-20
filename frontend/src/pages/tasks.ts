import { bootstrap } from '../scripts/bootstrap';
import { tasks } from '../data/mock';

bootstrap(() => {
  const list = document.querySelector<HTMLDivElement>('#task-list');
  const filter = document.querySelector<HTMLSelectElement>('#task-filter');

  const render = (status?: string) => {
    if (!list) return;
    const filtered = status && status !== 'all' ? tasks.filter((t) => t.status === status) : tasks;
    list.innerHTML = filtered
      .map(
        (task) => `
        <article class="tfp-card">
          <div class="tfp-toolbar">
            <div>
              <h3>${task.status}</h3>
              <strong>${task.title}</strong>
            </div>
            <a class="tfp-button" href="/task-detail.html">Open</a>
          </div>
          <p>Assignee: ${task.assignee}</p>
          <p>Score: ${task.score} pts • Due ${task.due}</p>
        </article>
      `
      )
      .join('');
  };

  filter?.addEventListener('change', (event) => {
    const value = (event.target as HTMLSelectElement).value;
    render(value);
  });

  render();
});
