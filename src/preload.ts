import { contextBridge, ipcRenderer } from 'electron';
import Good from './entity/good';

export enum GoodIPC {
  POST = 'good:post',
  DELETE = 'good:delete',
  PUT = 'good:put',
  FIND = 'good:find',
  FIND_BY_ID = 'good:find:id', 
}

contextBridge.exposeInMainWorld('$main', {
  deleteGood: (id: string) => ipcRenderer.invoke(GoodIPC.DELETE, id),
  postGood: (good: Good) => ipcRenderer.invoke(GoodIPC.POST, good),
  putGood: (good: Good) => ipcRenderer.invoke(GoodIPC.PUT, good),
  findGood: (name: string) => ipcRenderer.invoke(GoodIPC.FIND, name),
  findGoodById: (name: string) => ipcRenderer.invoke(GoodIPC.FIND_BY_ID, name),
});
