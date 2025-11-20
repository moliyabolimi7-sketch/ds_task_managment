import { bootstrap } from '../scripts/bootstrap';
import { reports } from '../data/mock';

bootstrap(() => {
  const list = document.querySelector<HTMLDivElement>('#reports');
  if (!list) return;
  list.innerHTML = reports
    .map(
      (report) => `
      <article class="tfp-card">
        <h3>${report.label}</h3>
        <strong>${report.completion}%</strong>
        <p>${report.highlight}</p>
        <div style="height:8px;background:rgba(255,255,255,0.08);border-radius:999px;">
          <div style="height:8px;border-radius:999px;background:linear-gradient(135deg,#6c5ce7,#a363d9);width:${report.completion}%"></div>
        </div>
      </article>
    `
    )
    .join('');
});
