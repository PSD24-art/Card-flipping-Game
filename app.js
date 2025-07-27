let cards = document.querySelectorAll(".card");
let score = document.querySelector("#score");
let resetBtn = document.querySelector("button");
let flipCards = [];
let cardIds = [];
let val1 = "";
let val2 = "";
let matchedCards = 0;

shuffleCards();
for (let card of cards) {
  card.addEventListener("click", flipped);
}

function flipped() {
  if (this.classList.contains("flipped") || flipCards.length === 2) return;
  let innerCard = this.querySelector(".card-inner");
  innerCard.classList.add("flipped");

  //removing flip if joker
  if (this.id === "joker") {
    setTimeout(() => {
      innerCard.classList.remove("flipped");
    }, 800);
  }
  if (!cardIds.includes(this.id) && this.id !== "joker") {
    cardIds.push(this.id);
  }

  console.log(cardIds);
  if (cardIds[0] !== cardIds[1] && cardIds.length > flipCards.length) {
    flipCards.push(this);
  } else {
    innerCard.classList.add("red-border");
    setTimeout(() => {
      innerCard.classList.remove("red-border");
    }, 250);
  }

  console.log(flipCards);
  if (flipCards.length === 2) {
    let card1 = flipCards[0];
    let card2 = flipCards[1];

    if (card1.dataset.item === card2.dataset.item) {
      // Match found
      matchedCards += 2;
      score.innerText = `Your Score: ${matchedCards}`;
      flipCards = [];
      cardIds = [];
    } else {
      setTimeout(() => {
        card1.querySelector(".card-inner").classList.remove("flipped");
        card2.querySelector(".card-inner").classList.remove("flipped");
        flipCards = [];
        cardIds = [];
      }, 1000);
    }
    if (matchedCards === 8) {
      let wrap = document.querySelector("#wrap");
      let uWon = document.createElement("h1");
      uWon.innerText = "Congratulations! You won!";
      wrap.appendChild(uWon);
    }
  }
}

resetBtn.addEventListener("click", resetGame);

function resetGame() {
  flipCards = [];
  matchedCards = 0;
  score.innerText = `Your Score: ${matchedCards}`;
  cards.forEach((card) => {
    card.querySelector(".card-inner").classList.remove("flipped");
  });

  shuffleCards();
}

function shuffleCards() {
  cards.forEach((card) => {
    let randomPosition = Math.floor(Math.random() * 100);
    card.style.order = randomPosition;
  });
}
