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

export type RocketLaunchType = {
  name: string;
  location: string;
  wikiUrl: string;
  infoUrls: string;
  videoUrls: string;
  date: string;
  missions: string;
  latitud: string;
  longitude: string;
  description: string;
  typeName: string;
  image: string;
};

export type SettingMenuItemType = {
  action: any;
  title: string;
  iconName: string;
  extraStyle?: ViewStyle;
};

export type MentionsDataType = {
  title: string;
  titles: MentionsItemType[];
}

export type MentionsItemType = {
  title: string;
  person: string;
  url?: string;
}
