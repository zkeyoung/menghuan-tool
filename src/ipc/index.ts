import { ipcMain } from 'electron';
import { GoodIPC } from '../constant';
import * as goodService from './good';

ipcMain.handle(GoodIPC.POST, (event, good) => goodService.postGood(good));
ipcMain.handle(GoodIPC.DELETE, (event, id) => goodService.deleteGood(id));
ipcMain.handle(GoodIPC.PUT, (event, good) => goodService.putGood(good));
ipcMain.handle(GoodIPC.FIND, (event, name) => goodService.findGoods(name));
ipcMain.handle(GoodIPC.FIND_BY_ID, (event, id) => goodService.findGoodById(id));