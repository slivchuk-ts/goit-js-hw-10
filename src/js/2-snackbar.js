
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

window.iziToast = iziToast;

document.querySelector('form').addEventListener('submit', event => {
  event.preventDefault();

  const delay = document.querySelector('[name = "delay"]').value;
  const state = document.querySelector('[name = "state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else if (state === 'rejected') {
        reject(delay);
      }
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        title: '✅',
        message: `Fulfilled promise in ${delay}ms`,
        icon: '',
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌',
        message: `Rejected promise in ${delay}ms`,
        icon: '',
        position: 'topRight',
      });
    });
});
