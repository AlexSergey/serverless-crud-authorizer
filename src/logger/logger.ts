import winston from 'winston';

import { getConfig } from '../config/get-config';

export const logger = winston.createLogger({
  format: winston.format.json(),
  level: getConfig('LOG_LEVEL'),
});
