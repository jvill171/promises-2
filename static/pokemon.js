const baseURL = "https://pokeapi.co/api/v2"


// 1
async function part1(){
    let countRes = await axios.get(`${baseURL}/pokemon?count`)
    let res = await axios.get(`${baseURL}/pokemon?limit=${countRes.data.count}`)
    console.log("\n\n========================= Part 1 =========================")
    console.log(res.data.results)
}


// 2
async function part2(){
    let countRes = await axios.get(`${baseURL}/pokemon?count`)
    let allPokemon = await axios.get(`${baseURL}/pokemon?limit=${countRes.data.count}`)
    let randURLs = []

    for(let i =0; i < 3; i++){
        randNum = Math.floor(Math.random() * countRes.data.count)
        // Make unique
        if(randURLs.includes(allPokemon.data.results[randNum])){
            i--;
        }
        else{
            randURLs.push(allPokemon.data.results[randNum].url)
        }
    }
    let pokemonData = await Promise.all(randURLs.map(url=> axios.get(url)))
    console.log("\n\n========================= Part 2 =========================")
    pokemonData.forEach(elem => {
        console.log(elem.data)
    });
}

// 3
async function part3(){
    let countRes = await axios.get(`${baseURL}/pokemon?count`)
    let allPokemon = await axios.get(`${baseURL}/pokemon?limit=${countRes.data.count}`)
    let randURLs = []
    let speciesURLs = []

    for(let i =0; i < 3; i++){
        randNum = Math.floor(Math.random() * countRes.data.count)
        // Make unique
        if(randURLs.includes(allPokemon.data.results[randNum])){
            i--;
        }
        else{
            randURLs.push(allPokemon.data.results[randNum].url)
        }
    }
    
    let pokemonData = await Promise.all(randURLs.map(url=> axios.get(url)))
    pokemonData.forEach(elem => {
        speciesURLs.push(elem.data.species.url)
    });

    let speciesData = await Promise.all(speciesURLs.map(url=> axios.get(url)))
    console.log("\n\n========================= Part 3 =========================")
    speciesData.forEach(elem=>{
        let flavorIdx = Array.from(elem.data.flavor_text_entries).findIndex((elem)=>{
            return elem.language.name == 'en'
        })
        if (flavorIdx >= 0){
            console.log(`${elem.data.name}: \n${elem.data.flavor_text_entries[flavorIdx].flavor_text}`)
        }
        else{
            console.log(`No flavor text found for ${elem.data.name}.`)
        }
    })

}

// Run async functions
part1();
part2();
part3();