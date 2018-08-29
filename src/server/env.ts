import * as dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const NODE_PORT = parseInt(process.env.NODE_PORT, 10) || 3000;
export const isProduction = () => NODE_ENV === 'production';

export const OIMDBAPI_KEY = process.env.OIMDBAPI_KEY;
export const OMDBAPI_ENDPOINT = `http://www.omdbapi.com/`
