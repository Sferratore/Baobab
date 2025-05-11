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
const header = document.getElementById('header');

playBtn.addEventListener('click', () => {
  if (interval) return;

  interval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
    updatePlantStage(seconds);
    if(seconds % 4 == 0){
        header.textContent = 'Resta concentrato';
    }
    else if(seconds % 4 == 1){
        header.textContent = 'Resta concentrato.';
    }
    else if(seconds % 4 == 2){
        header.textContent = 'Resta concentrato..';
    }
    else{
        header.textContent = 'Resta concentrato...';
    }
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
  let s1AnimationInterval; 

  if (hours >= 80) {
    plantImg.src = './imgs/plant_s5.png';
    plantImg.style.width = 450;
    plantImg.style.height = 450;
  } else if (hours >= 50) {
    plantImg.src = './imgs/plant_s4.png';
    plantImg.style.width = 340;
    plantImg.style.height = 340;
  } else if (hours >= 30) {
    plantImg.src = './imgs/plant_s3.png';
    plantImg.style.width = 280;
    plantImg.style.height = 280;
  } else if (hours >= 10) {
    plantImg.src = './imgs/plant_s2.png';
    plantImg.style.width = 230;
    plantImg.style.height = 230;
  } else {
    let toggle = false;
    s1AnimationInterval = setInterval(() => {
      toggle = !toggle;
      plantImg.src = toggle ? './imgs/plant_s1.png' : './imgs/plant_s1_2.jpg';
    }, 1000);
    plantImg.style.width = 200;
    plantImg.style.height = 200;

  }
}
