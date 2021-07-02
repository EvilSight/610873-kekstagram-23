function checkStringLength(string, length) {
  return string.length <= length;
}

// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

function getRandomPositiveInteger(firstNumber, secondNumber) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(firstNumber), Math.abs(secondNumber)));
  const upper = Math.floor(Math.max(Math.abs(firstNumber), Math.abs(secondNumber)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}
checkStringLength();
getRandomPositiveInteger();

const NAMES = [
  'Дмитрий',
  'Уасилий',
  'Евкакий',
  'Анжелла',
  'Чикуля',
  'Енот',
  'Маруська',
  'Нина',
  'Кексобот',
  'Вендор',
  'Антарас',
  'Валакас',
  'Баюм',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Миру - Мир',
  'Hello World!',
  'Дал угла - дал столба',
  'Кто-то в код - кто-то в грот',
  'Дал , дал - ушёл',
  'Батя в здании',
  'Тяжело в учении , но легко курьером',
  'Рубль 30 , Евро 40',
  'Даблкрит',
  'Быстро бегаешь?',
  'Сказочное Бали',
  'Румтур по шараге',
  'А как вы проводите выходные?',
  'Потрясающий закат!',
  'Ночной дожор',
  'Без слов...',
];

const PHOTO_COUNT = 25;
const MIN_PHOTO_DESCRIPTION_ID = 1;
const MIN_COMMENTS_COUNT = 0;
const MAX_COMMENTS_COUNT = 3;
const MIN_MESSAGES_COUNT = 1;
const MAX_MESSAGES_COUNT = 2;
const MIN_NUMBER_IN_AVATAR_NAME = 1;
const MAX_NUMBER_IN_AVATAR_NAME = 6;
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

/**
 * Получение случайного сообщения из нескольких элеиментов массива MESSAGES
 */
const getRandomMessage = () => {
  const sentenceCount = getRandomInt(MIN_MESSAGES_COUNT, MAX_MESSAGES_COUNT);

  return Array(sentenceCount).fill().map(() => getRandomArrayElement(MESSAGES)).join(' ');
};

const createRandomComment = (id) => ({
  id: id,
  avatar: `img/avatar-${getRandomInt(MIN_NUMBER_IN_AVATAR_NAME, MAX_NUMBER_IN_AVATAR_NAME)}.svg`,
  message: getRandomMessage(),
  name: getRandomArrayElement(NAMES),
});

/**
 * Генерация массива массивов с объектами - комментариями,
 * где id сообщения - уникальное случайное число от 1 до кол-ва сгенерированных комментариев
 */

const createRandomComments = () => {
  const randomCommentsCountsPerItem = new Array(PHOTO_COUNT)
    .fill()
    .map(() => getRandomInt(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT));
  const totalCommentsCount = randomCommentsCountsPerItem.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
  );

  const orderedIds = new Array(totalCommentsCount)
    .fill()
    .map((_element, index) => index + 1);

  let randomIndex;
  const comments = new Array(PHOTO_COUNT).fill().map(() => []);

  randomCommentsCountsPerItem.forEach((commentsCount, index) => {

    // eslint-disable-next-line id-length
    for (let i = 1; i <= commentsCount && orderedIds.length; i++) {
      randomIndex = getRandomInt(0, orderedIds.length - 1);
      comments[index].push(createRandomComment(orderedIds[randomIndex]));
      orderedIds.splice(randomIndex, 1);
    }
  });

  return comments;
};

const randomPhotoComments = createRandomComments();

const createPhotoDescription = (id) => ({
  id: id,
  url: `photos/${id}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInt(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
  comments: randomPhotoComments[id - 1],
});

// eslint-disable-next-line no-unused-vars
const photoGallery = new Array(PHOTO_COUNT).fill().map((_element, index) => createPhotoDescription(index + MIN_PHOTO_DESCRIPTION_ID));
