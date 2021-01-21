import { ChatPhoto } from "./Chat/ChatPhoto";

export type Channel = {
  _: "channel";
  flags: number;
  creator: boolean;
  left: boolean;
  broadcast: boolean;
  verified: boolean;
  megagroup: boolean;
  restricted: boolean;
  signatures: boolean;
  min: boolean;
  scam: boolean;
  has_link: boolean;
  has_geo: boolean;
  slowmode_enabled: boolean;
  call_active: boolean;
  id: number;
  access_hash: string;
  title: string;
  username: string;
  photo: ChatPhoto;
  date: number;
  version: number;
};
