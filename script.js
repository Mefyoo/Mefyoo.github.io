const VOCABULARY = {
  'pory roku': [
    ['wiosna', 'spring'],
    ['lato', 'summer'],
    ['jesień', 'autumn'],
    ['zima', 'winter'],
  ],
  pogoda: [
    ['pogoda', 'the weather'],
    ['jaka jest pogoda?', "what's the weather like?"],
    ['pada śnieg', "it's snowing"],
    ['jest zimno', "it's cold"],
    ['jest gorąco', "it's hot"],
    ['pada deszcz', "it's raining"],
    ['jest burzowo', "it's stormy"],
    ['jest wietrznie', "it's windy"],
    ['jest słonecznie', "it's sunny"],
    ['jest pochmurno', "it's cloudy"],
    ['jest ciepło', "it's warm"],
    ['pada śnieg', "it's snowing"],
    ['dzisiaj', 'today'],
    ['jest mokro', "it's wet"],
  ],
  czynności: [
    ["She's swimming", 'Ona pływa'].reverse(),
    ["He's juggling", 'On żongluje'].reverse(),
    ['it is flying', 'Ono leci'].reverse(),
    ["He's jumping", 'On skacze'].reverse(),
    ["she's singing", 'ona śpiewa'].reverse(),
    ["she's dancing", 'ona tańczy'].reverse(),
    ["he's talking", 'on mówi'].reverse(),
    ["he's drawing", 'on rysuje'].reverse(),
    ['it is running', 'ono biega'].reverse(),
  ],
  'there is/are...': [
    ['tutaj jest kot', 'there is a cat'],
    ['tutaj są psy', 'there are dogs'],
    ['tutaj jest stół', 'there is a table'],
    ['tutaj jest dwóch nauczycieli', 'there are two teachers'],
    ['tutaj nie ma psa', "there isn't a dog"],
    ['tutaj nie ma kotów', "there aren't cats"],
    ['tu nie ma żadnych psów', "there aren't any dogs"],
    [
      'Czy jest wysoka dziewczyna w tej klasie?',
      'Is there a tall girl in this class?',
    ],
    ['Czy są tu koty?', 'Are there cats?'],
    ['Czy są tu jakieś psy?', 'Are there any dogs here?'],
  ],
};

const QUESTION = document.getElementById('question');
const ANSWER = document.getElementById('answer');
const BTN_CONFIRM = document.getElementById('btn-confirm');
const CORRECT_ANSWER_SCREEN = document.getElementById('correct-answer-screen');
const WRONG_ANSWER_SCREEN = document.getElementById('wrong-answer-screen');
const BTN_NEXT_CORRECT = document.getElementById('btn-next-correct');
const BTN_NEXT_WRONG = document.getElementById('btn-next-wrong');
const RESULTS_SCREEN = document.getElementById('results-screen');
const FINAL_RESULT = document.getElementById('final-result');
const PERCENTAGES = document.getElementById('percentages');
const LEVEL_SCREEN = document.getElementById('level-screen');
const START_SCREEN = document.getElementById('start-screen');

const BTN_RESTART = document.getElementById('btn-restart');
BTN_RESTART.addEventListener('click', () => {
  location.reload();
});

let score = 0;
let maxScore = 0;
const LEVELS = [];
let levelIndex = 0;
let levelCount = 0;
const CATEGORIES_WRAPPER = document.getElementById('categories-wrapper');
const CATEGORIES = Object.keys(VOCABULARY);
CATEGORIES.forEach((category) => {
  const BTN_CATEGORY = document.createElement('button');
  BTN_CATEGORY.classList.add('btn-category');
  BTN_CATEGORY.id = category;
  BTN_CATEGORY.innerText = category;
  BTN_CATEGORY.addEventListener('click', () => {
    BTN_CATEGORY.classList.toggle('btn-category--disabled');
  });
  CATEGORIES_WRAPPER.appendChild(BTN_CATEGORY);
});

const BTN_START = document.getElementById('btn-start');
BTN_START.addEventListener('click', () => {
  const CURRENT_CATEGORIES = CATEGORIES.filter((category) => {
    return !document
      .getElementById(category)
      .classList.contains('btn-category--disabled');
  });
  if (CURRENT_CATEGORIES.length === 0) return;
  let TRANSLATIONS = [];
  for (let category of CURRENT_CATEGORIES) {
    TRANSLATIONS = TRANSLATIONS.concat(VOCABULARY[category]);
  }
  const NUMBER_OF_LEVELS = 10;
  for (let i = 0; i < NUMBER_OF_LEVELS; i++) {
    LEVELS.push(
      createLevel(TRANSLATIONS[Math.floor(Math.random() * TRANSLATIONS.length)])
    );
  }
  levelCount = LEVELS.length;
  maxScore = levelCount;
  score = 0;
  LEVELS[0]();
});

function createLevel(translation) {
  START_SCREEN.classList.add('hidden');
  LEVEL_SCREEN.classList.remove('hidden');
  const TYPE = Math.ceil(Math.random() * 1);
  switch (TYPE) {
    case 1:
      return createLevel1(translation);
  }
}
function createLevel1(translation) {
  return function () {
    BTN_CONFIRM.classList.remove('hidden');
    QUESTION.innerText = translation[0];
    const ANSWER_FIELD = document.createElement('input');
    ANSWER_FIELD.type = 'text';
    ANSWER.appendChild(ANSWER_FIELD);
    ANSWER_FIELD.focus();
    BTN_CONFIRM.addEventListener(
      'click',
      () => {
        BTN_CONFIRM.classList.add('hidden');
        if (ANSWER_FIELD.value.toLowerCase() === translation[1].toLowerCase()) {
          CORRECT_ANSWER_SCREEN.classList.remove('hidden');
          LEVELS.splice(levelIndex, 1);
          score += 1;
          levelCount -= 1;
          BTN_NEXT_CORRECT.addEventListener(
            'click',
            () => {
              ANSWER_FIELD.remove();
              CORRECT_ANSWER_SCREEN.classList.add('hidden');
              if (levelCount === 0) {
                FINAL_RESULT.innerText = `${score}/${maxScore}`;
                PERCENTAGES.innerText = `${Math.round(
                  (score / maxScore) * 100
                )}%`;
                LEVEL_SCREEN.classList.add('hidden');
                RESULTS_SCREEN.classList.remove('hidden');
              } else {
                if (levelIndex >= levelCount) {
                  levelIndex = 0;
                }
                LEVELS[levelIndex]();
              }
            },
            { once: true }
          );
        } else {
          WRONG_ANSWER_SCREEN.classList.remove('hidden');
          document.getElementById('correct-answer').innerText = translation[1];
          levelIndex += 1;
          maxScore += 1;
          BTN_NEXT_WRONG.addEventListener(
            'click',
            () => {
              ANSWER_FIELD.remove();
              WRONG_ANSWER_SCREEN.classList.add('hidden');
              if (levelCount === 0) {
                FINAL_RESULT.innerText = `${score}/${maxScore}`;
                PERCENTAGES.innerText = `${Math.round(
                  (score / maxScore) * 100
                )}%`;
                LEVEL_SCREEN.classList.add('hidden');
                RESULTS_SCREEN.classList.remove('hidden');
              } else {
                if (levelIndex >= levelCount) {
                  levelIndex = 0;
                }
                LEVELS[levelIndex]();
              }
            },
            { once: true }
          );
        }
      },
      { once: true }
    );
  };
}
