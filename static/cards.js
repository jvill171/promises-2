const baseURL = 'https://deckofcardsapi.com/api/deck';

// 1
async function part1(){
    let res = await axios.get(`${baseURL}/new/draw`)
    let {suit, value} = res.data.cards[0]
    console.log("\n\n====================== Part 1 ======================")
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
}

// 2
let cards = []
async function part2(){
    let card = await axios.get(`${baseURL}/new/draw`)
    let deck_id = card.data["deck_id"]
    
    cards.push(card.data)
    card = await axios.get(`${baseURL}/${deck_id}/draw`)
    cards.push(card.data)
    
    console.log("\n\n====================== Part 2 ======================")
    for(c of cards){
        console.log(`${c.cards[0].value.toLowerCase()} of ${c.cards[0].suit.toLowerCase()}`)
    }
}

// 3
async function part3(){
    let $btn = $("button")
    let $load = $(".load-msg")
    let $end = $(".end-msg")
    let $drawnArea = $('.drawn-area')

    let myDeck = await axios.get(`${baseURL}/new/shuffle`)
    $load.hide()
        $btn.show().on("click", async ()=>{
            try{
                let res = await axios.get(`${baseURL}/${myDeck.data.deck_id}/draw/`)
                let cardImg = res.data.cards[0].image;
        
                let randX = Math.random() * 40 - 20;
                let randY = Math.random() * 40 - 20;
                let randAngle = Math.random() * 90 - 45;
                // Add image of card to $drawnArea
                $drawnArea.append(
                    $('<img>', {
                        src: cardImg,
                        css: {  transform: `translate(${randX}px, ${randY}px) rotate(${randAngle}deg)` }
                    }))
            }
            catch{
                $end.show()
            }
        })
}

// Run async functions
part1();
part2();
part3();