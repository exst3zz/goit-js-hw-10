import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from '../img/error.svg';
import successIcon from '../img/success.svg';

const formEl = document.querySelector('.form');

function caseMessage(messageState, delay = 0) {
  const commonSettings = {
    theme: 'dark',
    position: 'topRight',
    messageColor: '#ffffff',
  };
  switch (messageState) {
    case 'success':
      return {
        title: 'OK',
        message: `Fulfilled promise in ${delay}ms`,
        backgroundColor: '#59a10d',
        iconUrl: successIcon,
        ...commonSettings,
      };
    case 'error':
      return {
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        backgroundColor: '#ef4040',
        iconUrl: errorIcon,
        ...commonSettings,
      };
    case 'warning':
      return {
        title: 'Caution',
        message: 'Make choice more than 0',
        backgroundColor: '#ffa000',
        ...commonSettings,
      };
    default:
      return {
        title: 'Error',
        message: 'Unknown problem',
        backgroundColor: '#ef4040',
        ...commonSettings,
      };
  }
}

formEl.addEventListener('submit', evt => {
  evt.preventDefault();

  const delay = Number(formEl.delay.value);
  const state = formEl.state.value;
  if (delay <= 0) {
    iziToast.warning(caseMessage('warning'));
    formEl.reset();
    return;
  }
  createPromise(delay, state)
    .then(delay => iziToast.success(caseMessage('success', delay)))
    .catch(delay => iziToast.error(caseMessage('error', delay)));
  formEl.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
