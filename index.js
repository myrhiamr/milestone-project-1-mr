let cards = document.querySelectorAll('.memory-card');


function flipCard() {
    if (this.classList.contains('flip')) {
      this.classList.remove('flip');
    } else {
      this.classList.add('flip');
    }
  }
  

cards.forEach(card => card.addEventListener('click', flipCard));
