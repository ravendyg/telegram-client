import dotenv from 'dotenv';

dotenv.config();

export function getEnv(key: string): string | undefined {
  if (typeof key !== 'string') {
    return undefined;
  }
  return process.env[key];
}
