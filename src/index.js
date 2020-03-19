document.addEventListener("DOMContentLoaded",() => {

    const dogBar = document.querySelector("#dog-bar")
    const dogUrl = "http://localhost:3000/pups"
    const dogInfoGrab = document.querySelector("#dog-info")



// renders top dog name
    const dogRender = dogs => {
        dogs.forEach( dog => {

            const dogNameText = document.createElement("span")
            dogNameText.innerText = dog.name
            
            dogBar.append(dogNameText)

            //render more info on click
            dogNameText.addEventListener("click", (event) => {
                event.preventDefault()
   
                    dogInfoGrab.innerHTML = ""
                    const dogImg = document.createElement("img")
                    dogImg.src = dog.image
        
                    const dogNameUnder = document.createElement("h2")
                    dogNameUnder.innerText = dog.name

                    const behaveButton = document.createElement("button")
                        if (dog.isGoodDog == true){
                        behaveButton.innerText = "Good Dog!"
                        }
                        else if (dog.isGoodDog == false){
                        behaveButton.innerText = "Bad Dog!"
                        }
                    //make the dog info page
                    dogInfoGrab.append(dogImg,dogNameUnder,behaveButton)
                        // button badd/good dog event 
                        behaveButton.addEventListener("click", (event) => {
                        event.preventDefault()
                            
                            if (dog.isGoodDog == true){
                            dog.isGoodDog = false 
                            behaveButton.innerText = "Bad Dog"
                            }else if
                            (dog.isGoodDog == false){
                            dog.isGoodDog = true
                            behaveButton.innerText = "Good Dog!"
                            }
                                fetch(dogUrl+`/${dog.id}`,{
                                method: "PATCH",
                                headers: {
                                "Content-type" : "application/json",
                                "Accept": "application/json"
                                },
                                body: JSON.stringify(dog)
                                })
                          
                        })
            })
        })
    }


    const filterButton = document.querySelector("#good-dog-filter")
    
    filterButton.addEventListener("click",() => {
        event.preventDefault()
        dogBar.innerHTML = ""
        
        fetch(dogUrl)
        .then(resp => resp.json())
        .then( dogs => { if (filterButton.innerText == "Filter good dogs: OFF")
                {
                dogs = dogs.filter(dogo => dogo.isGoodDog == true)
                filterButton.innerText = "Filter good dogs: ON"
                }
                else 
                filterButton.innerText = "Filter good dogs: OFF" 
                dogRender(dogs)
                })
            })
         

   
 
 
 

    const init = () => {
        fetch(dogUrl)
        .then(resp => resp.json())
        .then(dogRender)
    }
 




    init()

})