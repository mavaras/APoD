import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { enTranslations } from './en';


i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
    },
    lng: 'en',
    fallbackLng: 'en',
    react: {
      useSuspense: false,
    },
  })
  .catch((error: Error): void => {
    throw error;
  });

export { i18next };
