window.addEventListener("DOMContentLoaded", () => {
  memoryGame.init();
});

var memoryGame = (function () {
  let grid = undefined;
  let result = undefined;
  let totalTryElm = undefined;
  let cardItems = [
    {
      name: "alien",
      image: "images/alien-icon.png",
    },
    {
      name: "angel",
      image: "images/angel-icon.png",
    },
    {
      name: "devil",
      image: "images/devil-icon.png",
    },
    {
      name: "ghost",
      image: "images/ghost-icon.png",
    },
    {
      name: "robot",
      image: "images/robot-icon.png",
    },
    {
      name: "witch",
      image: "images/witch-icon.png",
    },
  ];
  let cards = [];
  let selectedItems = [];
  let selectedCards = [];
  let totalPoints = 0;
  let totalTry = 0;

  function shuffle(items) {
    return items.sort(() => Math.random() - 0.5);
  }

  function generateCards(cardItems) {
    grid = document.querySelector(".grid");
    result = document.querySelector("#result");
    totalTryElm = document.querySelector("#try");

    // we need each item twice
    cardItems.forEach((item) => {
      cards.push(item);
      cards.push(item);
    });

    // Shuffle items in the collection
    cards = shuffle(cards);

    cards.forEach((item, index) => {
      let image = document.createElement("img");
      image.setAttribute("src", "images/init.png");
      image.setAttribute("data-id", index);
      image.addEventListener("click", flipItem);
      grid.appendChild(image);
    });
  }

  function flipItem() {
    if (selectedItems.length === 2) {
      return;
    }

    let index = this.getAttribute("data-id");
    let card = cards[index];
    this.setAttribute("src", card.image);
    selectedItems.push(this);
    selectedCards.push(card);
    totalTry++;
    if (selectedItems.length === 2) {
      setTimeout(() => {
        if (selectedCards[0].name === selectedCards[1].name) {
          selectedItems[0].setAttribute("src", "images/blank.jpg");
          selectedItems[1].setAttribute("src", "images/blank.jpg");

          selectedItems[0].removeEventListener("click", flipItem);
          selectedItems[1].removeEventListener("click", flipItem);

          selectedItems[0].style.cursor = "context-menu";
          selectedItems[1].style.cursor = "context-menu";

          totalPoints++;

          result.innerText = totalPoints;

          if (totalPoints === cardItems.length) {
            alert("Wow. you had completed the challenge !!!");
          }
        } else {
          selectedItems[0].setAttribute("src", "images/init.png");
          selectedItems[1].setAttribute("src", "images/init.png");
        }
        totalTryElm.innerText = totalTry;

        selectedItems = [];
        selectedCards = [];
      }, 300);
    }

    totalTryElm.innerText = totalTry;
  }

  return {
    init: function () {
      generateCards(cardItems);
    },
  };
})();
