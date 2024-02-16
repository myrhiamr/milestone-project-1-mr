document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.memory-card');
  const restartButton = document.querySelector('#restart'); // donde esta la otra parte de esto 
  const timerDisplay = document.querySelector('#timer'); // donde esta la otra parte de esto 

  let hasFlippedCard = false; // to keep track if card has been flipped
  let lockBoard = false; // quitale esto 
  let firstCard, secondCard; // para pares 
  let timerInterval; // timer
  let timeElapsed = 0; // timer

//flipCard function 
// checks whether the board is locked or if the clicked card is the same as the first card flipped.
//If it's the first card flipped, it starts the timer.
// If it's the second card flipped, it checks for a match.

  function flipCard() {
      console.log (this)
      if (this === firstCard) return;

      this.classList.add('flip');

      if (!hasFlippedCard) {
          hasFlippedCard = true;
          firstCard = this;
          startTimer();
          return;
      }

    
     //check for match on second card if match, it calls disableCards; 
     //otherwise, it calls unflipCards. 
      secondCard = this;
      checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.querySelector('.front-face').src === secondCard.querySelector('.front-face').src;
    if (isMatch) {
        disableCards();
    } else {
        setTimeout(() => {
            unflipCards();
        }, 1000);
    }
}




 // disableCards function removes the click event listeners from 
 //the first and second cards, preventing further interaction with them. 
  function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);

      resetBoard();
  }

  function unflipCards() {
      lockBoard = true;

      setTimeout(() => {
          firstCard.classList.remove('flip');
          secondCard.classList.remove('flip');

          resetBoard();
      }, 1000);
  }


  // Timer and  RESET 

  function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
  }

  function startTimer() {
      timerInterval = setInterval(() => {
          timeElapsed++;
          timerDisplay.textContent = formatTime(timeElapsed);
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
      timeElapsed = 0;
      timerDisplay.textContent = '0:00';
      lockBoard = true; // Lock the board to prevent flipping during reset
      cards.forEach(card => {
          card.classList.remove('flip');
          card.addEventListener('click', flipCard);
      });
      shuffleCards();
      setTimeout(() => {
          lockBoard = false; 
      }, 1100); 
  }


// shuffle cards 

  function shuffleCards() {
      cards.forEach(card => {
          let randomPos = Math.floor(Math.random() * 12);
          card.style.order = randomPos;
      });
  }

  cards.forEach(card => card.addEventListener('click', flipCard));
  restartButton.addEventListener('click', restartGame);

  shuffleCards();
});
