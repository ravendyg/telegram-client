import { MTProto } from '@mtproto/core';
// @ts-ignore
import { sleep } from '@mtproto/core/src/utils/common';
import { getEnv } from '@utils/getEnv';
import { logger } from './logger';

const apiIdStr = getEnv('API_ID');
if (!apiIdStr) {
  throw new Error('api id is missing');
}
const api_hash = getEnv('API_HASH');
if (!api_hash) {
  throw new Error('api has is missing');
}
const mtProto = new MTProto({
  api_id: +apiIdStr,
  api_hash,
});

const api = {
  call<T>(method: string, params: Record<string, any>, options: Record<string, any> = {}): Promise<T> {
    logger.debug('method', method)
    return mtProto.call(method, params, options)
      .catch(async error => {
        logger.debug(`${method} error:`, error);

        const { error_code, error_message } = error;

        if (error_code === 420) {
          const seconds = +error_message.split('FLOOD_WAIT_')[1];
          const ms = seconds * 1000;

          await sleep(ms);

          return this.call(method, params, options);
        }

        if (error_code === 303) {
          const [type, dcId] = error_message.split('_MIGRATE_');

          // If auth.sendCode call on incorrect DC need change default DC, because call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
          if (type === 'PHONE') {
            await mtProto.setDefaultDc(+dcId);
          } else {
            options = {
              ...options,
              dcId: +dcId,
            };
          }

          return this.call(method, params, options);
        }

        return Promise.reject(error);
      })
      .then((a: any) => a as T);
  },
};

module.exports = api;
