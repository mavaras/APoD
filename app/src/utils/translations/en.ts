import { ResourceLanguage } from 'i18next';


// eslint-disable-next-line import/prefer-default-export
export const enTranslations: ResourceLanguage = {
  explore: {
    searchBarPlaceholder: 'Search pictures...',
    waitingScreen: 'Some error occurred\nwhile loading pictures',
  },
  picture: {
    downloadingPicture: 'Downloading picture...',
    downloadPictureSuccess: 'Image succesfully downloaded to your gallery!',
    sharePicturePrev: 'Preparing picture for share...',
    similarsLabel: 'Similar Pictures',
    waitingScreen: "Today's APoD will appear soon.\nStay tuned!",
  },
  settings: {
    labels: {
      appearance: 'Appearance',
      buyMeACoffee: 'Buy me a coffee',
      issues: 'Report an issue',
      mentions: 'Mentions',
      rateApp: 'Rate this app',
      repo: 'Source code',
    },
    links: {
      buyMeACoffee: 'https://www.buymeacoffee.com/mavaras',
      issues: 'https://www.github.com/mavaras/APoD/issues',
      repo: 'https://www.github.com/mavaras/APoD',
    },
  },
};
