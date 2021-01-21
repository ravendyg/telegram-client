import { Channel } from "@entities/Channel";
import { Chat } from "@entities/Chat/Chat";
import { User } from "@entities/User/User";
import { Message } from "./Message";

export type ChannelMessages = {
  _: 'messages.channelMessages';
  flags: number;
  inexact: boolean;
  pts: number;
  count: number;
  messages: Message[];
  chats: Array<Channel | Chat>;
  users: User[];
}
