let startTime = null;
let updateInterval = null;
let savedSeconds = 0;

const playBtn = document.getElementById('playButton');
const stopBtn = document.getElementById('stopButton');
const timerDisplay = document.getElementById('timer');
const plantImg = document.querySelector('#plant img');
const header = document.getElementById('header');
const fileInput = document.getElementById('caricaFile');

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

function salvaSuFile(secondi) {
  const blob = new Blob([secondi.toString()], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "baobab_timer.txt"; // 👈 nome suggerito
  link.click();
  URL.revokeObjectURL(url);
}

playBtn.addEventListener('click', () => {
  startTime = Date.now();

  updateInterval = setInterval(() => {
    const elapsed = savedSeconds + Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = formatTime(elapsed);
    animatePlant(elapsed);

    switch (elapsed % 4) {
      case 0: header.textContent = 'Resta concentrato'; break;
      case 1: header.textContent = 'Resta concentrato.'; break;
      case 2: header.textContent = 'Resta concentrato..'; break;
      default: header.textContent = 'Resta concentrato...';
    }
  }, 1000);

  playBtn.style.display = 'none';
  stopBtn.style.display = 'inline';
});

stopBtn.addEventListener('click', () => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  const totalElapsed = savedSeconds + elapsed;

  salvaSuFile(totalElapsed); 
  clearInterval(updateInterval);
  updateInterval = null;

  playBtn.style.display = 'inline';
  stopBtn.style.display = 'none';
});

// Carica file .txt con i secondi salvati
fileInput.addEventListener('change', function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function () {
    savedSeconds = parseInt(reader.result) || 0;
    timerDisplay.textContent = formatTime(savedSeconds);
    animatePlant(savedSeconds);
  };
  reader.readAsText(file);
});
