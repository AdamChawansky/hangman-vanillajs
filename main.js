const dictionary = ['WATERMELON', 'VIRTUAL REALITY', 'THE ART OF WAR', 'CORRELATION IS NOT CAUSATION', 'BEAUTY IS SKIN DEEP', 'BEND WITH YOUR KNEES', 'HOTEL CALIFORNIA', 'WASH YOUR HANDS', 'PARALLEL PARKING', 'VENUS FLY TRAP', 'GOD CREATED THE INTEGERS', 'ABRACADABRA', 'PETE THE CAT', 'WINTER IS COMING', 'KEEP YOUR FRIENDS CLOSE', 'AMERICA THE BEAUTIFUL']
let wordToGuess = '';
let guesses = [];
const MAX_WRONG = 6;
const statusElm = document.getElementById('game_status');

function startGame() {
  wordToGuess = dictionary[Math.floor(dictionary.length * Math.random())];
  guesses = []; // ['a', 'b']
  const buttons = document.getElementsByClassName('letter_button');
  Array.from(buttons).forEach(element => element.disabled = false);
  statusElm.innerText = '';
  updateHangman();
}

function updateHangman() {
  // Count # of letters guessed that are not in wordToGuess 
  const wrongGuess = guesses.filter(c => !wordToGuess.includes(c)).length;
  document.getElementById('count').innerText = wrongGuess;

  // Construct a string of KNOWN letters by splitting into an array and comparing each letter to guessed letters
  const currentState = wordToGuess
    .split('')
    .map(c => (
      (c === ' ' && '/') ||
      (guesses.includes(c) && c) ||
      '_'
    ));
	document.getElementById('solution').innerText = currentState.join(" ");

  // Draw the picture
  const imageURL = `images/h${wrongGuess}.png`;
  const hangmanPicture = document.getElementById('picture');
  hangmanPicture.src = imageURL;

  // Check for WIN or LOSE
  const guessedWord = wordToGuess.split('').filter(c => c === ' ' || guesses.includes(c));
  const hasWon = wordToGuess === guessedWord.join('');   // If you guessed all the letters, display WIN
  const hasLost = wrongGuess >= MAX_WRONG;  // If you reached MAX_WRONG, display LOSE
  if (hasWon) {
    statusElm.innerText = 'YOU WIN!'
  } else if (hasLost) {
    statusElm.innerText = 'YOU LOSE!'
  }
  if (hasWon || hasLost) {
    const buttons = document.getElementsByClassName('letter_button');
    Array.from(buttons).forEach(element => element.disabled = true);
  }
}

function generateButton(char) {
  const newButton = document.createElement('button');
  newButton.innerText = char;
  newButton.classList.add('letter_button');
  newButton.addEventListener('click', () => {
    guesses.push(char);
    updateHangman();
    newButton.disabled = true;
  });
  document.getElementById('buttons').appendChild(newButton);
}

function setupPage() {
  // Create buttons to guess letters
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alphabet.split('').forEach(char => generateButton(char));

  // Create button to start with a new word
  const newButton = document.createElement('button');
  newButton.innerText = 'New Game';
  newButton.addEventListener('click', () => {
    // location.reload(); // cheating way by reloading the webpage
    startGame();
  });
  document.getElementById('reset_word').appendChild(newButton);

  startGame();
}

setupPage();

/* Homework:
  Add button that changes the word to guess
  Figure out the picture (use # wrong to decide what to draw, save JPGs)
  Split into multiple JS files
    - how to import multiple JS files
    - variable access
*/