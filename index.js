document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.memory-card');
    const startButton = document.querySelector('#start');
    const timerDisplay = document.querySelector('#timer');

    let hasFlippedCard = false;
    let lockBoard = false;
    let firstCard, secondCard;
    let timerInterval;
    let timeElapsed = 60;
    let gameOver = false; 

    // flip card noise
    let flipNoise = new Audio("sound/flipcard.mp3")

    function startPlaying() {
        flipNoise.play();
    }

    // fliping of cards
    function flipCard() {
        if (gameOver || lockBoard || this === firstCard) return;

        this.classList.add('flip');
        startPlaying(); 

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            startTimer();
            return;
        }

        secondCard = this;
        checkForMatch();
    }

    // check for matching cards
    function checkForMatch() {
        let isMatch = firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src;
        if (isMatch) {
            disableCards();
        } else {
            setTimeout(() => {
                unflipCards();
            }, 750);
        }
    }

    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        resetBoard();
    }

    //flip back unmatched cards
    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            resetBoard();
        }, 750);
    }


    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function startTimer() {
        timeElapsed = 60;
        timerInterval = setInterval(() => {
            timeElapsed--;
            if (timeElapsed >= 0) {
                timerDisplay.textContent = formatTime(timeElapsed);
            } else {
                stopTimer();
                gameOver = true;
                lockBoard = true;
            }
        }, 1000);
    }


    function stopTimer() {
        clearInterval(timerInterval);
    }


    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }


    function restartGame() {
        stopTimer();
        timeElapsed = 60;
        timerDisplay.textContent = '1:00'; //reset timer 
        gameOver = false;
        lockBoard = false;
        cards.forEach(card => {
            card.classList.remove('flip');
            card.addEventListener('click', flipCard);
        });
        shuffleCards();
    }

    // Function to shuffle the cards
    function shuffleCards() {
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 12);
            card.style.order = randomPos;
        });
    }


    cards.forEach(card => card.addEventListener('click', flipCard));
    startButton.addEventListener('click', restartGame);

    shuffleCards(); // restart shuffle

   
    document.addEventListener("cardflipped", function (event) {
        if (event.detail.flipCard) {
            startPlaying();
        }
    });

});

function simulateCardFlipped() {
    document.dispatchEvent(new CustomEvent("cardflipped", { detail: { flipCard: true } }));
}
