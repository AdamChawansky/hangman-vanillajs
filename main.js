console.log('hello world');

const wordToGuess = 'WATERMELON';
const guesses = []; // ['a', 'b']

function updateHangman() {
  const wrongGuess = guesses.reduce((accumulator, char) => {
    if(!wordToGuess.includes(char)) {
        accumulator++
    }
    return accumulator;
  }, 0);
  document.getElementById('count').innerText = wrongGuess;

  // Construct a string of KNOWN letters
  const currentState = [];
  for (let i = 0; i < wordToGuess.length; i++) {
    if (guesses.includes(wordToGuess[i])) {
        currentState.push(wordToGuess[i]);
    } else {
        currentState.push('_');
    }
  }
	document.getElementById('solution').innerText = currentState.join("");
}

function generateButton(char) {
  const newButton = document.createElement('button');
  newButton.innerText = char;
  newButton.addEventListener('click', () => {
    console.log(char);
    if (!guesses.includes(char)) {
        guesses.push(char);
        updateHangman();
    }
  });
  document.getElementById('buttons').appendChild(newButton);
}

function setupPage() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alphabet.split('').forEach(char => generateButton(char));
}

setupPage();