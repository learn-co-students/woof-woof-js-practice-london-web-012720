DOGS_URL = "http://localhost:3000/pups"

const divDogBar = document.querySelector("#dog-bar")
const divDogInfo = document.querySelector("#dog-info")
const filterBtn = document.querySelector("#good-dog-filter")
const filterDiv = document.querySelector("#filter-div")
const filterOff  = document.createElement("button")
filterOff.setAttribute("id", "bad-dog-filter")


document.addEventListener("DOMContentLoaded", () => {

fetch(DOGS_URL)
.then(resp => resp.json())
.then(dogs => {
  displayDogButtons(dogs);
  filterON(dogs);
 
  filterOff.addEventListener("click", event => {
    divDogBar.innerText = ""
    displayDogButtons(dogs);
   filterDiv.append(filterBtn)
   filterOff.remove();
  })


})
})


// function filterOffdog(dogs){
//   divDogBar.innerText = ""
//    filterOff = document.querySelector("bad-dog-filter")

  
//   // dogs =  dogs.filter(dog =>  dog.isGoodDog === false )
//   // displayDogButtons(dogs);
//   // filterDiv.append(filterBtn)
//   // filterOff.remove();
  
//   }
  


function filterON(dogs){

  filterBtn.addEventListener("click", event => {
    divDogBar.innerText = ""
    filterOff.innerText = "Filter good dogs: ON"
    
   dogs =  dogs.filter(dog =>  dog.isGoodDog === true )
   
   displayDogButtons(dogs);
   filterDiv.append(filterOff)
   filterBtn.remove();

  })

}


// function filterON(dogs){

//   filterBtn.addEventListener("click", event => {
//     divDogBar.innerText = ""
//     filterOff.innerText = "Filter good dogs: ON"
//     filterOff.setAttribute("id", "good-dog-filter")
//    dogs =  dogs.filter(dog =>  dog.isGoodDog === true )
   
//    displayDogButtons(dogs);
//    filterDiv.append(filterOff)
//    filterBtn.remove();

//   })
// }







// takes an array of dog and from the fetch and passed to another function to display each dog









function displayDogButtons(dogs) {
  dogs.forEach(dog => {

    displayDogButton(dog)
  
  })
}
function displayDogButton(dog){
const span = document.createElement("span")
  
  span.setAttribute("id", dog.id)
  span.innerText = dog.name
  span.addEventListener("click", event => {
    showDog(dog)
  })

  divDogBar.append(span)


}



function showDog(dog){
  divDogInfo.innerText = ""

  const h2 = document.createElement("h2")
  h2.innerText = dog.name 

  const img = document.createElement("img")
  img.setAttribute("src", dog.image)

  const btn = createGoodBadButton(dog)


  divDogInfo.append(h2, img, btn)
}



function changeDogStatus(dog){


  const data = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
  },
  body: JSON.stringify({
   isGoodDog: !dog.isGoodDog   
  })

  }

  return fetch(`http://localhost:3000/pups/${dog.id}`, data)
  .then(resp => resp.json())
}



function createGoodBadButton(dog){

  const btn = document.createElement("button")
  btn.setAttribute("id", dog.id)
  btn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad dog!"

  btn.addEventListener("click", event => {
    changeDogStatus(dog).then(d => {
      dog.isGoodDog = d.isGoodDog
      btn.innerText = dog.isGoodDog ? "Good Dog!" : "Bad dog!"
    })
  })

  return btn

}