document.addEventListener('DOMContentLoaded', () => {
    const basket = document.getElementById('basket');
    const scoreValue = document.getElementById('scoreValue');
    const timerValue = document.getElementById('timerValue');
    const fruitsContainer = document.getElementById('fruits');
    let score = 0;
    let timeLeft = 40;

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createFruit() {
        const fruits = ['apple', 'banana', 'cherry', 'grape', 'orange'];
        const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
        const fruit = document.createElement('div');
        fruit.classList.add('fruit');
        fruit.style.backgroundImage = `url('images/${randomFruit}.png')`;
        fruit.style.top = '0px';
        fruit.style.left = `${getRandomNumber(0, 270)}px`;
        fruitsContainer.appendChild(fruit);

        const fallInterval = setInterval(() => {
            const fruitRect = fruit.getBoundingClientRect();
            const basketRect = basket.getBoundingClientRect();

            if (fruitRect.bottom > basketRect.top && 
                fruitRect.right > basketRect.left && 
                fruitRect.left < basketRect.right) {
                score++;
                scoreValue.textContent = score;
                fruit.remove();
                clearInterval(fallInterval);
            } else if (fruitRect.top > window.innerHeight) {
                fruit.remove();
                clearInterval(fallInterval);
            } else {
                fruit.style.top = `${fruit.offsetTop + 1}px`;
            }
        }, 10);
    }

    setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerValue.textContent = timeLeft;
            createFruit();
        } else {
            alert(`Game Over! Your score is ${score}`);
            clearInterval(timerInterval);
        }
    }, 1000);

    const timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerValue.textContent = timeLeft;
        } else {
            alert(`Game Over! Your score is ${score}`);
            clearInterval(timerInterval);
        }
    }, 1000);

    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && basket.offsetLeft > 0) {
            basket.style.left = `${basket.offsetLeft - 30}px`;
        } else if (e.key === 'ArrowRight' && basket.offsetLeft < 250) {
            basket.style.left = `${basket.offsetLeft + 30}px`;
        }
    });
});
