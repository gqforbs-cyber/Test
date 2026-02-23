const coin = document.getElementById("coin");
const counterEl = document.getElementById("counter");
const cracksContainer = document.getElementById("cracks");

let clicks = 0;
let cracked = false;

function updateCounter() {
  counterEl.textContent = clicks.toString().padStart(4, "0");
}

function addCrack(angle) {
  const crack = document.createElement("div");
  crack.classList.add("crack");
  crack.style.transform = `rotate(${angle}deg)`;
  cracksContainer.appendChild(crack);
}

coin.addEventListener("click", () => {

  if (cracked) return;

  clicks++;
  updateCounter();

  if (navigator.vibrate) {
    navigator.vibrate(20);
  }

  if (clicks === 10) {
    addCrack(20);
  }

  if (clicks === 20) {
    addCrack(60);
    addCrack(120);
    addCrack(200);
  }

  if (clicks === 30) {
    cracked = true;
    cracksContainer.innerHTML = "";
    coin.style.background = "radial-gradient(circle, #555, #222)";
    counterEl.textContent = "0050";
  }
});
