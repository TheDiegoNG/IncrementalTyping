import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      multiUpgrade1Desc: '+1 Point per Word!',
      multiUpgrade2Desc: '+1 Letter per word!',
      multiUpgrade3Desc: '+25% Points!',
      basicUpgrade1Title: 'First Upgrade of them all',
      basicUpgrade1Desc: 'x1.3 Points',
      basicUpgrade2Title: 'Your words value a little bit more, absolutely',
      basicUpgrade2Desc: '+4 Points per Word',
      basicUpgrade3Title: "I'm speed",
      basicUpgrade3Desc: 'Get a letter per minute counter',
      basicUpgrade4Title: 'You found a word passive enhancer!',
      basicUpgrade4Desc: 'Unlock passive income',
      basicUpgrade5Title: '2nd Upgrade of this type',
      basicUpgrade5Desc: 'x1.5 Points',
      basicUpgrade6Title: 'Every goal has its reward',
      basicUpgrade6Desc: 'Every achievement gives a bonus!',
      basicUpgrade7Title: 'Your words value a bit more more, absolutely again',
      basicUpgrade7Desc: '+10 points per word',
      basicUpgrade8Title: 'You found a Scrabble module!',
      basicUpgrade8Desc: 'Every letter gets a value',
      basicUpgrade9Title: 'Gacha. Yes, gacha',
      basicUpgrade9Desc: 'Unlocks Cards!',
      basicUpgrade10Title: '3rd time',
      basicUpgrade10Desc: 'x2 points',
      basicUpgrade11Title: 'You can challenge yourself to be better next time',
      basicUpgrade11Desc: 'Unlock Challenges!',
      basicUpgrade12Title: 'Last Basic Upgrade! Your words value MORE, a bit more',
      basicUpgrade12Desc: '+20 points per word',
    },
  },
  es: {
    translation: {
      multiUpgrade1Desc: '+1 Punto por Palabra!',
      multiUpgrade2Desc: '+1 Letra por Palabra!',
      multiUpgrade3Desc: '+25% Puntos!',
      basicUpgrade1Title: 'La primera mejora de todas',
      basicUpgrade1Desc: 'x1.3 Puntos',
      basicUpgrade2Title: 'Tus palabras valen un poquito más, absolutamente',
      basicUpgrade2Desc: '+4 Puntos por Palabra',
      basicUpgrade3Title: 'Rápido y Furioso',
      basicUpgrade3Desc: 'Obtienes un contador de Letras por Minuto',
      basicUpgrade4Title: 'Encontraste un mejorador de palabras pasivo!',
      basicUpgrade4Desc: 'Desbloqueas Ganancia Pasiva',
      basicUpgrade5Title: '2nda Mejora de este estilo',
      basicUpgrade5Desc: 'x1.5 Puntos',
      basicUpgrade6Title: 'Cada meta tiene su recompensa',
      basicUpgrade6Desc: 'Cada logro te da un bonus!',
      basicUpgrade7Title: 'Tus palabras valen un poquito más, un poquito más, absolutamente de vuelta',
      basicUpgrade7Desc: '+10 Puntos por Palabra',
      basicUpgrade8Title: 'Encuentras un módulo Scrabble!',
      basicUpgrade8Desc: 'Todas las letras obtienen un valor',
      basicUpgrade9Title: 'Gacha. Sí, gacha',
      basicUpgrade9Desc: 'Desbloqueas las Cartas!',
      basicUpgrade10Title: '3ra vez',
      basicUpgrade10Desc: 'x2 Puntos',
      basicUpgrade11Title: 'Puedes desafiarte a ser un poco mejor la próxima vez',
      basicUpgrade11Desc: 'Desbloqueas los desafíos!',
      basicUpgrade12Title: 'Última mejora básica! Tus palabras valen MÁS, un poco más',
      basicUpgrade12Desc: '+20 Puntos por palabra'
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