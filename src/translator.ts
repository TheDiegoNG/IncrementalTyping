import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      multiUpgrade1Desc: '+1 Point per Word!',
      multiUpgrade2Desc: '+1 Letter per word!',
      multiUpgrade3Desc: '+25% Points!',
    },
  },
  es: {
    translation: {
      multiUpgrade1Desc: '+1 Punto por Palabra!',
      multiUpgrade2Desc: '+1 Letra por Palabra!',
      multiUpgrade3Desc: '+25% Puntos!',
    },
  },
};

i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
  });

export default i18next;