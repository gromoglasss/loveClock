let unlocked = false;


setInterval(() => {
  const now = new Date();
  const diff = unlockDate - now;

  if (diff <= 0) {
    document.querySelector(".countdown").style.display = "none";
    playerEl.classList.remove("hidden");
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);

  const months = Math.floor(totalSeconds / (30 * 24 * 60 * 60));
  const days = Math.floor((totalSeconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  updateNumber(monthsEl, months);
  updateNumber(daysEl, days);
  updateNumber(minutesEl, minutes);
  updateNumber(secondsEl, seconds);

  if (diff <= 0 && !unlocked) {
  unlocked = true;
  document.querySelector(".countdown").style.display = "none";
  playerEl.classList.remove("hidden");
  return;
}


}, 1000);
