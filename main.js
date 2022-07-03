const btn = document.querySelector('button');
const passwordSpans = document.querySelectorAll('#passwords span');
const characters = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "~", "`", "!",
  "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "-", "+", "=",
  "{", "[", "}", "]", ",", "|", ":", ";", "<", ">", ".", "?", "/"
];

const displayPasswords = function() {
  let passwords = [];
  const passwordLength = document.querySelector('#password-length').value;

  if (!validPasswordLength(passwordLength)) {
    alertErrorMessage();
    return;
  }

  for (let i = 0; i < 2; i++) {
    const password = generatePassword(Number(passwordLength));
    passwords.push(password);
  }

  passwordSpans.forEach((passwordSpan, i) => {
    displayPassword(passwordSpan, passwords, i);
  });
};

const validPasswordLength = function(passwordLength) {
  if (
    passwordLength.length === 0
    || !Number.isInteger(Number(passwordLength))
    || Number(passwordLength) < 8
    || Number(passwordLength) > 15
  ) {
    return false;
  }

  return true;
};

const alertErrorMessage = function() {
  alert('Password length must be a number from 8 - 15');
};

const generatePassword = function(length) {
  let validCharacters = getValidCharacters();
  let randomIndexes = [];
  let password = '';

  for (let i = 0; i < length; i++) {
    const randomNumber = Math.floor(Math.random() * validCharacters.length);
    randomIndexes.push(randomNumber);
  }

  randomIndexes.forEach((index) => {
    password += validCharacters[index];
  });

  return password;
};

const getValidCharacters = function() {
  const includeNumbers = document.querySelector('#include-numbers').checked;
  const includeSymbols = document.querySelector('#include-symbols').checked;

  if (!includeNumbers && !includeSymbols) {
    return characters.slice(0, 52);
  } else if (!includeNumbers) {
    return [...characters.slice(0, 52), ...characters.slice(62)];
  } else if (!includeSymbols) {
    return characters.slice(0, 62);
  } else {
    return characters;
  }
};

const displayPassword = function(passwordSpan, passwordArr, idx) {
  const clipboardImg = document.createElement('img');
  const span = document.createElement('span');

  clipboardImg.src = 'copy.png';
  clipboardImg.alt = 'copy to clipboard';
  clipboardImg.classList.add('clipboard-img');
  span.textContent = passwordArr[idx];

  passwordSpan.textContent = '';
  passwordSpan.appendChild(clipboardImg);
  passwordSpan.appendChild(span);
  passwordSpan.style.cursor = 'pointer';
};

const copy = function(e) {
  const password = e.target.textContent;

  if (password !== '') {
    navigator.clipboard.writeText(password);
  }

  displayCopyMessage();
};

const displayCopyMessage = function() {
  const passwordSection = document.querySelector('#passwords');
  const messageP = document.createElement('p');

  messageP.id = 'copy-prompt';
  messageP.textContent = 'Copied to clipboard';
  passwordSection.appendChild(messageP);

  setTimeout(() => {
    messageP.remove();
  }, '1200');
};

btn.addEventListener('click', displayPasswords);
passwordSpans.forEach((span) => span.addEventListener('click', copy));