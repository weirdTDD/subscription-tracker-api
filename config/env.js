import { config } from 'dotenv';

const env = typeof process !== 'undefined' && process.env ? process.env : {};
config({ path: `.env.${env.NODE_ENV || 'development'}.local` });



export const {
    PORT,
    NODE_ENV,
    DB_URI ,
    JWT_SECRET, 
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,

 } = process.env;