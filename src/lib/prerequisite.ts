import fs from 'node:fs/promises';
import { APP_NAME, CacheKey } from '../constant';
import { cache } from './cache';
import { appDataPath, dbPath } from './path';
import { dialog } from 'electron';

async function preTask() { 
  await guaranteePath();
  await readSettings();  
  startInterval();
}

async function guaranteePath() {
  try {
    await fs.access(appDataPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(appDataPath);
    } else {
      throw err;
    }
  }
}

async function readSettings() {
  let fileHandler: fs.FileHandle;
  try {
    fileHandler = await fs.open(dbPath, 'r');
    const goodsStrings = await fileHandler.readFile('utf8');
    const goodMap = JSON.parse(goodsStrings);
    cache.set(CacheKey.DB, goodMap);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err;
  } finally {
    await fileHandler!?.close();
  }
}

function startInterval() {
  const interval = setInterval(async () => {
    try {
      const goods = cache.get(CacheKey.DB);
      const goodsStrings = JSON.stringify(goods);
      await fs.writeFile(dbPath, goodsStrings);
    } catch (err) {
      clearInterval(interval);
      dialog.showErrorBox(APP_NAME, err.stack || err);
    }
  }, 1000 * 60);
}

export {
  preTask,
}