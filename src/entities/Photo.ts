export type Photo = {
  _: 'photo';
  flags: number;
  has_sticker: boolean;
  id: string;
  access_hash: string;
  file_reference: Record<string, number>;
  date: number;
  sizes: unknown[];
  dc_id: number;
}
