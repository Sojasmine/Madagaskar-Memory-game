let cards = document.querySelectorAll(".memory-card");
let firstClick = false;
let counter = 0;
let cardPair = [];
let sec = 0;
let flip = 0;
let card = document.querySelectorAll('.memory-game');

cards.forEach((card) => {
    card.state = "unclicked";
});

shuffle();

for (let  i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
        
        if (!firstClick) {
        time();
        firstClick = true; 
        }
        if (cards[i].state == "unclicked") { 
            cards[i].style.transform = "rotateY(180deg)";
            cards[i].state = "clicked";
            counter++; 
            cardPair.push(cards[i]);
            check();
        }

        else if (cards[i].state == "clicked") {
            cards[i].style.transform = "rotate(0deg)";
            cards[i].state = "unclicked";
            counter--;
            cardPair = [];
        }
    });
}

function check() {
    if (counter == 2) {
        if (cardPair[0].querySelector("img").src == cardPair[1].querySelector("img").src) {
            matched();
        } else {
            unmatched(cardPair[0], cardPair[1]);
        }
    }
}

function matched() {
    cardPair[0].state = "blocked";
    cardPair[1].state = "blocked";
    counter = 0;
    cardPair = [];
    let score = document.querySelector("#score").innerHTML;
    score++;    
    document.querySelector("#score").innerHTML = score;

    if(score ===10) { 
        score = 10;
        
    }
}



function unmatched(x,y) {
    setTimeout(() => {
        x.style.transform = "rotateY(0deg)";
        y.style.transform = "rotateY(0deg)";
    }, 750);
    cardPair[0].state = "unclicked"; 
    cardPair[1].state = "unclicked"; 
    counter = 0;
    cardPair = [];
}

function time() {
    let secs = 0;
    let ID = setInterval(() => {
        secs++;
        
        document.querySelector("#time").innerHTML = secs + "s";
        sec = `${secs}`;
        
        if(score===10){
            clearInterval(ID);
    }
    }, 1000);
}
 

function shuffle() {
    card.forEach(cards => {
        let randomPosition = Math.floor(Math.random() * 30);
        cards.style.order = randomPosition;
    });
}