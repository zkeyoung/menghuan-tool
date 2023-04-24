import fs from 'node:fs';
import { app, dialog } from 'electron';
import { APP_NAME } from './constant';
import { showWindow } from './window';
import './ipc';
import './components/menu';
import { getGoodMap } from './ipc/good';
import { dbPath } from './lib/path';

app.setName(APP_NAME);

if (process.platform === 'win32') {
  app.setAppUserModelId(APP_NAME);
}

app.on('second-instance', () => {
  showWindow();
});

app.whenReady().then(() => {
  showWindow();
});

if (process.platform === 'darwin') {
  app.on('activate', () => {
    showWindow();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  try {
    const goodMap = getGoodMap();
    fs.writeFileSync(dbPath, JSON.stringify(goodMap));
  } catch (err) {
    dialog.showErrorBox(APP_NAME, err.stack || err);
  }
});