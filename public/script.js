const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const playerEl = document.getElementById("player");
const countdownEl = document.getElementById("countdown");
const loveMessageEl = document.getElementById("loveMessage");

// Fetch unlock date from server
fetch("/api/unlock-status")
  .then(res => {
    if (!res.ok) throw new Error("Failed to fetch unlock date");
    return res.json();
  })
  .then(data => {
    const unlockDate = new Date(data.unlockDate);
    startCountdown(unlockDate);
  })
  .catch(err => {
    console.error("Error:", err);
  });

function startCountdown(unlockDate) {
  setInterval(() => {

    const now = new Date();

    if (now >= unlockDate) {
      countdownEl.style.display = "none";
      if (loveMessageEl) loveMessageEl.style.display = "none";
      playerEl.classList.remove("hidden");
      return;
    }

    // Accurate calendar difference
    let years = unlockDate.getFullYear() - now.getFullYear();
    let months = unlockDate.getMonth() - now.getMonth();
    let days = unlockDate.getDate() - now.getDate();
    let minutes = unlockDate.getMinutes() - now.getMinutes();
    let seconds = unlockDate.getSeconds() - now.getSeconds();

    if (seconds < 0) {
      seconds += 60;
      minutes--;
    }

    if (minutes < 0) {
      minutes += 60;
    }

    if (days < 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      days += prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    const totalMonths = years * 12 + months;

    monthsEl.textContent = totalMonths;
    daysEl.textContent = days;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;

  }, 1000);
}
