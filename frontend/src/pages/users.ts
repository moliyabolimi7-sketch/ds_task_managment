import { bootstrap } from '../scripts/bootstrap';
import { users } from '../data/mock';

bootstrap(() => {
  const table = document.querySelector<HTMLTableSectionElement>('#user-table');
  if (!table) return;
  table.innerHTML = users
    .map(
      (user) => `
      <tr>
        <td>${user.name}</td>
        <td>${user.role}</td>
        <td>${user.dept}</td>
        <td>${user.contact}</td>
      </tr>
    `
    )
    .join('');
});
