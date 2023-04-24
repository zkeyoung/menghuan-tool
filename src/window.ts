import { BrowserWindow } from 'electron';
import path from 'node:path';
import { CacheKey } from './constant';
import { cache } from './lib/cache';
import { pagePath } from './lib/path';

function createWindow(): Promise<BrowserWindow> {
  return new Promise((resolve) => {
    const bwOption: Electron.BrowserWindowConstructorOptions = {
      height: 300,
      width: 500,
      resizable: true,
      show: false,
      webPreferences: {
        preload: path.resolve(__dirname, './preload.js'),
      },
    }
    if (process.platform === 'win32') {
      // bwOption.icon = path.resolve(__dirname, '../static/logo.ico');
    }
    const window = new BrowserWindow(bwOption);
    window.loadFile(pagePath);
    window.once('ready-to-show', () => {
      resolve(window);
      window.show();
    });
    window.on('closed', () => {
      destoryWindow();
    });
    cache.set(CacheKey.MAIN_WINDOW, window);
  });
}

function getWindow(): BrowserWindow {
  return cache.get(CacheKey.MAIN_WINDOW);
}

function destoryWindow() {
  const window = getWindow();
  if (window) {
    cache.delete(CacheKey.MAIN_WINDOW);
  }
}

async function showWindow() {
  if (BrowserWindow.getAllWindows().length === 0) {
    await createWindow();
  }
  const window = getWindow();
  if (window) {
    if (window.isMinimized()) {
      window.restore();
    }
    if (!window.isFocused()) {
      window.focus();
    }
  }
}

export {
  createWindow,
  getWindow,
  destoryWindow,
  showWindow,
}