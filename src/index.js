const DOG_API = ("http://localhost:3000/pups")
const dogBar = document.querySelector("#dog-bar")
const dogFilter = document.querySelector("#good-dog-filter")

fetch(DOG_API)
.then(res => res.json())
.then(dogs => renderDogs(dogs))

const renderDogs = (dogs) => {
    dogBar.innerHTML = ""
    dogs.forEach (dog => 
        renderNewDog(dog))
}

const filterDogs = () => {
    dogFilter.addEventListener('click', event => {
        if (event.target.innerText == "Filter good dogs: OFF") {
            event.target.innerText = "Filter good dogs: ON"
            fetch(DOG_API).then(res => res.json()).then(dogs => renderGoodDogs(dogs))
        }
        else {
            event.target.innerText = "Filter good dogs: OFF"
            fetch(DOG_API).then(res => res.json()).then(dogs => renderDogs(dogs))
        }
    })
}
const renderGoodDogs = (dogs) => {
    let goodDogs = dogs.filter(dog => dog.isGoodDog == true)
    renderDogs(goodDogs)
}

const renderNewDog = (dog) => {
    const dogBar = document.querySelector("#dog-bar")

    dogSpan = document.createElement("SPAN")
    dogSpan.innerText = dog.name
    
    dogBar.append(dogSpan)

    dogSpan.addEventListener("click", (event) => {
        event.preventDefault();
        const dogInfo = document.querySelector("#dog-info")

        dogImg = document.createElement("img")
        dogImg.src = dog.image

        dogName = document.createElement("h3")
        dogName.innerText = dog.name

        dogAttitude = document.createElement("button")
        if (dog.isGoodDog == true ) {
            dogAttitude.innerText = "Good Dog!"
        }
        else {
            dogAttitude.innerText = "Bad Dog!"
        }
        
        dogAttitude.addEventListener('click', () => {
            dog.isGoodDog ? dog.isGoodDog = false : dog.isGoodDog = true  
            patchGoodBad(dog).then(data => data.isGoodDog ? dogAttitude.innerText = "Good Dog!" : dogAttitude.innerText = "Bad Dog!")         
        })
        dogInfo.innerHTML = ""
        dogInfo.append(dogImg, dogName, dogAttitude)
    })
}
const patchGoodBad = (dog) => {
    return fetch(`${DOG_API}/${dog.id}`, {
        method: "PATCH",
        headers:  {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "isGoodDog": dog.isGoodDog
        })
    })
    .then(res => res.json()) 
}
filterDogs();