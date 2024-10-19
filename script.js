let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCount = 1;

const displayHours = document.querySelector(".hours");
const displayMinutes = document.querySelector(".minutes");
const displaySeconds = document.querySelector(".seconds");
const displayMilliseconds = document.querySelector(".milliseconds");
const laps = document.getElementById("laps");
const toggleButton = document.getElementById("toggle");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");

toggleButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);
lapButton.addEventListener("click", recordLap);

function toggleTimer() {
  if (!running) {
    // Start the timer
    startTime = performance.now() - (difference || 0);
    tInterval = setInterval(updateDisplay, 10);
    running = true;

    toggleButton.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    toggleButton.style.backgroundColor = "black";
  } else {
    // Pause the timer
    clearInterval(tInterval);
    running = false;

    toggleButton.innerHTML = `<i class="fa-solid fa-play"></i>`;
    toggleButton.style.backgroundColor = "#da5065";
  }
}

function resetTimer() {
  clearInterval(tInterval);
  running = false;
  difference = 0;
  lapCount = 1;
  displayHours.textContent = "00";
  displayMinutes.textContent = "00";
  displaySeconds.textContent = "00";
  displayMilliseconds.textContent = "00";
  laps.innerHTML = ""; // Clear lap times on reset

  toggleButton.innerHTML = `<i class="fa-solid fa-play"></i>`; // Reset to Play icon
  toggleButton.style.backgroundColor = "#da5065";
}

function recordLap() {
  if (running) {
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    const lapTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(
      milliseconds,
      2
    )}`;

    const lapElement = document.createElement("div");
    lapElement.classList.add("lap");
    lapElement.textContent = `Lap ${lapCount++}: ${lapTime}`;
    laps.appendChild(lapElement);
  }
}

function updateDisplay() {
  updatedTime = performance.now();
  difference = updatedTime - startTime;

  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  const milliseconds = Math.floor((difference % 1000) / 10);

  // Update the display elements
  displayHours.textContent = pad(hours);
  displayMinutes.textContent = pad(minutes);
  displaySeconds.textContent = pad(seconds);
  displayMilliseconds.textContent = pad(milliseconds, 2);
}

function pad(number, length = 2) {
  return number.toString().padStart(length, "0");
}
