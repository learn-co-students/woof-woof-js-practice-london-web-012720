const baseUrl = "http://localhost:3000";
document.addEventListener("DOMContentLoaded", () => {
  const dogInfo = document.querySelector("#dog-info");
  const dogBar = document.querySelector("#dog-bar");
  const fetchDogs = () => {
    return fetch(`${baseUrl}/pups`).then(resp => resp.json());
  };
  const toggleDog = dog => {
    let goodDog = false;
    if (dog.isGoodDog === true) {
      goodDog = false;
    } else {
      goodDog = true;
    }
    const option = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ isGoodDog: goodDog })
    };
    fetch(`${baseUrl}/pups/${dog.id}`, option)
      .then(res => res.json())
      .then(newDog => showDog(newDog));
  };

  const showDog = dog => {
    dogInfo.innerHTML = "";
    const dogImg = document.createElement("img");
    dogImg.src = dog.image;
    const dogName = document.createElement("h2");
    dogName.innerText = dog.name;
    const dogBtn = document.createElement("button");
    if (dog.isGoodDog === true) {
      dogBtn.innerText = "Bad Dog!";
    } else {
      dogBtn.innerText = "Good Dog!";
    }
    dogInfo.append(dogImg, dogName, dogBtn);
    dogBtn.addEventListener("click", () => {
      toggleDog(dog);
      filterDogCode();
    });
  };

  const setBar = dog => {
    const span = document.createElement("span");
    span.innerText = dog.name;
    dogBar.append(span);
    span.addEventListener("click", () => showDog(dog));
  };

  const init = () => {
    fetchDogs().then(dogs => {
      dogs.forEach(dog => {
        setBar(dog);
      });
    });
  };

  const filter = document.querySelector("#good-dog-filter");
  filter.addEventListener("click", () => filterDogs());

  const filterDogCode = () => {
    dogBar.innerHTML = "";
    if (filter.innerText === "Filter good dogs: ON") {
      fetchDogs().then(dogs => {
        dogs.forEach(dog => {
          if (dog.isGoodDog === true) {
            setBar(dog);
          }
        });
      });
    } else {
      fetchDogs().then(dogs => {
        dogs.forEach(dog => {
          setBar(dog);
        });
      });
    }
  };

  const filterDogs = () => {
    if (filter.innerText === "Filter good dogs: OFF") {
      filter.innerText = "Filter good dogs: ON";
    } else {
      filter.innerText = "Filter good dogs: OFF";
    }
    filterDogCode();
  };
  init();
});
