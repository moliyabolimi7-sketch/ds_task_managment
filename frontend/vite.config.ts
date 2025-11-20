import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        login: path.resolve(__dirname, 'login.html'),
        dashboard: path.resolve(__dirname, 'dashboard.html'),
        tasks: path.resolve(__dirname, 'tasks.html'),
        taskDetail: path.resolve(__dirname, 'task-detail.html'),
        reports: path.resolve(__dirname, 'reports.html'),
        users: path.resolve(__dirname, 'users.html'),
        settings: path.resolve(__dirname, 'settings.html')
      }
    }
  }
});
