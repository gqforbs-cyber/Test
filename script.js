// Telegram Haptic (если открыт как мини-приложение)
const tg = window.Telegram?.WebApp;

const tapArea = document.getElementById("tapArea");
const counterEl = document.getElementById("counter");
const cracksEl = document.getElementById("cracks");
const shatterEl = document.getElementById("shatter");
const rewardEl = document.getElementById("reward");

let taps = 0;
let finished = false;

// Всегда с нуля при первом открытии
renderCounter(0);

// Убираем двойной тап зум (iOS Safari) максимально
let lastTouchEnd = 0;
document.addEventListener("touchend", (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, { passive: false });

// Запрет pinch zoom
document.addEventListener("gesturestart", (e) => e.preventDefault(), { passive: false });
document.addEventListener("gesturechange", (e) => e.preventDefault(), { passive: false });
document.addEventListener("gestureend", (e) => e.preventDefault(), { passive: false });

tapArea.addEventListener("click", () => {
  if (finished) return;

  taps += 1;
  renderCounter(taps);

  // Вибрация/хаптик
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred("light");
  if (navigator.vibrate) navigator.vibrate(18);

  // Логика трещин: 10 / 20 / 30
  if (taps >= 10 && taps < 20) {
    cracksEl.className = "cracks show10";
  } else if (taps >= 20 && taps < 30) {
    cracksEl.className = "cracks show20";
  } else if (taps >= 30) {
    // Раскол + награда
    finished = true;

    cracksEl.className = "cracks show20"; // оставляем трещины
    shatterEl.classList.add("active");

    // Показать 50 на табло
    setTimeout(() => {
      renderCounter(50);
      rewardEl.classList.add("show");
      if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred("success");
      if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
    }, 220);
  }
});

function renderCounter(n) {
  const s = String(n).padStart(4, "0");
  counterEl.textContent = s;
}
