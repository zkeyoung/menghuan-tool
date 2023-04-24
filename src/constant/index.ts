export const APP_NAME = 'menghuan-tool';
export const APP_GITHUB_ISSUES = 'https://github.com/zkeyoung/menghuan-tool/issues';

export enum Environment {
  DEV = 'development',
  STAGE = 'stage',
  PROD = 'production',
}

export enum CacheKey {
  MAIN_WINDOW = 'MAIN_WINDOW',
  DB = "DB",
}

export enum GoodIPC {
  POST = 'good:post',
  DELETE = 'good:delete',
  PUT = 'good:put',
  FIND = 'good:find',
  FIND_BY_ID = 'good:find:id', 
}