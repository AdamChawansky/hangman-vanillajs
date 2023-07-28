"use strict";
function generateButton(char) {
    var _a;
    const newButton = document.createElement('button');
    newButton.innerText = char;
    newButton.classList.add('letter_button');
    newButton.addEventListener('click', () => {
        guesses.push(char);
        updateHangman();
        newButton.disabled = true;
    });
    (_a = document.getElementById('buttons')) === null || _a === void 0 ? void 0 : _a.appendChild(newButton);
}
