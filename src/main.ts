import { app, dialog } from 'electron';
import { preTask } from './lib/prerequisite';
import { writeFileSync } from 'fs';
import { logFilePath } from './lib/path';

main().catch(err => {
  try {
    dialog.showErrorBox('menghuan-tool', '发生异常，请联系作者\nhttps://github.com/zkeyoung/menghuan-tool');
    writeFileSync(logFilePath, JSON.stringify(err.stack || err));
  } finally {
    app.quit();
  }
});

async function main() {
  if (require('electron-squirrel-startup')) {
    app.quit();
    return;
  }
  if (!app.requestSingleInstanceLock()) {
    app.quit();
    return;
  }
  await preTask();
  require('./app');
}