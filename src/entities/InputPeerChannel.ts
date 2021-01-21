import { Channel } from "./Channel";

export type InputPeerChannel = {
  _: 'inputPeerChannel';
  access_hash: string;
  channel_id: number;
}

export function createInputPeerChannel(channel: Channel): InputPeerChannel {
  const { id, access_hash } = channel;

  return {
    _: 'inputPeerChannel',
    access_hash,
    channel_id: id,
  };
}
