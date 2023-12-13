let wordToGuess = '';
let guesses: string[] = [];
const MAX_WRONG = 6;
const statusElm = document.getElementById('game_status')!;
const dictionary: string[] = [];

function startGame() {
  wordToGuess = dictionary[Math.floor(dictionary.length * Math.random())];
  guesses = []; // ['a', 'b']
  const buttons = document.getElementsByClassName('letter_button');
  Array.from(buttons).forEach(element => (element as HTMLButtonElement).disabled = false);
  statusElm.innerText = '';
  updateHangman();
}

function updateHangman() {
  // Count # of letters guessed that are not in wordToGuess 
  const wrongGuess = guesses.filter(c => !wordToGuess.includes(c)).length;
  document.getElementById('count')!.innerText = wrongGuess.toString();

  // Construct a string of KNOWN letters by splitting into an array and comparing each letter to guessed letters
  const currentState = wordToGuess
    .split('')
    .map(c => (
      (c === ' ' && '/') ||
      (guesses.includes(c) && c) ||
      '_'
    ));
	document.getElementById('solution')!.innerText = currentState.join(" ");

  // Draw the picture
  const imageURL = `images/h${wrongGuess}.png`;
  const hangmanPicture = document.getElementById('picture') as HTMLImageElement;
  hangmanPicture.src = imageURL;

  // Check for WIN or LOSE
  const guessedWord = wordToGuess.split('').filter(c => c === ' ' || guesses.includes(c));
  const hasWon = wordToGuess === guessedWord.join('');   // If you guessed all the letters, display WIN
  const hasLost = wrongGuess >= MAX_WRONG;  // If you reached MAX_WRONG, display LOSE
  if (hasWon) {
    statusElm.innerText = 'YOU WIN!';
  } else if (hasLost) {
    statusElm.innerText = 'YOU LOSE!';
  }
  if (hasWon || hasLost) {
    const buttons = document.getElementsByClassName('letter_button');
    Array.from(buttons).forEach(element => (element as HTMLButtonElement).disabled = true);
  }
}

async function fetchDictionary() {
  const response = await fetch("data/dictionary.txt");
  const text = await response.text();
  const newDictionary = text.trim().split("\n").map(line => line.trim());
  dictionary.push(...newDictionary);
}

async function setupPage() {
  // wait for fetchDictionary
  await fetchDictionary();

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
  document.getElementById('reset_word')!.appendChild(newButton);

  startGame();
}

setupPage();

/* Homework:
  CSS styling
  - buttons in 4 rows of 7 (without changing JS code)
  - make it a mobile version
  - not allowed to use float
  Port to TypeScript (.ts) or React (.jsx)
  - run code through WebPack or Babble to translate code into JS
  Automate dictionary file using API
*/