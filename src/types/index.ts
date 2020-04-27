export type Item = {
  id: number;
  name: string;
  shortInfo: string;
  more: string;
};

export type Response = {
  basepath: string;
  data: Array<Item>;
};

export type ExtendedItem = {
  id: number;
  bio: string;
  pic: string;
};
