import { InputChannel } from "@entities/InputChannel";
import { ChatBannedRights } from "./ChatBannedRights";
import { ChatPhoto } from "./ChatPhoto";
import { ChatPhotoEmpty } from "./ChatPhotoEmpty";

export type Chat = {
  _: "chat";
  flags: number;
  creator: boolean;
  kicked: boolean;
  left: boolean;
  deactivated: boolean;
  id: number;
  title: string;
  photo: ChatPhoto | ChatPhotoEmpty;
  participants_count: number;
  date: number;
  version: number;
  migrated_to?: InputChannel;
  default_banned_rights?: ChatBannedRights;
};
