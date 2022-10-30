export interface IEnv {
  MONGO_USERNAME: string;
  MONGO_PASSWORD: string;
  MONGO_AUTH_SOURCE: string;
  MONGO_HOST: string;
  MONGO_DBNAME: string;
  MONGO_COLLECTION: string;
  MONGO_PORT: number;
  LOG_LEVEL: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly';
}

export const getConfig = <T = IEnv, S extends keyof T = keyof T>(field: S): T[S] => {
  return (process.env as T & NodeJS.ProcessEnv)[field];
};

export type IConfig = typeof getConfig;
