let seconds = 0;
let interval = null;

function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const secs = String(sec % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

const playBtn = document.getElementById('playButton');
const stopBtn = document.getElementById('stopButton');
const timerDisplay = document.getElementById('timer');

playBtn.addEventListener('click', () => {
  if (interval) return;

  interval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
  }, 1000);

  playBtn.style.display = 'none';
  stopBtn.style.display = 'inline';
});

stopBtn.addEventListener('click', () => {
  clearInterval(interval);
  interval = null;

  playBtn.style.display = 'inline';
  stopBtn.style.display = 'none';
});
