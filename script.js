let startTime = null;
let updateInterval = null;
let plantAnimationInterval = null;

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
const header = document.getElementById('header');

playBtn.addEventListener('click', () => {
  startTime = Date.now();

  updateInterval = setInterval(() => {
    const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsedSeconds);
    animatePlant(elapsedSeconds);

    switch (elapsedSeconds % 4) {
      case 0:
        header.textContent = 'Resta concentrato';
        break;
      case 1:
        header.textContent = 'Resta concentrato.';
        break;
      case 2:
        header.textContent = 'Resta concentrato..';
        break;
      default:
        header.textContent = 'Resta concentrato...';
    }
  }, 1000);

  playBtn.style.display = 'none';
  stopBtn.style.display = 'inline';
});

stopBtn.addEventListener('click', () => {
  clearInterval(updateInterval);
  updateInterval = null;

  playBtn.style.display = 'inline';
  stopBtn.style.display = 'none';
});

function animatePlant(sec) {
  const hours = sec / 3600;

  if (hours >= 76) {
    plantImg.src = plantImg.src.includes('plant_s4.png') ? './imgs/plant_s4_2.png' : './imgs/plant_s4.png';
    plantImg.style.width = 450;
    plantImg.style.height = 450;
  } else if (hours >= 45) {
    plantImg.src = plantImg.src.includes('plant_s3.png') ? './imgs/plant_s3_2.png' : './imgs/plant_s3.png';
    plantImg.style.width = 340;
    plantImg.style.height = 340;
  } else if (hours >= 23) {
    plantImg.src = plantImg.src.includes('plant_s2.png') ? './imgs/plant_s2_2.png' : './imgs/plant_s2.png';
    plantImg.style.width = 280;
    plantImg.style.height = 280;
  } else {
    plantImg.src = plantImg.src.includes('plant_s1.png') ? './imgs/plant_s1_2.png' : './imgs/plant_s1.png';
    plantImg.style.width = 165;
    plantImg.style.height = 165;
  }
}
