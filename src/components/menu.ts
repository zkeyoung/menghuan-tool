import { APP_GITHUB_ISSUES } from './../constant/index';
import { app, Menu, shell } from 'electron';
import { APP_NAME } from '../constant';

/** Menu */
const menu = Menu.buildFromTemplate([
  {
    label: APP_NAME,
    submenu: [
      {
        label: '退出',
        accelerator: 'CommandOrControl+Q',
        click: () => app.quit(),
      },
    ]
  },
  {
    label: '帮助',
    role: 'help',
    submenu: [
      {
        label: 'Github Issues',
        click: async () => {
          await shell.openExternal(APP_GITHUB_ISSUES);
        }
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);