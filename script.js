let startTime = null;
let updateInterval = null;
let alreadyStarted = false;
let pauseStartTime = null;
let pauseDuration = 0;

const playBtn = document.getElementById('playButton');
const stopBtn = document.getElementById('stopButton');
const restartBtn = document.getElementById('restartButton');
const timerDisplay = document.getElementById('timer');
const plantImg = document.querySelector('#plant img');
const header = document.getElementById('header');

function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, '0');
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
  const secs = String(sec % 60).padStart(2, '0');
  return `${hrs}:${mins}:${secs}`;
}

function animatePlant(sec) {
  const hours = sec / 3600;

  if (hours >= 76) {
    plantImg.src = plantImg.src.includes('plant_s4.png') ? './imgs/plant_s4_2.png' : './imgs/plant_s4.png';
    plantImg.style.width = '450px';
    plantImg.style.height = '450px';
  } else if (hours >= 45) {
    plantImg.src = plantImg.src.includes('plant_s3.png') ? './imgs/plant_s3_2.png' : './imgs/plant_s3.png';
    plantImg.style.width = '340px';
    plantImg.style.height = '340px';
  } else if (hours >= 23) {
    plantImg.src = plantImg.src.includes('plant_s2.png') ? './imgs/plant_s2_2.png' : './imgs/plant_s2.png';
    plantImg.style.width = '280px';
    plantImg.style.height = '280px';
  } else {
    plantImg.src = plantImg.src.includes('plant_s1.png') ? './imgs/plant_s1_2.png' : './imgs/plant_s1.png';
    plantImg.style.width = '165px';
    plantImg.style.height = '165px';
  }
}

playBtn.addEventListener('click', () => {
  if (!alreadyStarted) {
    // Prima volta: salva il timestamp iniziale
    startTime = Date.now();
    alreadyStarted = true;
  } else if (pauseStartTime !== null) {
    // Se si riprende dopo uno stop, aggiungiamo il tempo di pausa
    const pauseEndTime = Date.now();
    pauseDuration += pauseEndTime - pauseStartTime;
    pauseStartTime = null;
  }

  updateInterval = setInterval(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - startTime - pauseDuration) / 1000);
    timerDisplay.textContent = formatTime(elapsed);
    animatePlant(elapsed);

    switch (elapsed % 4) {
      case 0: header.textContent = 'Stay focused'; break;
      case 1: header.textContent = 'Stay focused.'; break;
      case 2: header.textContent = 'Stay focused..'; break;
      default: header.textContent = 'Stay focused...';
    }
  }, 1000);

  playBtn.style.display = 'none';
  stopBtn.style.display = 'inline';
  restartBtn.style.display = 'inline';
});

stopBtn.addEventListener('click', () => {
  clearInterval(updateInterval);
  updateInterval = null;

  pauseStartTime = Date.now(); // segna inizio della pausa

  playBtn.style.display = 'inline';
  stopBtn.style.display = 'none';
});
