import { getEnv } from "@utils/getEnv";

export const logger = {
  log(...args: unknown[]): void {
    console.log(...args);
  },
  debug(...args: unknown[]) {
    const mode = getEnv('RUN_MODE');
    if (mode === 'debug' ) {
      console.log(...args);
    }
  },
  error(...args: unknown[]): void {
    console.error(...args);
  },
};
