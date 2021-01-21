export type ChatBannedRights = {
  _: "chatBannedRights";
  flags: number;
  view_messages: boolean;
  send_messages: boolean;
  send_media: boolean;
  send_stickers: boolean;
  send_gifs: boolean;
  send_games: boolean;
  send_inline: boolean;
  embed_links: boolean;
  send_polls: boolean;
  change_info: boolean;
  invite_users: boolean;
  pin_messages: boolean;
  until_date: number;
};
