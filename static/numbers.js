const favNum = 13;
const numList = [13, 21, 96]
const baseURL = "http://numbersapi.com";

const $favNum = $(".fav-num")
const $numList = $(".num-list")
const $favList = $(".fav-list")

// 13
async function part1(){
    let oneFact = await axios.get(`${baseURL}/${favNum}?json`)
    $favNum.append( `<li>${oneFact.data.text}</li>`)
}

//[13, 21, 96]
async function part2(){
    let threeFacts = await axios.get(`${baseURL}/${numList}?json`)
    for(k in threeFacts.data){
        $numList.append( `<li>${threeFacts.data[k]}</li>`)
    }
}

//13 - (4 facts)
async function part3(){
    let fourFacts = await Promise.all(
        Array.from({ length: 4 }, ()=>{
        return axios.get(`${baseURL}/${favNum}?json`)
    }))
    fourFacts.forEach(fact =>{
        $($favList.append( `<li>${fact.data.text}</li>` ))
    })
}

// Run all async functions
part1();
part2();
part3();