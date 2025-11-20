import { bootstrap } from '../scripts/bootstrap';
import { notifications, performers, stats, tasks, timeline } from '../data/mock';

const renderStats = () => {
  const wrapper = document.querySelector<HTMLDivElement>('#stats');
  if (!wrapper) return;
  wrapper.innerHTML = stats
    .map(
      (item) => `
      <article class="tfp-card">
        <h3>${item.label}</h3>
        <strong>${item.value}</strong>
        <p>${item.trend} vs yesterday</p>
      </article>
    `
    )
    .join('');
};

const renderTasks = () => {
  const tbody = document.querySelector<HTMLTableSectionElement>('#task-table');
  if (!tbody) return;
  tbody.innerHTML = tasks
    .map(
      (task) => `
      <tr>
        <td>${task.title}</td>
        <td>${task.assignee}</td>
        <td>${task.status}</td>
        <td>${task.score}</td>
        <td>${task.due}</td>
      </tr>
    `
    )
    .join('');
};

const renderTimeline = () => {
  const host = document.querySelector<HTMLDivElement>('#timeline');
  if (!host) return;
  host.innerHTML = timeline
    .map(
      (event) => `
      <div class="tfp-event">
        <strong>${event.time}</strong>
        <p>${event.text}</p>
      </div>
    `
    )
    .join('');
};

const renderPerformers = () => {
  const list = document.querySelector<HTMLDivElement>('#performers');
  if (!list) return;
  list.innerHTML = performers
    .map(
      (p) => `
      <article class="tfp-card">
        <h3>${p.dept}</h3>
        <strong>${p.score} pts</strong>
        <p>${p.name}</p>
      </article>
    `
    )
    .join('');
};

const renderNotifications = () => {
  const list = document.querySelector<HTMLDivElement>('#notifications');
  if (!list) return;
  list.innerHTML = notifications
    .map(
      (n) => `
      <div class="tfp-notification">
        <strong>${n.title}</strong>
        <p>${n.detail}</p>
      </div>
    `
    )
    .join('');
};

bootstrap(() => {
  renderStats();
  renderTasks();
  renderTimeline();
  renderPerformers();
  renderNotifications();
});
