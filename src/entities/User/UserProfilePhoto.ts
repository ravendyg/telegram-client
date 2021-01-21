import { FileLocationToBeDeprecated } from "@entities/File/FileLocationToBeDeprecated";

export type UserProfilePhoto = {
  _: "userProfilePhoto";
  flags: number;
  has_video: boolean;
  photo_id: string;
  photo_small: FileLocationToBeDeprecated;
  photo_big: FileLocationToBeDeprecated;
  dc_id: number;
};
