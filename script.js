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
const plantImg = document.querySelector('#plant img');

playBtn.addEventListener('click', () => {
  if (interval) return;

  interval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
    updatePlantStage(seconds);
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

// Cambia la piantina in base al tempo
function updatePlantStage(sec) {
  const hours = sec / 3600;

  if (hours >= 80) {
    plantImg.src = './imgs/plant_s5.png';
  } else if (hours >= 50) {
    plantImg.src = './imgs/plant_s4.png';
  } else if (hours >= 30) {
    plantImg.src = './imgs/plant_s3.png';
  } else if (hours >= 10) {
    plantImg.src = './imgs/plant_s2.png';
  } else {
    plantImg.src = './imgs/plant_s1.png';
  }
}
