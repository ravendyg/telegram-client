import { logger } from "@services/logger";
import { iterateCovidStat } from "./iterateCovidStat";

export type Command = {
  key: string;
  description: string;
  exec: () => Promise<void>;
};

export const commands: Command[] = [
  {
    key: '/l',
    description: 'List all commands',
    exec: async () => {
      commands.forEach(c => {
        logger.log(`${c.key} - ${c.description}`);
      });
    },
  },
  {
    key: '/cs',
    description: 'Iterate COVID statistics',
    exec: iterateCovidStat,
  },
  {
    key: '/q',
    description: 'Exit',
    exec: async () => {
      process.exit();
    },
  },
];

export const nextInput = '/n';
