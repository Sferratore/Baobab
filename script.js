let seconds = 35996;
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

  plantAnimationInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
    animatePlant(seconds);
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
  clearInterval(plantAnimationInterval);
  plantAnimationInterval = null;

  playBtn.style.display = 'inline';
  stopBtn.style.display = 'none';
});

function animatePlant(sec) {
  const hours = sec / 3600;

  if (hours >= 80) {
    plantImg.src = plantImg.src.includes('plant_s5.png') ? './imgs/plant_s5_2.png' : './imgs/plant_s5.png';
    plantImg.style.width = 450;
    plantImg.style.height = 450;
  } else if (hours >= 50) {
    plantImg.src = plantImg.src.includes('plant_s4.png') ? './imgs/plant_s4_2.png' : './imgs/plant_s4.png';
    plantImg.style.width = 340;
    plantImg.style.height = 340;
  } else if (hours >= 30) {
    plantImg.src = plantImg.src.includes('plant_s3.png') ? './imgs/plant_s3_2.png' : './imgs/plant_s3.png';
    plantImg.style.width = 280;
    plantImg.style.height = 280;
  } else if (hours >= 10) {
    plantImg.src = plantImg.src.includes('plant_s2.png') ? './imgs/plant_s2_2.png' : './imgs/plant_s2.png';
    plantImg.style.width = 230;
    plantImg.style.height = 230;
  } else {
    plantImg.src = plantImg.src.includes('plant_s1.png') ? './imgs/plant_s1_2.png' : './imgs/plant_s1.png';
    plantImg.style.width = 100;
    plantImg.style.height = 100;

  }
}