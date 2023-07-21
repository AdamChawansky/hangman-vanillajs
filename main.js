console.log('hello world');

const wordToGuess = 'WATERMELON';
const guesses = []; // ['a', 'b']

function updateHangman() {
  const wrongGuess = guesses.filter(c => !wordToGuess.includes(c)).length;
  document.getElementById('count').innerText = wrongGuess;

  // Construct a string of KNOWN letters
  const currentState = wordToGuess
    .split('')
    .map(c => guesses.includes(c) ? c : '_');
	document.getElementById('solution').innerText = currentState.join(" ");
}

function generateButton(char) {
  const newButton = document.createElement('button');
  newButton.innerText = char;
  newButton.addEventListener('click', () => {
    guesses.push(char);
    updateHangman();
    newButton.disabled = true;
  });
  document.getElementById('buttons').appendChild(newButton);
}

function setupPage() {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  alphabet.split('').forEach(char => generateButton(char));
  updateHangman();
}

setupPage();

/* Homework:
  Add button that changes the word to guess
  Figure out the picture (use # wrong to decide what to draw, save JPGs)
  
*/