/*jshint esversion: 6 */

//Manipulating the DOM

// Function audio

// All the source code was build from this youtube tutorial https://sojasmine.github.io/Madagaskar-Memory-game/
 
var audio = document.getElementById("myAudio"); 

function playAudio() { 
  audio.play(); 
} 

function pauseAudio() { 
  audio.pause(); 
} 

 // Variables 
let cards = document.querySelectorAll(".memory-card");
let firstClick = false;
let counter = 0;
let cardPair = [];
let sec = 0;
let score = 0;
let card = document.querySelectorAll(".memory-game");


cards.forEach((card) => {
    card.state = "unclicked";
});

//shuffle();


(function($){
    $.fn.shuffle = function() {
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });
        return $(shuffled);
    };
})(jQuery);


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

$('div#game-container img').shuffle();

//Function check

function check() {
    if (counter == 2) { 
        if (cardPair[0].querySelector("img").src == cardPair[1].querySelector("img").src) {
            matched();
        } else {
            unmatched(cardPair[0], cardPair[1]);
        }
    }
}


// Function matched

function matched() {
    cardPair[0].state = "blocked";
    cardPair[1].state = "blocked";
    counter = 0; 
    cardPair = [];
    let score = document.querySelector("#score").innerHTML; 
    score++; 
    document.querySelector("#score").innerHTML = score;
    if(score ===60) { 
        score = 10;
    }
}

//Function unmatched

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

// Function countdown interval and time

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




/*function shuffle() {
    card.forEach(cards => {
       let randomPosition = Math.floor(Math.random() * 30);
        cards.style.order = randomPosition;
    });
}
*/