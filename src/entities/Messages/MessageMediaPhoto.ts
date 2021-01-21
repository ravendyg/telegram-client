import { Photo } from "../Photo";

export type MessageMediaPhoto = {
  _: 'messageMediaPhoto';
  flags: number;
  photo: Photo;
}
