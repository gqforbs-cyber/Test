const tg = window.Telegram.WebApp;
const btn = document.getElementById('tapBtn');
const scoreDisplay = document.getElementById('score');
const bgCode = document.getElementById('bgCode');
const clickSound = document.getElementById('clickSound');

tg.expand();
tg.ready();

let score = parseInt(localStorage.getItem('usdt_score')) || 0;
scoreDisplay.innerText = score;

// Заполнение фона "крипто-кодом"
const codeText = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F USDT_TRANSFER_SUCCESS BLOCK_HASH_000456123 GAS_LIMIT_21000... ";
bgCode.innerText = codeText.repeat(100);

// Используем touchstart для скорости в мобильных приложениях
btn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Предотвращает зум и лишние клики
    
    score++;
    scoreDisplay.innerText = score;
    localStorage.setItem('usdt_score', score);

    // Вибрация
    if (tg.HapticFeedback) {
        tg.HapticFeedback.impactOccurred('medium');
    }

    // Звук
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});

    // Создаем парящую цифру
    createFloat();
});

function createFloat() {
    const float = document.createElement('div');
    float.className = 'floating-number';
    float.innerText = '+1';
    
    // Позиционируем прямо под центром кнопки
    float.style.left = "50%";
    float.style.marginLeft = "-15px"; 
    float.style.top = "200px";

    document.querySelector('.tap-area').appendChild(float);

    setTimeout(() => {
        float.remove();
    }, 1000);
}
