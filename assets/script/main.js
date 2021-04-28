let cards = document.querySelectorAll(".memory-card");
let firstClick = false;
let counter = 0;
let cardPair = [];
let card = document.querySelectorAll(".memory-game")

cards.forEach((card) => {
    card.state = "unclicked";
});


shuffle();

for (let  i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", () => {
        //if first click is false
        if (!firstClick) {
        time();//call time function
        firstClick = true; //time function called only ones
        }
        if (cards[i].state == "unclicked") { //if the state is unclicked rotate the clicked card
            cards[i].style.transform = "rotateY(180deg)";
            cards[i].state = "clicked";
            counter++; //increment counter value
            cardPair.push(cards[i]);
            check();//check same src property
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
    if (counter == 2) { //value of counter must be two
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
    counter = 0; //counter update
    cardPair = [];
    let score = document.querySelector("#score").innerHTML; //get value of prev flips 
    score++; //icrement 
    document.querySelector("#score").innerHTML = score;//update

}

    function unmatched(x,y) {
        setTimeout(() => {
            x.style.transform = "rotateY(0deg)";
            y.style.transform = "rotateY(0deg)";
        }, 750);
        cardPair[0].state = "unclicked"; //update to uncliked - hide image again
        cardPair[1].state = "unclicked"; //update to uncliked - hide image again
        counter = 0;
        cardPair = [];
    }



    function time() {
        //initalized a variable
        let secs = 0;
        //update the time every one second
        let ID = setInterval(() => {
            secs++;
            //display time
            document.querySelector("#timer").innerHTML = secs + "s";
            sec = `${secs}`;
            //stop timer when all the pairs are found
            if(flip===10){
                clearInterval(ID);
        }
        }, 1000);
    }

    function shuffle() {
        card.forEach(cards => {
            let randomPosition = Math.floor(Math.random() * 20);
            cards.style.order = randomPosition;
        });
    }