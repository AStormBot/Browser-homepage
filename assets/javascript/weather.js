const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = "4d8fb5b93d4af21d66a2948710284366";
let meow = 1;

document.body.addEventListener("mousemove", e => {
    if (meow === 1) {
        meow = 2;
        e.preventDefault();
        let inputVal = "tehran";

        //check if there's already a city
        const listItems = list.querySelectorAll(".ajax-section .city");
        const listItemsArray = Array.from(listItems);

        if (listItemsArray.length > 0) {
            const filteredArray = listItemsArray.filter(el => {
                let content = "";
                //athens,gr
                if (inputVal.includes(",")) {
                    //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
                    if (inputVal.split(",")[1].length > 2) {
                        inputVal = inputVal.split(",")[0];
                        content = el
                            .querySelector(".city-name span")
                            .textContent.toLowerCase();
                    } else {
                        content = el.querySelector(".city-name").dataset.name.toLowerCase();
                    }
                } else {
                    //athens
                    content = el.querySelector(".city-name span").textContent.toLowerCase();
                }
                return content == inputVal.toLowerCase();
            });

            if (filteredArray.length > 0) {
                msg.textContent = `You already know the weather for ${
                    filteredArray[0].querySelector(".city-name span").textContent
                } ...otherwise be more specific by providing the country code as well 😉`;
                form.reset();
                input.focus();
                return;
            }
        }

        //ajax here
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const {main, name, sys, weather} = data;
                const icon = `./assets/Icons/${
                    weather[0]["icon"]
                }.svg`;

                const li = document.createElement("li");
                li.classList.add("city");
                const markup = `
<div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-6">
                    <img src="${icon}" class="img-fluid rounded-start" alt="${
                    weather[0]["description"]
                }" width="100%">
                  </div>
                  <div class="col-6 text-light">
                    <div class="card-body">
                      <h5 class="card-title">${Math.round(main.temp)}<sup>°C</sup></h5>
                      <p class="card-text">${weather[0]["description"]}</p>
                    </div>
                  </div>
                </div>
              </div>
      `;
                li.innerHTML = markup;
                list.appendChild(li);
            })
            .catch(() => {
                msg.textContent = "Please search for a valid city 😩";
            });

        form.reset();
        input.focus();
    }
});