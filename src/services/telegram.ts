import { ChatList } from '@entities/ChatList';
import { InputPeerChannel } from '@entities/InputPeerChannel';
import { ChannelMessages } from '@entities/Messages/ChannelMessages';
import { User } from '@entities/User/User';
import { getSRPParams } from '@mtproto/core';

import { getEnv }  from '@utils/getEnv';
import { getStdIn }  from '@utils/getStdIn';
import { logger } from './logger';

const api = require('./api');


export type SignInArgs = {
  code: string;
  phone: string;
  phone_code_hash: string;
};

export const telegram = {
  signIn: async (): Promise<User | null> => {
    const user = await helpers.getUser();
    if (user) {
      return user;
    }

    const phone = getEnv('API_PHONE');
    if (!phone) {
      throw new Error('phone number is missing');
    }
    const { phone_code_hash } = await helpers.sendCode(phone);
    const code = await getStdIn("Enter code:");
    try {
      const authResult = await helpers.signIn({
        code,
        phone,
        phone_code_hash,
      });

      // @todo: check authResult model against user. Is it the same?
      logger.debug(`authResult:`, authResult);
      return authResult;
    } catch (error) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        return null;
      }

      // 2FA
      const password = 'PASSWORD';
      const { srp_id, current_algo, srp_B } = await helpers.getPassword();
      const { g, p, salt1, salt2 } = current_algo;

      const { A, M1 } = await getSRPParams({
        g,
        p,
        salt1,
        salt2,
        gB: srp_B,
        password,
      });

      const authResult = await helpers.checkPassword({ srp_id, A, M1 });

      // @todo: check authResult model against user. Is it the same?
      logger.debug(`authResult:`, authResult);
      return authResult;
    }
  },

  getChats: async (except_ids: number[] = []): Promise<ChatList> => {
    return helpers.getChats(except_ids);
  },

  getHistory: async (args: GetHistoryArgs): Promise<ChannelMessages> => {
    return api.call('messages.getHistory', args);
  },
};

export type GetHistoryArgs = {
  peer: InputPeerChannel;
  limit: number;
  hash: string;
  offset_id?: number;
  offset_date?: number;
  add_offset?: number;
  max_id?: number;
  min_id?: number;
};

const helpers = {
  getUser: async (): Promise<User | null> => {
    try {
      const user = await api.call('users.getFullUser', {
        id: {
          _: 'inputUserSelf',
        },
      });

      return user;
    } catch (error) {
      return null;
    }
  },

  sendCode: (phone: string): Promise<{ phone_code_hash: string }> => {
    return api.call('auth.sendCode', {
      phone_number: phone,
      settings: {
        _: 'codeSettings',
      },
    });
  },

  signIn: ({ code, phone, phone_code_hash }: SignInArgs) => {
    return api.call('auth.signIn', {
      phone_code: code,
      phone_number: phone,
      phone_code_hash,
    }, { syncAuth: false });
  },

  getPassword: () => {
    return api.call('account.getPassword');
  },

  checkPassword: ({ srp_id, A, M1 }: any) => {
    return api.call('auth.checkPassword', {
      password: {
        _: 'inputCheckPasswordSRP',
        srp_id,
        A,
        M1,
      },
    });
  },

  getChats: (except_ids: number[]) => {
    return api.call('messages.getAllChats', {
      except_ids,
    });
  },
};
