const baseURL = 'https://deckofcardsapi.com/api/deck';

// 1
axios.get(`${baseURL}/new/draw`)
    .then(res =>{
        let {suit, value} = res.data.cards[0]
        console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`)
    })

// 2
let cards = []
axios.get(`${baseURL}/new/draw`)
.then(res =>{
    let deck_id = res.data.deck_id
    cards.push(res.data.cards[0])
    return axios.get(`${baseURL}/${deck_id}/draw`)
})
.then(res =>{
    cards.push(res.data.cards[0])
    for(c of cards){
        console.log(`${c.value.toLowerCase()} of ${c.suit.toLowerCase()}`)
    }
})

// 3
let deck_id = null;
let $btn = $("button")
let $load = $(".load-msg")
let $end = $(".end-msg")
let $drawnArea = $('.drawn-area')

axios.get(`${baseURL}/new/shuffle`)
    .then(res=>{
        deck_id = res.data.deck_id
        // Display button after deck has been returned from API
        $load.hide()
        $btn.show()
    })

$btn.on('click', () =>{
    axios.get(`${baseURL}/${deck_id}/draw/`)
        .then(res =>{
            let cardImg = res.data.cards[0].image;

            let randX = Math.random() * 40 - 20;
            let randY = Math.random() * 40 - 20;
            let randAngle = Math.random() * 90 - 45;

            // Add image of card to $drawnArea
            $drawnArea.append(
                $('<img>', {
                    src: cardImg,
                    css: {
                        transform: `translate(${randX}px, ${randY}px) rotate(${randAngle}deg)`
                    }
                })
            )
        })
        .catch(err =>{
            console.log(err)
            $end.show()
        })
})