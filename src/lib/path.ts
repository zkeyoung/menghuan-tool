import { app } from 'electron';
import path from 'node:path';
import { APP_NAME } from '../constant';

const appDataPath = path.join(app.getPath('appData'), APP_NAME);
const dbPath = path.join(appDataPath, 'db');
const pagePath = path.resolve(__dirname, '../../page/index.html');
const logFilePath = path.join(appDataPath, `${APP_NAME}.error.log`);

export {
  appDataPath,
  dbPath,
  pagePath,
  logFilePath,
}