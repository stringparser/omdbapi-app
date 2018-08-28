import * as dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const NODE_PORT = parseInt(process.env.NODE_PORT, 10) || 3000;

export function isProduction() {
  return NODE_ENV === 'production';
}
