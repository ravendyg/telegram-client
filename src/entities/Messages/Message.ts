import { PeerChannel } from '@entities/PeerChannel';
import { MessageMediaPhoto } from './MessageMediaPhoto';

export type Message = {
  _: 'message';
  flags: number;
  out: boolean;
  mentioned: boolean;
  media_unread: boolean;
  silent: boolean;
  post: boolean;
  from_scheduled: boolean;
  legacy: boolean;
  edit_hide: boolean;
  pinned: boolean;
  id: number;
  peer_id: PeerChannel;
  date: number;
  message: string;
  media: MessageMediaPhoto;
  entities: unknown[];
  views: number;
  forwards: number;
}
