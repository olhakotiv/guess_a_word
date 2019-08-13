let canvas = document.getElementById("canvas"),
  ctx = canvas.getContext("2d");

//return random word
const pickWord = () => {
  let words = [
    'javascript',
    'monkey',
    'amazing',
    'pancake',
    'game',
    'cat',
    'card'
  ];
  return words[Math.floor(Math.random() * words.length)];
};

//return answer array
const setupAnswerArray = (word) => {
  let answerArray = [];
  for (let i = 0; i < word.length; i++) {
    answerArray[i] = '_';
  };
  return answerArray;
};

//show player's progress with alert
const showPlayerProgress = (answerArray) => {
  alert(answerArray.join(' '));
};

//get a letter
const getGuess = () => {
  return prompt('Guess a letter, or click Cancell to stop playing.').toLowerCase();
};

//get a number how much times a letter meets in a word
const updateGameState = (guess, word, answerArray) => {
  var appearances = 0;
  for (var j = 0; j < word.length; j++) {
    if (word[j] === guess) {
      answerArray[j] = guess;
      appearances++;
    }
  }
  return appearances;
};

//congratulate player if he won
const showAnswerAndCongratulatePlayer = (answerArray) => {
  showPlayerProgress(answerArray);
  if (tries > 0) {
    alert("Good job! The answer was " + word);
  } else {
    alert("Too bad! The answer was " + word);
  }
};

//draw a line if an answer was incorect
const drawSegment = function(incorrectGuesses) {
  ctx.lineWidth = 4;

  if (incorrectGuesses === 0) {
    ctx.strokeRect(20, 20, 20, 20);
  } else if (incorrectGuesses === 1) {
    ctx.beginPath();
    ctx.moveTo(30, 40);
    ctx.lineTo(30, 80);
    ctx.stroke();
  } else if (incorrectGuesses === 2) {
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(10, 110);
    ctx.stroke();
  } else if (incorrectGuesses === 3) {
    ctx.beginPath();
    ctx.moveTo(30, 80);
    ctx.lineTo(50, 110);
    ctx.stroke();
  } else if (incorrectGuesses === 4) {
    ctx.beginPath();
    ctx.moveTo(30, 60);
    ctx.lineTo(10, 50);
    ctx.stroke();
  } else if (incorrectGuesses === 5) {
    ctx.beginPath();
    ctx.moveTo(30, 60);
    ctx.lineTo(50, 50);
    ctx.stroke();
  }
};

let word = pickWord(),
  answerArray = setupAnswerArray(word),
  remainingLetters = word.length,
  tries = 6,
  incorrectGuesses = 0;

while (remainingLetters > 0 && tries > 0) {
  showPlayerProgress(answerArray); //show how much letters was guessed
  let guess = getGuess(); //get a letter

  if (guess === null) {
    break; //if cancell was pressed stop the game
  } else if (guess.length !== 1) {
    alert('Please enter a single letter!'); //if an answer was 2 or more letter ask to enter 1 letter
  } else {
    tries--;
    let correctGuesses = updateGameState(guess, word, answerArray);
    remainingLetters -= correctGuesses; //delete number of correct guesses from word.length
    if (correctGuesses === 0) {
      drawSegment(incorrectGuesses); //if an answer was wrong draw a body part
      incorrectGuesses++;
    }
  }
}

showAnswerAndCongratulatePlayer(answerArray);
