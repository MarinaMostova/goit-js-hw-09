import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';


const input = document.querySelector('#datetime-picker');
const button = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let timer = null;

button.addEventListener('click', onStartTimeCounting);
button.setAttribute('disabled', true);
button.classList.add('start-button');
button.classList.add('is-disabled');

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    button.removeAttribute('disabled');
    button.classList.remove('is-disabled');
  },
});
require('flatpickr/dist/themes/material_blue.css');

function onStartTimeCounting(event) {
  input.setAttribute('disabled', true);
  button.setAttribute('disabled', true);
  button.classList.add('is-disabled');

  timer = setInterval(() => {
    const currentTime = Date.now();
    const selectedTime = new Date(input.value).getTime();
    const countdownTime = selectedTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(countdownTime);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

    if (countdownTime < 1000) {
      clearInterval(timer);

      button.setAttribute('disabled', true);
      input.removeAttribute('disabled');
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
