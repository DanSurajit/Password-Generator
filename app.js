const charsUppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const charsLowercase = "abcdefghijklmnopqrstuvwxyz";
const charsNumber = "0123456789";
const charsSymbol = "!@#$%^&*()_";

const slider = document.querySelector('.slider');

const uppercaseCheckbox = document.getElementById('uppercase');
const lowercaseCheckbox = document.getElementById('lowercase');
const numberCheckbox = document.getElementById('numbers');
const symbolCheckbox = document.getElementById('symbols');

const passField = document.querySelector('.pass-field');
const currentLength = document.querySelector('.current-length');

const passwordStrengthText = document.querySelector('.password-strength-text');

const generateButton = document.querySelector('.generate-btn button');

function validate() {
    const isValid = (uppercaseCheckbox.checked || lowercaseCheckbox.checked || numberCheckbox.checked || symbolCheckbox.checked) && slider.value

    if (!isValid) {
        generateButton.disabled = true
        generateButton.classList.add('disabled')
    } else {
        generateButton.disabled = false
        generateButton.classList.remove('disabled')
    }

}

uppercaseCheckbox.addEventListener('change', validate)
lowercaseCheckbox.addEventListener('change', validate)
numberCheckbox.addEventListener('change', validate)
symbolCheckbox.addEventListener('change', validate)
slider.addEventListener('change', function(){
    currentLength.innerHTML = slider.value;
    validate()
})

function randomPassword() {
  let chars = "";
  let pwordLength = slider.value;
  let password = "";

  if (uppercaseCheckbox.checked) {
    chars += charsUppercase
  }
  if (lowercaseCheckbox.checked) {
    chars += charsLowercase
  }
  if (numberCheckbox.checked) {
    chars += charsNumber
  }
  if (symbolCheckbox.checked) {
    chars += charsSymbol
  }

  const array = new Uint32Array(chars.length);
  window.crypto.getRandomValues(array);
  
  for (let i = 0; i < pwordLength; i++) {
    password += chars[array[i] % chars.length];
  }

  passField.innerHTML = password

  checkStrength(password.length, [uppercaseCheckbox.checked, lowercaseCheckbox.checked, numberCheckbox.checked, symbolCheckbox.checked].filter(x => x).length);

}

generateButton.addEventListener('click', randomPassword)

function checkStrength(passwordLength, checkedNumber) {
    if (passwordLength <= 8) {
        passwordStrengthText.innerHTML = 'too weak!'
    }
    if (passwordLength >= 8  && passwordLength <= 10 && checkedNumber < 2) {
        passwordStrengthText.innerHTML = 'weak'
    }
    if (passwordLength > 10 && passwordLength < 15 && checkedNumber >= 2) {
        passwordStrengthText.innerHTML = 'medium'
    }
    if (passwordLength >= 15 && checkedNumber == 4) {
        passwordStrengthText.innerHTML = 'strong'
    }
}