function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
let timer = null;

buttonStart.addEventListener('click', onChangeColorStart);
buttonStop.addEventListener('click', onChangeColorStop);
buttonStop.setAttribute('disabled', true);

function onChangeColorStart(event) {
  timer = setInterval(() => {
    let randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);

  buttonStart.setAttribute('disabled', true);
  buttonStop.removeAttribute('disabled');
}

function onChangeColorStop(event) {
  clearInterval(timer);

  buttonStart.removeAttribute('disabled');
  buttonStop.setAttribute('disabled', true);
}


