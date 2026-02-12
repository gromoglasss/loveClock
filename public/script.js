async function init() {
  const res = await fetch("/api/unlock-status");
  const data = await res.json();

  const unlockDate = new Date(data.unlockDate);
  const countdownEl = document.getElementById("countdown");
  const playerEl = document.getElementById("player");

  if (data.unlocked) {
    countdownEl.textContent = "It's time 🤍";
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

    countdownEl.textContent = `${months} mo, ${days} days, ${minutes} min, ${seconds}s`;
  }, 1000);
}

init();
