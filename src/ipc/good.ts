import { CacheKey } from '../constant';
import Good from '../entity/good';
import { cache } from '../lib/cache';
import crypto from 'node:crypto';

type GoodMap = {
  [id: string]: Good;
}

export function findGoods(name: string) {
  if (!name) return { code: 0, msg: 'success', data: [] };
  const goodMap = getGoodMap();
  const goods = Object.values(goodMap);
  const pickGoods = goods.filter(good => good.name.startsWith(name));
  return { code: 0, msg: 'success', data: pickGoods };
}

export function findGoodById(id: string) {
  const goodMap = getGoodMap();
  const good = goodMap[id];
  return { code: 0, msg: 'success', data: good };
}

export function postGood(good: Partial<Good>) {
  good.id = crypto.randomUUID().replaceAll('-', '');
  const goodMap = getGoodMap();
  const storeGood = new Good();
  Object.assign(storeGood, good);
  goodMap[good.id] = storeGood;
  cache.set(CacheKey.DB, goodMap);
  return { code: 0, msg: 'success', data: good.id }
}

export function deleteGood(id: string) {
  const goodMap = getGoodMap();
  const res = Reflect.deleteProperty(goodMap, id);
  cache.set(CacheKey.DB, goodMap);
  return { code: 0, msg: 'success', data: res };
}

export function putGood(good: { id: string } & Partial<Good>) {
  const goodMap = getGoodMap();
  const curGood = goodMap[good.id];
  if (!curGood) return { code: 400, msg: 'id is not precent' };
  Object.assign(curGood, good);
  cache.set(CacheKey.DB, goodMap);
  return { code: 0, msg: 'success'};
}

export function getGoodMap() {
  const goodMap: GoodMap = cache.get(CacheKey.DB) || {};
  return goodMap;
}