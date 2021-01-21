import { FileLocationToBeDeprecated } from "@entities/File/FileLocationToBeDeprecated";

export type ChatPhoto = {
  _: "chatPhoto";
  flags: number;
  has_video: boolean;
  photo_small: FileLocationToBeDeprecated;
  photo_big: FileLocationToBeDeprecated;
  dc_id: number;
}
