import { telegram } from '@services/telegram';
import { getStdIn } from '@utils/getStdIn';
import { commands } from '@commands/index';
import { logger } from '@services/logger';

(async () => {
  const user = await telegram.signIn();
  if (!user) {
    throw new Error('cannot connect');
  }

  logger.log('Connected.');

  while (true) {
    const input = await getStdIn('\nEnter command (/l - to list all available commands');
    const command = commands.find(c => c.key === input);
    if (command) {
      await command.exec();
    } else {
      logger.log('Unknown command');
    }
  }
})();
