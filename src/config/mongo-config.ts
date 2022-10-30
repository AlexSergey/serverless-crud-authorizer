import { IConfig } from './get-config';

export const getMongoUrl = (getConfig: IConfig): string => {
  return [
    'mongodb://',
    getConfig('MONGO_USERNAME'),
    ':',
    getConfig('MONGO_PASSWORD'),
    '@',
    getConfig('MONGO_HOST'),
    ':',
    getConfig('MONGO_PORT'),
    '/',
    `${getConfig('MONGO_DBNAME')}`,
    '?retryWrites=true&w=majority&authMechanism=DEFAULT',
    `&authSource=${getConfig('MONGO_AUTH_SOURCE')}`,
  ].join('');
};
