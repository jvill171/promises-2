const baseURL = "https://pokeapi.co/api/v2"


// 1
axios.get(`${baseURL}/pokemon`).then(res =>{
    return res.data.count
})
.then(count=>{
    axios.get(`${baseURL}/pokemon?limit=${count}`)
    .then(res=>{
        console.log("\n\n========================= Part 1 =========================")
        console.log(res.data.results)
    })
})

// 2
axios.get(`${baseURL}/pokemon`).then(res =>{
    return res.data.count
})
.then(count=>{
    axios.get(`${baseURL}/pokemon?limit=${count}`)
    .then(res=>{
        let randURLs = []
        for(let i =0; i < 3; i++){
            randNum = Math.floor(Math.random()*count)
            // Make unique
            if(randURLs.includes(res.data.results[randNum])){
                i--;
            }
            else{
                randURLs.push(res.data.results[randNum].url)
            }
        }
        return Promise.all(randURLs.map(url=> axios.get(url)))
    })
    .then(res=>{
        console.log("\n\n========================= Part 2 =========================")
        res.forEach(elem => {
            console.log(elem.data)
        });
    })
})

// 3
axios.get(`${baseURL}/pokemon`).then(res =>{
    return res.data.count
})
.then(count=>{
    axios.get(`${baseURL}/pokemon?limit=${count}`)
    .then(res=>{
        let randURLs = []
        for(let i =0; i < 3; i++){
            randNum = Math.floor(Math.random()*count)
            // Make unique
            if(randURLs.includes(res.data.results[randNum])){
                i--;
            }
            else{
                randURLs.push(res.data.results[randNum].url)
            }
        }
        return Promise.all(randURLs.map(url=> axios.get(url)))
    })
    .then(res=>{
        speciesURLs = []
        res.forEach(elem => {
            speciesURLs.push(elem.data.species.url)
        });
        return Promise.all(speciesURLs.map(url=> axios.get(url)))
    })
    .then(res=>{
        console.log("\n\n========================= Part 3 =========================")
        res.forEach(elem =>{
            let flavorIdx = Array.from(elem.data.flavor_text_entries).findIndex((elem)=>{
                return elem.language.name == 'en'
            })
            console.log("*******************************")
            if (flavorIdx >= 0){
                console.log(`${elem.data.name}: \n${elem.data.flavor_text_entries[flavorIdx].flavor_text}`)
            }
            else{
                console.log(`No flavor text found for ${elem.data.name}.`)
            }
        })
    })
})