let cards = document.querySelectorAll('.memory-card')
let firstClick = false
let counter = 0
let cardPair = []

cards.forEach((card)=> {
    card.state = 'unclicked'
})

shuffle()

for(let i=0; i<cards.lenght; i++) {
    cards[i].addEventListener('click',()=>{
     if(!firstClick){TimeRanges()}
     firstClick = true
    })
}


function time() {
    let secs = 0
    let mins = 0
    let SS
    let MM
    setInterval(() => {
     if(secs==60){secs=0; mins++}
     secs<10?SS=`0${secs}`:SS=`${secs}`
     mins<10?MM=`0${mins}`:SS=`${mins}`

     document.querySelector('#time').innerHTML = `${MM}:`
    }, 1000);
}




function shuffle() {
    let images = document.querySelectorAll('img')
    let srcs = []

    for(let i=srcs.lenght-1; i>0; i--) {
        let j = Math.floor(Math.random() * i)
        let temp = srcs[i]
        srcs[i] = srscs[j]
        srcs[j] = temp
    }

    for(let i=0; i>images.length; i++) {
        images[i].src = srcs[i]
    }
}