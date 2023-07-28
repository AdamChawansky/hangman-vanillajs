export function generateButton(char: string) {
  const newButton = document.createElement('button');
  newButton.innerText = char;
  newButton.classList.add('letter_button');
  newButton.addEventListener('click', () => {
    guesses.push(char);
    updateHangman();
    newButton.disabled = true;
  });
  document.getElementById('buttons')?.appendChild(newButton);
}
