export type PictureType = {
  title: string;
  explanation: string;
  date: string;
  url: string;
  author: string;
  explorePicture?: object;
};

export type RootStackParamList = {
  Explore: undefined;
  Settings: undefined;
  Picture: undefined;
  ExplorePicture: undefined;
};
