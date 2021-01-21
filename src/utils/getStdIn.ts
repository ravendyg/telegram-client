import { logger } from "@services/logger";

export function getStdIn(message?: string): Promise<string> {
  if (message) {
    logger.log(message);
  }

  return new Promise((resolve) => {
    const handleInput = (chunk: Buffer) => {
      try {
        const [l1] = chunk.toString().split('\n');
        resolve(l1 || '');
      } catch (e) {
        resolve('');
        logger.error(e);
      } finally {
        process.stdin.off('data', handleInput);
      }
    };

    process.stdin.on('data', handleInput);
  });
};
