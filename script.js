let count = 0;
let stage = 0;

const coin = document.getElementById("coin");
const counter = document.getElementById("counter");
const cracksContainer = document.getElementById("cracks");

function updateCounter() {
  counter.textContent = count.toString().padStart(4, "0");
}

function vibrate() {
  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
  if (window.Telegram?.WebApp?.HapticFeedback) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred("medium");
  }
}

function addCrack() {
  const crack = document.createElement("div");
  crack.classList.add("crack");
  crack.style.left = "50%";
  crack.style.transform = `rotate(${Math.random() * 360}deg)`;
  cracksContainer.appendChild(crack);
}

function resetCoin() {
  cracksContainer.innerHTML = "";
  coin.style.filter = "none";
  stage = 0;
}

coin.addEventListener("click", () => {

  count++;
  updateCounter();
  vibrate();

  if (count === 10 && stage === 0) {
    addCrack();
    stage = 1;
  }

  if (count === 20 && stage === 1) {
    addCrack();
    addCrack();
    stage = 2;
  }

  if (count === 30 && stage === 2) {
    coin.style.filter = "brightness(0.4)";
    count += 20; // чтобы стало 50
    updateCounter();
    stage = 3;

    setTimeout(() => {
      resetCoin();
      count = 0;
      updateCounter();
    }, 2000);
  }

});
