import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const launchBtn = document.querySelector('[data-start]');
const dateInput = document.querySelector('#datetime-picker');
launchBtn.disabled = true;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: onClose,
});

function onClose(selectedDates) {
  const userSelectedDate = selectedDates[0];
  const currentDate = new Date();

  if (userSelectedDate < currentDate) {
    displayError('Illegal operation');
    launchBtn.disabled = true;
  } else {
    launchBtn.disabled = false;
  }
}

function displayError(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
    backgroundColor: '#ef4040',
  });
}

let timerInterval;

launchBtn.addEventListener('click', () => {
  const endDate = new Date(dateInput.value).getTime();

  launchBtn.disabled = true;
  dateInput.disabled = true;

  updateTimer(endDate);

  timerInterval = setInterval(() => {
    updateTimer(endDate);
  }, 1000);
});

function updateTimer(endDate) {
  const timeDifference = getTimeDifference(endDate);

  if (timeDifference <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    displayMessage("Time's up!");
    dateInput.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
}

function getTimeDifference(endDate) {
  const currentTime = new Date().getTime();
  const endTime = new Date(endDate).getTime();
  return endTime - currentTime;
}

function displayMessage(message) {
  iziToast.info({
    title: 'Done',
    message: message,
    position: 'topRight',
  });
}

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

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}