document.addEventListener("DOMContentLoaded", () => {

    const DOGS_URL = "http://localhost:3000/pups"

    const dogsName = document.querySelector("#dog-bar")
    const dogInfo = document.querySelector("#dog-info")
    const dogFilterButton = document.querySelector("#good-dog-filter")

    
    const renderAllDogs = (dogs) => {
        

        dogFilterButton.addEventListener("click", () => {
            if (dogFilterButton.innerText === "FILTER: OFF") {
                dogsName.innerText = ""
                dogFilterButton.innerText = "FILTER: ON"
                dogs.filter((dog) => {
                    return dog.isGoodDog === true
                }).forEach(renderDogName)
            }
            else {
                dogFilterButton.innerText = "FILTER: OFF"
                dogsName.innerText = ""
                dogs.forEach(renderDogName)
            }
        })
    }
    
    const fetchAllDogs = () => {
        return fetch(DOGS_URL)
        .then( resp => resp.json())
    }
    
    fetchAllDogs().then(renderAllDogs)


    const renderDogName = (dog) => {

        const span = document.createElement("span")
        span.innerHTML = dog.name

        span.addEventListener("click", () => {
            const dogName = document.createElement("h2")
            dogName.innerHTML = dog.name
    
            const dogImg = document.createElement("img")
            dogImg.src = dog.image

            const dogButton = document.createElement("button")
            dogButton.className = "good-bad-button"
            dogButton.style.background = "yellow"
            dogButton.style.width = "100px"
            dogButton.style.height = "40px"
                if (dog.isGoodDog === true)
                    dogButton.innerText = "GOOD"
                else 
                    dogButton.innerText = "BAD"
            dogButton.addEventListener("click", (event) => {
                console.log(dog)
                if (dogButton.innerText === "GOOD") {
                    fetch(`${DOGS_URL}/${dog.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify ({isGoodDog: false}),
                    }),
                    dogButton.innerText = "BAD"
                    }
                else {
                    fetch(`${DOGS_URL}/${dog.id}`, {
                        method: "PATCH",
                        headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                        },
                        body: JSON.stringify({isGoodDog: true}),
                    }),
                        dogButton.innerText = "GOOD" 
                }
            })

            // The following is extra functionality:

            // const likeButton = document.createElement("button")
            // likeButton.className = "like-button"
            // likeButton.style.background = "green"
            // likeButton.style.width = "100px"
            // likeButton.style.height = "40px"
            // likeButton.innerText = `LIKES: ${dog.likes}`

            // likeButton.addEventListener("click", () => {
                
            //     const counter = dog.likes
            //     fetch(`${DOGS_URL}/${dog.id}`, {
            //         method: "POST",
            //         headers: {
            //             "Content-Type": "application/json",
            //             Accept: "application/json"
            //         },
            //         body: JSON.stringify({
            //             likes: ++counter
            //         })
            //     }).then( resp => resp.json )
            // })

            
            dogInfo.innerHTML = ""
            dogInfo.append(dogImg, dogName, dogButton)
            // dogInfo.appendChild(likeButton)
        })

        dogsName.append(span)

    }



})