const tg = window.Telegram.WebApp;
const btn = document.getElementById('tapBtn');
const scoreDisplay = document.getElementById('score');
const codeOverlay = document.getElementById('codeOverlay');
const clickSound = document.getElementById('clickSound');

// Инициализация Telegram
tg.expand();
tg.ready();

let score = parseInt(localStorage.getItem('usdt_score')) || 0;
scoreDisplay.innerText = score;

// Генерируем "мутный" код для фона
const cryptoLines = [
    "0x71C7656EC7ab88b098defB751B7401B5f6d8976F...",
    "CALL method: transfer(address,uint256)",
    "GAS USED: 21000 | STATUS: SUCCESS",
    "BLOCK: 18452930 | HASH: 0x8a2f...",
    "USDT CONTRACT: 0xdAC17F958D2ee523a2206206994597C13D831ec7"
];
codeOverlay.innerText = Array(100).fill(cryptoLines).flat().join('\n');

btn.addEventListener('touchstart', (e) => {
    // 1. Увеличиваем счет
    score++;
    scoreDisplay.innerText = score;
    localStorage.setItem('usdt_score', score);

    // 2. Вибрация (Haptic Feedback)
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }

    // 3. Звук
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    // 4. Парящие цифры (берем координаты тапа)
    const touch = e.touches[0];
    createFloatingText(touch.clientX, touch.clientY);
});

function createFloatingText(x, y) {
    const el = document.createElement('div');
    el.className = 'floating-number';
    el.innerText = '+1';
    el.style.left = `${x - 10}px`;
    el.style.top = `${y + 20}px`; // Появляется чуть ниже места нажатия

    document.body.appendChild(el);

    setTimeout(() => {
        el.remove();
    }, 800);
}
