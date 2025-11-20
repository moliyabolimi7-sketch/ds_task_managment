import { bootstrap } from '../scripts/bootstrap';

const messages = [
  { author: 'Laylo', body: 'Please add CTA variations in Uzbek and Russian.' },
  { author: 'Kamron', body: 'On it! Uploading preview within 30 minutes.' }
];

bootstrap(() => {
  const chat = document.querySelector<HTMLDivElement>('#chat');
  const form = document.querySelector<HTMLFormElement>('#chat-form');
  const textarea = document.querySelector<HTMLTextAreaElement>('#chat-input');

  const render = () => {
    if (!chat) return;
    chat.innerHTML = messages
      .map(
        (message) => `
        <div>
          <strong>${message.author}</strong>
          <p>${message.body}</p>
        </div>
      `
      )
      .join('');
  };

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!textarea?.value.trim()) return;
    messages.push({ author: 'You', body: textarea.value.trim() });
    textarea.value = '';
    render();
  });

  render();
});
