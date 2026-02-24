const tg = window.Telegram.WebApp;
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
const btn = document.getElementById('tapBtn');
const scoreEl = document.getElementById('score');
const clickSound = document.getElementById('clickSound');

tg.expand();

let score = parseInt(localStorage.getItem('usdt_total')) || 0;
scoreEl.innerText = score;

// --- АНИМАЦИЯ ФОНА (Крипто-код) ---
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const codes = "01 USDT ETH 0x BTC 777".split(" ");
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#26a17b";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = codes[Math.floor(Math.random() * codes.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// --- ЛОГИКА ТАПА ---
btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    score++;
    scoreEl.innerText = score;
    localStorage.setItem('usdt_total', score);

    // Звук и Вибрация
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    if (tg.HapticFeedback) tg.HapticFeedback.impactOccurred('light');

    // Создание парящего числа ПОД кнопкой
    const float = document.createElement('div');
    float.className = 'float-val';
    float.innerText = '+1';
    
    // Центрируем под кнопкой
    const rect = btn.getBoundingClientRect();
    float.style.left = (rect.left + rect.width / 2 - 15) + 'px';
    float.style.top = (rect.bottom - 20) + 'px';

    document.body.appendChild(float);
    setTimeout(() => float.remove(), 700);
});
