async function init() {
  const res = await fetch("/api/unlock-status");
  const data = await res.json();
  const unlockDate = new Date(data.unlockDate);

  const monthsEl = document.getElementById("months");
  const daysEl = document.getElementById("days");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const playerEl = document.getElementById("player");

  function updateNumber(el, newValue) {
    if (el.textContent !== newValue.toString()) {
      el.classList.add("flip");
      setTimeout(() => {
        el.textContent = newValue;
        el.classList.remove("flip");
      }, 200);
    }
  }

  if (data.unlocked) {
    document.querySelector(".countdown").style.display = "none";
    playerEl.classList.remove("hidden");
    return;
  }

  setInterval(() => {
    const now = new Date();
    const diff = unlockDate - now;

    if (diff <= 0) location.reload();

    const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((diff / (1000 * 60 * 60 * 24)) % 30);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    updateNumber(monthsEl, months);
    updateNumber(daysEl, days);
    updateNumber(minutesEl, minutes);
    updateNumber(secondsEl, seconds);

  }, 1000);
}

init();
