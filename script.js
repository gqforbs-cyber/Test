(() => {
  const coinBtn = document.getElementById("coinBtn");
  const coin = document.getElementById("coin");
  const counterEl = document.getElementById("counter");

  // Сколько тапов нужно
  const STAGE1 = 10;
  const STAGE2 = 20;
  const STAGE3 = 30;

  // Сколько USDT показать на финале
  const REWARD = 50;

  let taps = 0;
  let finished = false;

  // Показ 4 цифры
  const pad4 = (n) => String(n).padStart(4, "0");

  const setStage = (stage) => {
    coin.classList.remove("coin-stage-0", "coin-stage-1", "coin-stage-2", "coin-stage-3", "coin-broken");
    coin.classList.add(`coin-stage-${stage}`);
    if (stage === 3) coin.classList.add("coin-broken");
  };

  // Изначально — нули
  counterEl.textContent = "0000";
  setStage(0);

  // Убираем iOS long-press меню и выделение
  const prevent = (e) => e.preventDefault();

  document.addEventListener("contextmenu", prevent, { passive: false });
  document.addEventListener("selectstart", prevent, { passive: false });
  document.addEventListener("gesturestart", prevent, { passive: false });

  // Убираем zoom на double tap (iOS Safari)
  let lastTouchEnd = 0;
  document.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 250) e.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });

  const haptic = (ms = 10) => {
    try {
      if (navigator.vibrate) navigator.vibrate(ms);
    } catch (_) {}
  };

  const pressAnim = () => {
    coin.classList.add("coin-press");
    setTimeout(() => coin.classList.remove("coin-press"), 90);
  };

  const updateUI = () => {
    if (!finished) {
      counterEl.textContent = pad4(taps);
    }
    if (taps >= STAGE3) {
      finished = true;
      setStage(3);
      counterEl.textContent = pad4(REWARD); // 0050
      return;
    }
    if (taps >= STAGE2) {
      setStage(2);
      return;
    }
    if (taps >= STAGE1) {
      setStage(1);
      return;
    }
    setStage(0);
  };

  const onTap = (e) => {
    e.preventDefault();

    if (finished) {
      // если уже "разбито" — можно оставить так, без увеличения
      pressAnim();
      haptic(8);
      return;
    }

    taps += 1;
    pressAnim();
    haptic(12);
    updateUI();
  };

  // Кликаем по кнопке-иконке
  coinBtn.addEventListener("click", onTap, { passive: false });
  coinBtn.addEventListener("touchstart", onTap, { passive: false });
})();
