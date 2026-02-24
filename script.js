const tg = window.Telegram.WebApp;
const btn = document.getElementById('tapBtn');
const scoreEl = document.getElementById('score');
const audio = document.getElementById('clickSound');

tg.expand();

let score = parseInt(localStorage.getItem('tap_score')) || 0;
scoreEl.innerText = score;

btn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    
    // 1. Счет
    score++;
    scoreEl.innerText = score;
    localStorage.setItem('tap_score', score);

    // 2. Вибрация
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }

    // 3. Звук
    audio.currentTime = 0;
    audio.play().catch(()=>{});

    // 4. Парящая цифра ПОД кнопкой
    createFloatingNumber();
});

function createFloatingNumber() {
    const n = document.createElement('div');
    n.className = 'floating-num';
    n.innerText = '+1';
    document.querySelector('.button-area').appendChild(n);
    
    setTimeout(() => n.remove(), 800);
}
