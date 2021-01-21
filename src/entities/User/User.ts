import { UserProfilePhoto } from "./UserProfilePhoto";

export type User = {
  _: "user";
  flags: number;
  self: boolean;
  contact: boolean;
  mutual_contact: boolean;
  deleted: boolean;
  bot: boolean;
  bot_chat_history: boolean;
  bot_nochats: boolean;
  verified: boolean;
  restricted: boolean;
  min: boolean;
  bot_inline_geo: boolean;
  support: boolean;
  scam: boolean;
  apply_min_photo: boolean;
  id: number;
  access_hash: string;
  first_name: string;
  username: string;
  photo: UserProfilePhoto;
  bot_info_version?: number;
};
