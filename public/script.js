const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const playerEl = document.getElementById("player");
const countdownEl = document.getElementById("countdown");

let unlockDate;

// Get unlock date from server
fetch("/api/unlock-status")
  .then(res => res.json())
  .then(data => {
    unlockDate = new Date(data.unlockDate);
    startCountdown();
  });

function startCountdown() {
  setInterval(() => {
    const now = new Date();
    const diff = unlockDate - now;

    if (diff <= 0) {
      countdownEl.style.display = "none";
      playerEl.classList.remove("hidden");
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);

    const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
    const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    monthsEl.textContent = months;
    daysEl.textContent = days;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

  }, 1000);
}
