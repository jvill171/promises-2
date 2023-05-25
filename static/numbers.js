const favNum = 13;
const numList = [13, 21, 96]
const baseURL = "http://numbersapi.com";

const $favNum = $(".fav-num")
const $numList = $(".num-list")
const $favList = $(".fav-list")

// 13
axios.get(`${baseURL}/${favNum}?json`)
    .then(res =>
        $favNum.append(
            `<li>${res.data.text}</li>`
            )
    )

//[13, 21, 96]
axios.get(`${baseURL}/${numList}?json`)
    .then(res =>{
        for(k in res.data){
            $numList.append(
                `<li>${res.data[k]}</li>`
                )
        }
    })

//13 - (4 facts)
Promise.all(
    Array.from({ length: 4 }, ()=>{
        return axios.get(`${baseURL}/${favNum}?json`)
    })
)
.then(res =>{
    res.forEach(fact =>{
        $($favList.append(
            `<li>${fact.data.text}</li>`
        ))
    })
})
