const tg = window.Telegram?.WebApp;

const tapArea = document.getElementById("tapArea");
const counterEl = document.getElementById("counter");
const cracksEl = document.getElementById("cracks");
const shatterEl = document.getElementById("shatter");
const rewardEl = document.getElementById("reward");

let taps = 0;
let finished = false;

renderCounter(0);

/* ВАЖНО:
   Не трогаем document touchend — он ломает клики в iOS WebView.
   Работаем через pointerdown/touchstart только на зоне тапа.
*/

function doHapticLight(){
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
  if (navigator.vibrate) navigator.vibrate(18);
}

function doHapticSuccess(){
  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
  if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
}

function handleTap(){
  if (finished) return;

  taps += 1;
  renderCounter(taps);
  doHapticLight();

  if (taps >= 10 && taps < 20) {
    cracksEl.className = "cracks show10";
  } else if (taps >= 20 && taps < 30) {
    cracksEl.className = "cracks show20";
  } else if (taps >= 30) {
    finished = true;
    cracksEl.className = "cracks show20";
    shatterEl.classList.add("active");

    setTimeout(() => {
      renderCounter(50);
      rewardEl.classList.add("show");
      doHapticSuccess();
    }, 220);
  }
}

/* pointerdown — работает и в браузере, и в Telegram, и на iOS */
tapArea.addEventListener("pointerdown", (e) => {
  e.preventDefault();
  tapArea.classList.add("is-press");
  handleTap();
});

tapArea.addEventListener("pointerup", () => {
  tapArea.classList.remove("is-press");
});

tapArea.addEventListener("pointercancel", () => {
  tapArea.classList.remove("is-press");
});

/* запасной вариант для старых iOS */
tapArea.addEventListener("touchstart", (e) => {
  e.preventDefault();
  tapArea.classList.add("is-press");
  handleTap();
}, { passive: false });

tapArea.addEventListener("touchend", () => {
  tapArea.classList.remove("is-press");
});

function renderCounter(n){
  counterEl.textContent = String(n).padStart(4, "0");
}
