let taps = 0;

const coin = document.getElementById("coin");
const counter = document.getElementById("counter");

function render() {
  counter.textContent = String(taps).padStart(4, "0");
}

function pressAnim() {
  coin.classList.add("pressed");
  setTimeout(() => coin.classList.remove("pressed"), 80);
}

function tap() {
  taps += 1;
  render();
  pressAnim();
}

/* только тапы/нажатия */
coin.addEventListener("click", (e) => {
  e.preventDefault();
  tap();
});

/* чтобы на iOS не вылазило выделение/лупа */
coin.addEventListener("touchstart", (e) => {
  e.preventDefault();
  tap();
}, { passive: false });

/* старт всегда с 0000 */
render();
