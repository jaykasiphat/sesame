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
  let passwordLength = document.querySelector('#password-length').value;  

  if (!validPasswordLength(passwordLength)) {
    alertErrorMessage();
    return;
  }

  passwordLength = Number(passwordLength);

  for (let i = 0; i < 2; i++) {
    const password = generatePassword(passwordLength);
    passwords.push(password);
  }

  console.log(passwords);
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
}

const alertErrorMessage = function() {
  alert('Password length must be a number from 8 - 15');
}

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
}

const getValidCharacters = function() {
  const includeNumbers = document.querySelector('#include-numbers').checked;
  const includeSymbols = document.querySelector('#include-symbols').checked;

  if (!includeNumbers && !includeSymbols) {
    validCharacters = characters.slice(0, 52);
  } else if (!includeNumbers) {
    validCharacters = [...characters.slice(0, 52), ...characters.slice(62)];
  } else if (!includeSymbols) {
    validCharacters = characters.slice(0, 62);
  } else {
    validCharacters = characters;
  }

  return validCharacters;
}

const btn = document.querySelector('button');
btn.addEventListener('click', displayPasswords);