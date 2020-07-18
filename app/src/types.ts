import { ViewStyle } from 'react-native';


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

export type ArticleType = {
  title: string;
  image: string;
  tags: string;
  url: string;
  site: string;
  date: string;
  categories: string;
};

export type SettingMenuItemType = {
  action: any;
  title: string;
  iconName: string;
  extraStyle?: ViewStyle;
};
