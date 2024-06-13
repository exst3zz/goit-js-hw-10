import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
};

let userSelectedDate;
let intervalId;
refs.startBtn.disabled = true;

flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const dateCurrent = Date.now();
    if (userSelectedDate < dateCurrent) {
      iziToast.show({
        message: 'Please choose a date in the future',
        backgroundColor: '#ef4040',
        messageColor: '#fff',
        iconUrl: errorIcon,
        position: 'topRight',
      });
      refs.startBtn.disabled = true;
    } else {
      refs.startBtn.disabled = false;
    }
  },
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function createTime({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = days.toString().padStart(2, '0');
  refs.hoursEl.textContent = hours.toString().padStart(2, '0');
  refs.minutesEl.textContent = minutes.toString().padStart(2, '0');
  refs.secondsEl.textContent = seconds.toString().padStart(2, '0');
}

refs.startBtn.addEventListener('click', () => {
  const initTime = new Date(userSelectedDate);
  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = initTime - currentTime;
    const time = convertMs(diff);
    createTime(time);
    refs.startBtn.disabled = true;
    refs.inputDate.disabled = true;
  }, 1000);
  setTimeout(() => {
    clearInterval(intervalId);
    refs.inputDate.disabled = false;
    refs.startBtn.disabled = false;
  }, initTime - Date.now());
});
